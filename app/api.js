'use strict'

module.exports = ctl => {
  l("ctl", ctl);
  return {
    post: {
      '/signup': ctl.user.signUp, // 注册
      '/signin': ctl.user.signIn // 登录
    },
  }
}