'use strict';
const Validate = require('async-validator').default;
const {
  resolve,
  sep: s,
} = require('path');
const glob = require('fast-glob');
const mi = require('m-import').default;
const R = require('ramda');
const camelCase = require('lodash').camelCase;
const clone = require('clone');
const slash = require('slash');
const debug = require('debug')('egg-y-validator');
const CACHE = Symbol.for('egg-y-validator');
const VALIDATOR = Symbol.for('egg-y-validator:getValidator');
const GETFIELD = Symbol.for('egg-y-validator:getField');
const _ = require('lodash');

const {
  assocPath,
  compose,
  curry,
} = R;

let CTX;

const delStr = curry((delStr, souStr) => {
  if (Array.isArray(delStr)) {
    return delStr.reduce((prev, current) => prev.replace(current, ''), souStr);
  }
  return souStr.replace(delStr, '');
});
//* 对所有的函数传递 ctx
const invokeFn = (obj, ctx) => {
  const forEach = (value, index) => {
    if (R.type(value) === 'Array') {
      invokeFn(value, ctx);
    }
    if (R.type(value) === 'Object' && R.has('validator', value)) {
      value.validator = value.validator(ctx);
    }
    if (index === 'validator') {
      obj[index] = obj[index](ctx);
    }
  };
  if (R.type(obj) === 'Array') {
    R.forEach(forEach, obj);
  }
  if (R.type(obj) === 'Object') {
    R.forEachObjIndexed(forEach, obj);
  }
};
const Utils = {
  //* 拿到验证规则
  getValidatorRules(path) {
    let rules;
    if (R.type(path) === 'Object') {
      rules = path;
    } else {
      path = path.split('.');
      rules = R.path(path, Utils.docs);
      rules = R.defaultTo(rules, R.prop('index', rules));
      rules = clone(rules);
      invokeFn(rules, CTX);
    }
    return rules;
  },
  //* 需要验证的对象
  async [GETFIELD](type) {
    if (compose(R.equals('AsyncFunction'), R.type)(type)) {
      return await type();
    }
    return R.cond([
      [ compose(R.equals('Object'), R.type), R.always(type) ],
      [ compose(R.equals('Function'), R.type), type ],
      [ R.equals('query'), R.always(CTX.request.query) ],
      [ R.equals('body'), R.always(CTX.request.body) ],
      [ R.equals('params'), R.always(CTX.params) ],
      [
        R.T,
        R.always(R.merge(CTX.params, CTX.request.query, CTX.request.body)),
      ],
    ])(type);
  },
  async [VALIDATOR](config) {
    if (CTX.app.config.validator.superstruct) {
      const {
        superstruct,
      } = require('superstruct');
      const types = R.defaultTo({}, CTX.app.config.validator.types(CTX));
      const struct = superstruct({
        types: R.merge(types, config.types),
      });
      delete config.types;
      const validator = struct(config);
      // 保证跟 async-validator 相同的 API
      return {
        validate: (fields, fn) => {
          try {
            fn(null, validator(fields));
          } catch (e) {
            fn(e);
          }
        },
      };
    }
    let open = CTX.app.config.validator.open;
    if (R.type(open) === 'Function' || R.type(open) === 'AsyncFunction') {
      open = await open(CTX);
    }
    const messages = CTX.app.config.validator.languages[open] || {};
    const validator = new Validate(config);
    validator.messages(messages);
    return validator;
  },

  loadDocs(reload) {
    if (!reload && Utils[CACHE]) {
      return Utils[CACHE];
    }
    const {
      app,
    } = CTX;
    let schemas = {};
    const matchPath = resolve(app.config.baseDir, 'app', 'schemas', '**', '*');
    const paths = glob.sync(slash(matchPath));

    const delAllStr = compose(
      delStr([ '.json', '.js', '.toml', '.tml', '.yaml', '.yml' ]),
      v => v.replace(/.*(\/|\\)schemas(\/|\\)/ig, '')
      // delStr(app.config.baseDir + `${s}app${s}schemas${s}`)
    );

    const ForEach = R.tryCatch(path => {
      const content = mi(path);
      path = delAllStr(path);
      if (path.indexOf(s) === -1 && s !== '/') {
        path = path.split('/');
      } else {
        path = path.split(s);
      }
      Utils[CACHE] = schemas = assocPath(
        path.map(p => camelCase(p)),
        content,
        schemas
      );
    }, console.error);

    paths.forEach(ForEach);
    return schemas;
  },
  get docs() {
    return Utils.loadDocs(false);
  },
};

exports.verify =
  //* 拿到验证器
  /* 传入校验路径获取校验对象 */
  async function verify(path, type) {
    CTX = this;
    const rules = Utils.getValidatorRules(path);
    const validator = await Utils[VALIDATOR](rules);
    const fields = await Utils[GETFIELD](type);
    debug('rules %j', rules);
    debug('fields %o', fields);
    const validateRes = await new Promise(resolve => validator.validate(fields, errors => resolve(errors || fields)));
    if (_.isArray(validateRes)) {
      return CTX.helper.throw(400, CTX.RESPONSE_CODE.verifyForm, validateRes);
    }
  };
