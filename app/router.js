'use strict'

const {
  initRouterMap
} = require('./utils');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller
  } = app;
  app.once('server', server => {
    l("server");
    // websocket
  });
  app.on('error', (err, ctx) => {
    l("error");
    // report error
  });
  app.on('request', ctx => {
    l("request");
    // log receive request
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime;
    l("response", used);
    // log total cost
  });



  router.get('/', controller.home.index);
  /* passport *1 */
  controller.passport = controller.passport || {};
  controller.passport.local = app.passport.authenticate('local');
  /* passport *2 */

  app.passport.verify(async (ctx, user) => {
    // check user
    l(user.provider, 'user.provider should exists');
    l(user.id, 'user.id should exists');

    // find user from database
    //
    // Authorization Table
    // column   | desc
    // ---      | --
    // provider | provider name, like github, twitter, facebook, weibo and so on
    // uid      | provider unique id
    // user_id  | current application user id
  });
  l("controller.passport.local",controller.passport.local);
  app.router.post('/passport/local', controller.passport.local);
  router.get('/admin', controller.home.admin);
  router.get('/logout', controller.home.logout);
  initRouterMap('/api/v1', require('./api')(controller), router);

}