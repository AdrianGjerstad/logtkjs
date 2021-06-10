const Module = require("./module.js");
const levels = require("../levels.js");

class Level extends Module {
  constructor() {
    super();
  }

  transform(x, c) {
    if (x.$level.level === levels.emergency) {
      return c.bgRed(c.yellow(x.$level.repr));
    } else if (x.$level.level === levels.critical) {
      return c.bgRed(c.white(x.$level.repr));
    } else if (x.$level.level === levels.alert) {
      return c.purple(x.$level.repr);
    } else if (x.$level.level === levels.error) {
      return c.red(x.$level.repr);
    } else if (x.$level.level === levels.warning) {
      return c.yellow(x.$level.repr);
    } else if (x.$level.level === levels.notice) {
      return c.green(x.$level.repr);
    } else if (x.$level.level === levels.info) {
      return c.blue(x.$level.repr);
    } else if (x.$level.level === levels.debug) {
      return c.cyan(x.$level.repr);
    }

    return "";
  }
}

module.exports = Level;

