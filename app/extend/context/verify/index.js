'use strict';
const Validate = require('async-validator').default;
const {
  resolve,
  sep: s,
} = require('path');
const glob = require('fast-glob');
/* 支持 yaml、yml、toml、tml、json、js 文件的自动导入 support yaml、yml、toml、tml、json、js file import。https://www.npmjs.com/package/m-import */
const mi = require('m-import').default;
const R = require('ramda');
const slash = require('slash');
const debug = require('debug')('egg-y-validator');
const CACHE = Symbol.for('egg-y-validator');
const VALIDATOR = Symbol.for('egg-y-validator:getValidator');
const GETFIELD = Symbol.for('egg-y-validator:getField');
const _ = require('lodash');
const camelCase = _.camelCase;
const clone = _.clone;

const {
  assocPath,
  compose,
  curry,
} = R;

const delStr = curry((delStr, souStr) => {
  if (Array.isArray(delStr)) {
    return delStr.reduce((prev, current) => prev.replace(current, ''), souStr);
  }
  return souStr.replace(delStr, '');
});
//* 对所有的函数传递 ctx
const invokeFn = (obj, ctx) => _.forEach(obj, (value, index) => {
  if (_.isArray((value))) {
    invokeFn(value, ctx);
  }
  if (_.isObject((value)) && _.isFunction(value.validator)) {
    try {
      value.validator = value.validator && value.validator(ctx);
    } catch (error) {
      console.error(error);
    }
  }
  if (index === 'validator') {
    obj[index] = obj[index](ctx);
  }
});

const Utils = {
  //* 拿到验证规则
  getValidatorRules(path, CTX) {
    let rules;
    if (_.isObject((path))) {
      rules = path;
    } else {
      path = path.split('.');
      rules = R.path(path, Utils.docs(CTX));
      rules = R.defaultTo(rules, R.prop('index', rules));
      rules = clone(rules);
      invokeFn(rules, CTX);
    }
    return rules;
  },
  //* 需要验证的对象
  async [GETFIELD](type, CTX) {
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
  async [VALIDATOR](config, CTX) {
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

  loadDocs(reload, CTX) {
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
  docs(CTX) {
    return Utils.loadDocs(false, CTX);
  },
};

exports.verify =
  //* 拿到验证器
  /* 传入校验路径获取校验对象 */
  async function verify(path, type) {
    const CTX = this;
    const rules = Utils.getValidatorRules(path, CTX);
    const validator = await Utils[VALIDATOR](rules, CTX);
    const fields = await Utils[GETFIELD](type, CTX);
    debug('rules %j', rules);
    debug('fields %o', fields);
    const validateRes = await new Promise(resolve => validator.validate(fields, errors => resolve(errors || fields)));
    if (_.isArray(validateRes)) {
      return CTX.helper.throw(400, CTX.RESPONSE_CODE.verifyForm, validateRes);
    }
  };
