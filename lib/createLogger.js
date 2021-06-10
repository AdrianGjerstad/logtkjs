const Logger = require("./logger.js");

module.exports = function createLogger(opts) {
  return new Logger(opts);
};

