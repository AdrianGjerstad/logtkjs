const Module = require("./module.js");

class Pid extends Module {
  #color;

  constructor(color="red") {
    super();

    this.#color = color;
  }

  transform(x, c) {
    if (Object.keys(x).indexOf("pid") !== -1) {
      return c[this.#color]("<pid:" + x.pid + ">");
    }

    return "";
  }
}

module.exports = Pid;

