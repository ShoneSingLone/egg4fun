'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const prefix = '/api/v1';
const init = require('./utils').initRouterMap;
const {
  apiMap,
  viewMap,
} = require('./routerList');

module.exports = app => {
  const {
    router,
    controller,
  } = app;
  /* view */
  init('', viewMap(controller), router);
  /* api */
  init(prefix, apiMap(controller), router);
};
