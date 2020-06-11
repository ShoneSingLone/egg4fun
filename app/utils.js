'use strict';
const forEach = require('lodash/forEach');

function initRouterMap(prefix, maps, router) {
  forEach(maps, (map, method) => {
    forEach(map, (controller, url) => {
      if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
        const chalk = require('chalk');
        console.log(`${chalk.blue('[' + method + ']')}=>${chalk.red(prefix + url)}`);
      }
      router[method](prefix + url, controller);
    });
  });
}

exports.initRouterMap = initRouterMap;
