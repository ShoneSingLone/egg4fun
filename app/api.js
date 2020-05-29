'use strict';
module.exports = ctl => {
  return {
    post: {
      '/signup': ctl.users.signup,
      '/signin': ctl.users.signin, //
    },
  };
};
