'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  flash: {
    enable: true,
    package: 'egg-msg-flash',
  },
  validator: {
    enable: true,
    package: 'egg-y-validator',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  passport: {
    enable: true,
    package: 'egg-passport'
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local'
  },
}