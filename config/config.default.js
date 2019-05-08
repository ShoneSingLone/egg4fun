/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555598763988_9234';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'egg4fun',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'mysql',
  };

  config.flash = {
    key: Symbol.for('flash')
  };
  config.validator = {
    open: 'zh-CN',
    languages: {
      'zh-CN': {
        required: '必须填 %s 字段'
      }
    },
    async formate(ctx, error) {
      console.log(error)
      ctx.type = 'json'
      ctx.status = 400
      ctx.body = error
    }
  }


  return {
    ...config,
    ...userConfig,
  };
};