'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = {
      res: ctx.model.Invitation,
      isIOS: ctx.isIOS(),
    };
    ctx.status = 201;
  }
}

module.exports = BaseController;
