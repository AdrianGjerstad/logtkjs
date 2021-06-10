const Transport = require("../transport.js");
const levels = require("../levels.js");

class Console extends Transport {
  constructor(opts) {
    super(opts);

    opts = {
      stderr: true,
      ...opts
    };

    this._stderr = opts.stderr;
  }

  ready() {
    // No post-constructor things to do
  }

  async data(x) {
    if (x.$level.level <= this._level) {
      if (this._stderr) {
        // Data is to be sent out to stderr (fd:2)
        process.stderr.write(await this._format(x, this._theme));
      } else {
        // Data is to be sent out to stdout (fd:1)
        // (stdout buffers, which is why this branch of code must be selected
        // explicitly, because it can interfere with things like errors)
        process.stdout.write(await this._format(x, this._theme));
      }
    }
  }

  exit(x) {
    // Nothing to do
  }
}

module.exports = Console;

