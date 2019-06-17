/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require("path");
const R = require('ramda')
const chalk = require('chalk')
const sequelizeConfig = require(path.resolve("D:\\PrivateConfings\\egg4fun\\database.js"))[process.env.NODE_ENV || 'development'];

const {
  passportGithub,
  passportLocal
} = require(path.resolve("D:\\PrivateConfings\\egg4fun\\passport.js"));

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + Date.now(),
    // add your middleware config here
    middleware: [],
    // add your user config here
    sequelize: {
      ...sequelizeConfig,
      exclude: 'index.js'
    },
    flash: {
      key: Symbol.for('flash')
    },
    security: {
      csrf: {
        ignoreJSON: true
      }
    },
    validator: {
      open: 'zh-CN',
      languages: {
        'zh-CN': {
          required: '必须填 %s 字段'
        }
      },
      async formatter(ctx, error) {
        l(error)
        ctx.type = 'json'
        ctx.status = 400
        ctx.body = error
      }
    },
    passportLocal,
  }
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };

};