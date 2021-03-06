'use strict';
const Controller = require('egg').Controller;
const _ = require('lodash');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async signup() {
    const {
      ctx,
    } = this;
    await ctx.verify('user.signup', 'body');
    const json = await ctx.service.users.signUp();
    json.user = _.pick(json.user, [
      'email',
      'email_verifyed',
      'isNewRecord',
      'receive_remote',
      'updated_at',
      'updatedAt',
      'username',
      'weibo',
      'weixin',
    ]);
    ctx.helper.apiOk(json);
  }

  /*
   * @description 登录
   * @memberof User
   * */
  async signin() {
    const {
      ctx,
    } = this;
    await ctx.verify('user.signui', 'body');
    const json = await ctx.service.user.signup();

    ctx.body = '登录';
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const {
      name,
      age,
    } = ctx.request.body;
    const user = await ctx.model.User.create({
      name,
      age,
    });
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const {
      name,
      age,
    } = ctx.request.body;
    await user.update({
      name,
      age,
    });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
