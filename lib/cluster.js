const EventEmitter = require("events");

const colors = require("./colors.js");
const levels = require("./levels.js");

const clusterOps = require("cluster-ops");

// Yes I realize that this difference in capitalization is awkward.
// Deal with it.
class Cluster extends EventEmitter {
  constructor(opts) {
    super();
    
    opts = {
      cluster: null,
      format: x=>x,
      theme: colors.none,
      defaults: {},
      transports: [],
      ...opts
    };

    if (opts.cluster === null) {
      throw new Error("[logtkjs] logtk.Cluster cluster option must be set");
    }

    this._cluster = opts.cluster;
    this._format = opts.format;
    this._theme = opts.theme;
    this._defaults = opts.defaults;
    this._transports = opts.transports;

    for (let i = 0; i < this._transports.length; ++i) {
      if (!this._transports[i]._format_was_set()) {
        this._transports[i].format = this._format;
      }

      if (!this._transports[i]._theme_was_set()) {
        this._transports[i].theme = this._theme;
      }

      this._transports[i].ready();
    }

    this._children = {};

    this.ready();
  }

  ready() {
    this._cluster.on("death", this.#onDeath.bind(this));
    this._cluster.on("restart", this.#onRestart.bind(this));

    this._cluster.on("message-" + Cluster.msg_type, this.#onMessage.bind(this));

    this._cluster.on("exit", this.#exit.bind(this));
  }

  #onDeath(worker, code, signal) {
    if (signal) {
      this.#errorMeta("Worker PID:" + worker.process.pid + " killed by " + signal);
    } else if (code !== 0) {
      this.#errorMeta("Worker PID:" + worker.process.pid + " exited with code " + code);
    } else {
      this.#noticeMeta("Worker PID:" + worker.process.pid + " exited normally");
    }
  }

  #onRestart(old, n) {
    this.#noticeMeta("Restarted Worker PID:" + old.process.pid + " (new PID:" + n.process.pid + ")");
  }

  #onMessage(worker, msg) {
    this.#dispatch(msg);
  }

  #dispatch(obj, traceBack=0) {
    if (traceBack) {
      obj.$time = new Date();
      let tmp = new Error().stack.split("\n")[traceBack].match(/\(([^:]+):([0-9]+):([0-9]+)\)/);
      if (tmp !== null) obj.$trace = { file: tmp[1], line: parseInt(tmp[2]), col: parseInt(tmp[3]) };
      else obj.$trace = { file: "no file", line: 0, col: 0 };
      obj.$level = { level: obj.$level, repr: levels[obj.$level] };
    }

    for (let i = 0; i < this._transports.length; ++i) {
      this._transports[i].data(obj);
    }
  }

  #mux(x, level) {
    // Only called by #...Meta(s), where x is guaranteed to be a string, and
    // level is guaranteed to be a number.
    this.#dispatch({
      ...Cluster.standard_keys,
      ...this._defaults,
      $level: level,
      $message: x
    }, 4);
  }
  
  /**
   * #infoMeta(String) -> void
   *
   * Perform info-level log that involves the functioning of this cluster.
   */
  #infoMeta(s) {
    this.#mux("[logtk.Cluster] " + s, levels.info);
  }

  /**
   * #noticeMeta(String) -> void
   *
   * Perform notice-level log that involves the functioning of this cluster.
   */
  #noticeMeta(s) {
    this.#mux("[logtk.Cluster] " + s, levels.notice);
  }
  
  /**
   * #errorMeta(String) -> void
   *
   * Perform error-level log that involves the functioning of this cluster.
   */
  #errorMeta(s) {
    this.#mux("[logtk.Cluster] " + s, levels.error);
  }

  #exit() {
    for (let i = 0; i < this._transports.length; ++i) {
      this._transports[i].exit(0);
    }
  }
}

Cluster.msg_type = "logtk";
Cluster.standard_keys = {
  pid: process.pid,
};

// In milliseconds
Cluster.MINIMUM_AGE_BEFORE_RESTART = 1000;

module.exports = Cluster;

