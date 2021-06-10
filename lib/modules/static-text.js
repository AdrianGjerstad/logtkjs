const Module = require("./module.js");

class StaticText extends Module {
  #txt;
  #color;

  constructor(txt="", color="default_") {
    super();

    this.#txt = txt;
    this.#color = color;
  }

  transform(x, c) {
    return c[this.#color](this.#txt);
  }
}

module.exports = StaticText;

