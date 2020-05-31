'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  ejs: {
    enable: true,
    package: 'egg-view-ejs',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  passport: {
    enable: false,
    package: 'egg-passport',
  },
  jwt: {
    enable: false,
    package: 'egg-jwt',
  },
  passportLocal: {
    enable: false,
    package: 'egg-passport-local',
  },
};
