'use strict';
module.exports = (sequelize, DataTypes) => {
  const Abboright = sequelize.define('Abboright', {
    id: DataTypes.STRING
  }, {});
  Abboright.associate = function(models) {
    // associations can be defined here
  };
  return Abboright;
};