'use strict';
module.exports = (sequelize, DataTypes) => {
  const Abbo = sequelize.define('Abbo', {
    name: DataTypes.STRING
  }, {});
  Abbo.associate = function(models) {
    // associations can be defined here
  };
  return Abbo;
};