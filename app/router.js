'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
const prefix = '/api/v1';

const routerResources = [
  [ 'users', '/users', 'users' ],
];
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  routerResources.forEach(routerResource => {
    router.resources(routerResource[0], `${prefix}${routerResource[1]}`, controller[routerResource[2]]);
  });
};
