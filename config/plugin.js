'use strict';

/** @type Egg.EggPlugin */
exports.sequilize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.flash = {
  enable: true,
  package: 'egg-msg-flash',
};

exports.validator = {
  enable: true,
  package: 'egg-y-validator',
};