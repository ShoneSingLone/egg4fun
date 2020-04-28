/* eslint valid-jsdoc: "off" */

'use strict';

const dotenv = require('dotenv');
const path = require('path');
/* ./egg4fun_env.configs */
const res = dotenv.config({
  path: path.resolve(__dirname, '../../egg4fun_env.configs'),
});

const env = key => {
  return process.env[key];
};
console.log('env("TEST")', env('TEST'), env('NODE_ENV '), res);


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + env('SESSION_SECRET');


  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg4fun',
    password: env('MYSQL_PWD'),
  };

  return {
    ...config,
    ...userConfig,
  };
};
