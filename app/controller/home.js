'use strict';

class HomeController extends C {
  async index() {
    const {
      ctx,
    } = this;
    const r = use("app.schemas.signup");
    ctx.type = "json";
    ctx.body = `<h1>ShoneSingLone${JSON.stringify(r)}</h1>`;
  }
}

module.exports = HomeController;