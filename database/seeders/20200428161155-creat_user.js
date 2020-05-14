'use strict';
const utils = require('utility');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Users', [
      {
        email: 'SingLone@foxmail.com',
        password: utils.md5('000000'),
        inviter_id: 0,
        username: 'SSL',
        weixin: 'xxxx',
        weibo: 'xxxx',
        receive_remote: 0,
        email_verifyed: 1,
        avatar: 'xxxx.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Users', null, {});
  },
};
