'use strict';
const _ = require('lodash');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const res = await this.app.mysql.query('select * from users');
    _.forEach(res, d => delete d.password);
    ctx.body = 'hi, someone ' + _.reduce(res[0], (target, value, key) => target + `\n${key}:${value}`, '');
  }
}

module.exports = HomeController;
