const Module = require("./module.js");

class PacketTraverser extends Module {
  #traverse;
  #color;

  constructor(traverse, color) {
    super();

    this.#traverse = traverse;
    this.#color = color;
  }

  transform(x, c) {
    return c[this.#color](this.#traverse(x));
  }
}

module.exports = PacketTraverser;

