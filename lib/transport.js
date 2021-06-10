const levels = require("./levels.js");
const colors = require("./colors.js");

class Transport {
  constructor(opts, default_colors) {
    opts = {
      format: null,
      level: levels.info,
      theme: null,
      ...opts
    };

    this._format = opts.format;
    this._level = opts.level;
    this._theme = opts.theme;
  }

  _format_was_set() {
    return this._format !== null;
  }

  set format(fmt) {
    this._format = fmt;
  }

  _theme_was_set() {
    return this._theme !== null;
  }

  set theme(t) {
    this._theme = t;
  }

  get level() {
    return this._level + 0;
  }

  set level(l) {
    return (this._level = l) + 0;
  }
  
  // Abstract function called once all custom formats, themes, etc. have been
  // settled. You can think of this like a safer initializer function than the
  // constructor.
  ready() {
    console.warn("[logtkjs] Transport.ready is abstract and should not be called directly.");
  }
  
  // Asyncronous because I/O may take some time, and that shouldn't affect
  // application responsiveness.
  async data(x) {
    console.warn("[logtkjs] Transport.data is abstract and should not be called directly. Data: " + JSON.stringify(x));
    return "";
  }

  exit(n) {
    console.warn("[logtkjs] Transport.exit is abstract and should not be called directly. Exit code: " + n);
  }
}

module.exports = Transport;

