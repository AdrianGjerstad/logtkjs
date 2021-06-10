const format = require("./format.js");
const levels = require("./levels.js");
const colors = require("./colors.js");
const Transport = require("./transport.js");

class Logger {
  #transports;
  #defaults;
  #format;
  #theme;

  /**
   * Logger(options)
   *
   * Create a new logger instance which you can use to log anything about your
   * application or service using any number of transports, output formats, or
   * data formats.
   *
   * Options fields:
   * - transports (Transport[]): List of transports (delivery systems, e.g.
   *   file, console, network, etc.).
   *   - Default: [] (No output transports)
   * - defaults (Object<any>): An object containing all default parameters for
   *   your transport. (All transport `data` events are passed a single object)
   *   - Default: {} (No defaults; all custom fields must be explicit)
   * - format (Function<String(Object<any>, Colors)>): Default format transform
   *   for all output transports. Can be overridden for any individual transport
   *   using the special `format` option in a transport constructor.
   *   - Default: logtk.format.json (optionally colored JSON dump)
   * - theme (Object<Function<String(String)>>): Color theme for all output
   *   transports. Can be overridden for any individual transport using the
   *   special `theme` option in a transport constructor.
   *   - Default: logtk.colors.onedark (One Dark theme; default can be overriden
   *     or ignored depending on applications of the transport)
   * - errors (Object<`report`<Boolean>, `exit`<Boolean>): Uncaught exception
   *   reporting options.
   *   - Default: { report: true, exit: true } (report errors and exit)
   *
   * @constructor
   */
  constructor(opts) {
    opts = {
      transports: [],
      defaults: {},
      format: format.json(),
      theme: colors.onedark,
      errors: {},
      ...opts
    };

    opts.errors = {
      report: true,
      exit: true,
      ...opts.errors
    };

    this.#transports = opts.transports;
    this.#defaults = opts.defaults;
    this.#format = opts.format;
    this.#theme = opts.theme;

    for (let i = 0; i < this.#transports.length; ++i) {
      if (!this.#transports[i]._format_was_set()) {
        this.#transports[i].format = this.#format;
      }

      if (!this.#transports[i]._theme_was_set()) {
        this.#transports[i].theme = this.#theme;
      }

      this.#transports[i].ready();
    }
    
    let self = this;
    process.on("exit", (n) => {
      for (let i = 0; i < this.#transports.length; ++i) {
        this.#transports[i].exit(n);
      }
    });

    if (opts.errors.report) {
      process.on("uncaughtException", function(ex, origin) {
        self.error(ex);

        if (opts.errors.exit) {
          process.exit(1);
        }
      });
    }
  }

  /**
   * add(logtk.Transport) -> void
   * add(String|Symbol, any) -> void
   *
   * Add a new transport or default field to the logger.
   */
  add(key, value) {
    if (key instanceof Transport) {
      let t = key;

      if (!t._format_was_set()) {
        t.format = this.#format;
      }

      if (!t._theme_was_set()) {
        t.theme = this.#theme;
      }

      t.ready();

      this.#transports.push(t);
    } else {
      this.#defaults[key] = value;
    }
  }

  /**
   * remove(String) -> void
   *
   * Remove a default by its key.
   */
  remove(key) {
    delete this.#defaults[key];
  }

  /**
   * get format() -> Function
   *
   * Get the format function this logger uses. Note that its transports may not
   * use the same format function.
   *
   * @getter
   */
  get format() {
    return this.#format;
  }

  /**
   * get theme() -> Object<Function>
   *
   * Get the color scheme transform this logger uses. Note that its transports
   * may not use the same scheme.
   *
   * @getter
   */
  get theme() {
    return this.#theme;
  }

  /**
   * forEach(Function) -> void
   *
   * Iterate over the list of transports this logger has.
   *
   * The callback should look like this:
   *
   * callback(logtk.Transport[, Number])
   */
  forEach(callback) {
    for (let i = 0; i < this.#transports.length; ++i) {
      callback.call(this, this.#transports[i], i);
    }
  }
  
  /**
   * #data(Object<any>) -> void
   *
   * Self-notification that new log data should be processed. This function
   * pretty much just dispatches the object passed to each transport.
   *
   * @private
   */
  #data(obj) {
    obj.$time = new Date();
    let tmp = new Error().stack.split("\n")[4].match(/\(([^:]+):([0-9]+):([0-9]+)\)/);
    if (tmp !== null) obj.$trace = { file: tmp[1], line: parseInt(tmp[2]), col: parseInt(tmp[3]) };
    else obj.$trace = { file: "no file", line: 0, col: 0 };
    obj.$level = { level: obj.$level, repr: levels[obj.$level] };

    for (let i = 0; i < this.#transports.length; ++i) {
      this.#transports[i].data(obj);
    }
  }

  /**
   * #mux(any, Level) -> void
   *
   * Multiplexer logic for each log level, and sending log data to #data for
   * processing.
   *
   * @private
   */
  #mux(x, level) {
    if (x === undefined || x === null) {
      this.#data({ ...this.#defaults, $level: level, $message: x});
    } else if (Object.prototype.toString.call(x) === "[object Error]") {
      this.#data({ ...this.#defaults, $level: level, $message: x });
    } else if (x.constructor !== Object) {
      this.#data({ ...this.#defaults, $level: level, $message: x});
    } else {
      this.#data({ ...this.#defaults, ...x, $level: level });
    }
  }

  /**
   * emergency(any) -> void
   *
   * Log an `emergency`-level message.
   */
  emergency(x) {
    this.#mux(x, levels.emergency);
  }

  /**
   * alert(any) -> void
   *
   * Log an `alert`-level message.
   */
  alert(x) {
    this.#mux(x, levels.alert);
  }

  /**
   * critical(any) -> void
   *
   * Log a `critical`-level message
   */
  critical(x) {
    this.#mux(x, levels.critical);
  }

  /**
   * error(any) -> void
   *
   * Log an `error`-level message.
   */
  error(x) {
    this.#mux(x, levels.error);
  }

  /**
   * warning(any) -> void
   *
   * Log a `warning`-level message.
   */
  warning(x) {
    this.#mux(x, levels.warning);
  }

  /**
   * notice(any) -> void
   *
   * Log a `notice`-level message.
   */
  notice(x) {
    this.#mux(x, levels.notice);
  }

  /**
   * info(any) -> void
   *
   * Log an `info`-level message.
   */
  info(x) {
    this.#mux(x, levels.info);
  }

  /**
   * debug(any) -> void
   *
   * Log a `debug`-level message.
   */
  debug(x) {
    this.#mux(x, levels.debug);
  }

  /**
   * exit(Number?) -> void
   *
   * Log an exit message and clean up any open resources.
   */
  exit(x) {
    for (let i = 0; i < this.#transports.length; ++i) {
      this.#transports[i].exit(x);
    }
  }
}

module.exports = Logger;

