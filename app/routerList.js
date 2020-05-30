'use strict';
exports.apiMap = ctx => {
  return {
    post: {
      '/signup': ctx.users.signup,
      '/signin': ctx.users.signin,
    },
  };
};
exports.viewMap = ctx => {
  return {
    get: {
      '/': ctx.home.index,
      '/base': ctx.base.index,
    },
  };
};
