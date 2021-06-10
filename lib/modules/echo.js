const Module = require("./module.js");

function unaltered(x) { return x; }

class Echo extends Module {
  #varname;
  #color;

  constructor(varname, color="default_") {
    super();

    this.#varname = varname;
    this.#color = color;
  }

  transform(x, c) {
    if (this.#color.constructor === String) {
      return c[this.#color](x[this.#varname]);
    } else {
      return this.#color(x[this.#varname], x, c);
    }
  }
}

module.exports = Echo;

