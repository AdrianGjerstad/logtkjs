const Transport = require("../transport.js");

class Stream extends Transport {
  constructor(opts) {
    super(opts);

    opts = {
      stream: null,
      end_on_exit: true,
      ...opts
    };

    if (opts.stream === null) {
      throw new Error("[logtkjs] Stream transport stream option is required");
    }

    this._stream = opts.stream;
    this._end_on_exit = opts.end_on_exit;
  }

  ready() {
    // Nothing to do. The user has already given as an open stream
  }

  async data(x) {
    if (this._level <= x.$level.level) {
      this._stream.write(await this._format(x, this._theme));
    }
  }

  exit(n) {
    if (this._end_on_exit) {
      this._stream.end();
    }
  }
}

module.exports = Stream;

