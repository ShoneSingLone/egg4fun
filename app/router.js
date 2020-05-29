'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const prefix = '/api/v1';
const init = require('./utils').initRouterMap;

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  init(prefix, require('./api')(controller), router);
};
