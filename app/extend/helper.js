'use strict';

module.exports = {
  where(obj, ...args) {
    return Object.assign({
      where: obj,
    },
    ...args
    );
  },
  throw(code, type, message) {
    this.ctx.status = code;
    this.ctx.body = {
      error: type,
      message,
    };
    throw new Error();
  },
  apiOk(data) {
    this.ctx.status = 200;
    this.ctx.body = data;
  },
  range(start, end) {
    const _range = function* name(start, end) {
      let index = start;
      if (typeof end === 'undefined') {
        end = start;
        index = 0;
      }
      while (index < end) {
        yield index++;
      }
    };
    return Array.from(_range(start, end));
  },
};
