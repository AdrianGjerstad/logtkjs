const Module = require("./module.js");

class Trace extends Module {
  #color;
  #short;

  constructor(opts) {
    super();
    opts = {
      color: "red",
      short: false,
      ...opts
    };

    this.#color = opts.color;
    this.#short = opts.short;
  }

  transform(x, c) {
    if (!this.#short) {
      return c[this.#color]("<" + x.$trace.file + ":" + x.$trace.line + ":" + x.$trace.col + ">");
    } else {
      if (x.$trace.file.startsWith(process.env.PWD) && process.env.PWD !== "/") {
        return c[this.#color]("<" + x.$trace.file.substring(process.env.PWD.length+1) + ":" + x.$trace.line + ">");
      } else {
        return c[this.#color]("<" + x.$trace.file + ":" + x.$trace.line + ">");
      }
    }
  }
}

module.exports = Trace;

