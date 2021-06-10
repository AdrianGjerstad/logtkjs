const Transport = require("../transport.js");
const Cluster = require("../cluster.js");

const cluster = require("cluster");

class ClusterReport extends Transport {
  constructor(opts) {
    super(opts);

    if (cluster.isPrimary) {
      throw new Error("[logtkjs] ClusterReport transport must not be instantiated outside of a worker instance");
    }
    
    opts = {
      worker: null,
      ...opts
    };

    if (opts.worker === null) {
      throw new Error("[logtkjs] ClusterReport transport must be passed the worker option");
    }

    this._worker = opts.worker;
  }

  ready() {
    // Nothing to do.
  }

  async data(x) {
    // Send this data back up to the primary cluster process. I am intentionally
    // passing up checking for the level.
    this._worker.send(x, Cluster.msg_type);
  }

  exit(n) {
    // Nothing to do. The parent Cluster will log this process's exit more reliably.
  }
}

module.exports = ClusterReport;

