'use strict';


module.exports = {
  /** TODO: proxy 优化*/
  dotenv(key) {
    return process.env[key] || '';
  },
};
