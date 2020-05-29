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
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + env('SESSION_SECRET');

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 加载 errorHandler 中间件
    middleware: [ 'errorHandler' ],
    // 只对 /api 前缀的 url 路径生效
    errorHandler: {
      match: '/api',
    },
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg4fun',
    password: env('MYSQL_PWD'),
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: 3306,
      // 用户名
      user: env('MYSQL_USER'),
      // 密码
      password: env('MYSQL_PWD'),
      // 数据库名
      database: 'egg4fun',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  /* CSRF */
  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
