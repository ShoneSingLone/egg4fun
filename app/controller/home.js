'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const r = use("app.schemas.signup");
    ctx.type = "json";
    ctx.body = `<h1>ShoneSingLone${JSON.stringify(r)}</h1>` ;
  }
}

module.exports = HomeController;