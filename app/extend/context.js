'use strict';
// app/extend/context.js
const verify = require('./context/verify').verify;
const RESPONSE_CODE = require('./types.js');
module.exports = {
  isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },
  verify,
  RESPONSE_CODE,
};
