'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
      TINYINT,
    } = Sequelize;
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      email: STRING(40),
      password: STRING,
      inviter_id: INTEGER,
      username: STRING(40),
      weibo: STRING(40),
      weixin: STRING(40),
      team_id: INTEGER,
      receive_remote: TINYINT(1),
      email_verifyed: TINYINT(1),
      avatar: STRING(40),
      created_at: {
        allowNull: false,
        type: DATE,
      },
      updated_at: {
        allowNull: false,
        type: DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */
    return queryInterface.dropTable('Users');
  },
};
