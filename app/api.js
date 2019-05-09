'use strict'

module.exports = ctl => {
  console.log("ctl", ctl);
  return {
    post: {
      '/signup': ctl.user.signUp, // 注册
      '/signin': ctl.user.signIn // 登录
    },
  }
}