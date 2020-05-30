'use strict';
const _ = require('lodash');
function makeEnum(_RESPONSE_CODE = []) {
  return _.reduce(_RESPONSE_CODE, (enumObj, value, index) => {
    enumObj[enumObj[value] = index] = value;
    return enumObj;
  }, {});
}

const RESPONSE_CODE = [
  'verifyForm',
];


module.exports = makeEnum(RESPONSE_CODE);
