const Module = require("./module.js");
const timestamp = require("../timestamp.js");

class Timestamp extends Module {
  #fmt;
  #color;

  constructor(fmt="%c", color="blue") {
    super();

    this.#fmt = fmt;
    this.#color = color;
  }

  transform(x, c) {
    return c[this.#color]("[" + timestamp.strftime(x.$time, this.#fmt) + "]");
  }
}

module.exports = Timestamp;

