'use strict';

class HomeController extends C {
  async index() {
    const {
      ctx,
    } = this;
    const r = use("app.schemas.home");
    ctx.type = "json";
    ctx.body = `${JSON.stringify(ctx.request,null,2)}`;
  }

  async admin() {
    const {
      ctx
    } = this;

    if (ctx.isAuthenticated()) {
      // show user info
      l("Authenticated success");
      ctx.body = `<div>
      <h2>${ctx.path}</h2>
      <hr>
      Logined user: <img src="${ctx.user.photo}"> ${ctx.user.displayName} / ${ctx.user.id} | <a href="/logout">Logout</a>
      <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
      <hr>
      <a href="/">Home</a> | <a href="/user">User</a>
    </div>`;

    } else {
      l("Authenticated faild");
      // redirect to origin url by ctx.session.returnTo
      ctx.session.returnTo = ctx.path;
      ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
          <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a> |
          <a href="/passport/yuque">YuQue 语雀</a>
          <hr>
          <a href="/">Home</a> | <a href="/user">User</a>
        </div>
      `;
      // await ctx.render('login.html');
    }
  }
  /**
   *  *logout退出
   * @memberOf HomeController
   */
  async logout() {
    const ctx = this.ctx;
    ctx.logout();
    l("www.baidu.com");
    ctx.redirect('https://www.baidu.com');
  }
}

module.exports = HomeController;