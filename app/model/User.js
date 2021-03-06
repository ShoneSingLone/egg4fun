'use strict';
const bcrypt = require('bcrypt');

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    TINYINT,
    NOW,
  } = app.Sequelize;

  const User = app.model.define('user', {
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
      defaultValue: NOW,
    },
    updated_at: {
      allowNull: false,
      type: DATE,
      defaultValue: NOW,
    },
  });

  User.associate = function() {
    app.model.Invitation.belongsTo(app.model.User, {
      foreignKey: 'user_id',
    });
    app.model.User.hasMany(app.model.Invitation, {
      foreignKey: 'user_id',
    });

    app.model.Invitation.belongsTo(app.model.User, {
      foreignKey: 'use_user_id',
      as: 'used_user',
    });

    app.model.User.hasOne(app.model.Invitation, {
      foreignKey: 'use_user_id',
      as: 'my_used_invitaion',
    });
  };


  /**
   * * 哈希密码 Hooks
   * @param {User} user 用户实例
   * @return {void}
   */
  async function hashPwd(user) {
    if (!user.changed('password')) {
      return;
    }
    user.password = await bcrypt.hash(user.password, 10);
  }

  User.beforeSave(hashPwd);

  /**
   * * 用户登录方法
   * @param {string} email 邮箱
   * @param {string} password 密码
   * @return {(User|boolean)} 登陆成功的用户
   */
  User.Auth = async function(email, password) {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  };

  User.findByEmail = async function(email) {
    return await this.findOne({
      where: {
        email,
      },
    });
  };

  return User;
};
