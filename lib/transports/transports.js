module.exports = {
  Console: require("./console.js"),  // Log data to the console (generally for dev/debug only)
  File: require("./file.js"),  // Log data to a file (If on Linux, can be a UNIX socket device)
  Network: require("./network.js"),  // Log data out to a server somewhere else using the logtk binary protocol.
  ClusterReport: require("./cluster-report.js"),  // Report back to a cluster primary process.
  Stream: require("./stream.js"),  // Log data to a WritableStream instance
};

/**
 * registerTransport(Class) -> void (throws Error)
 *
 * Register a new transport by putting it into the logtk.transports registry. It
 * is recommended to use this method to create custom transports instead of
 * setting it directly, because this method provides a standard vector for
 * adding functionality, and it also removes the chance of overwriting a
 * transport that is already there.
 */
module.exports.registerTransport = function registerTransport(c) {
  if (module.exports[c.name] === undefined) {
    module.exports[c.name] = c;
  } else {
    throw new Error("[logtkjs (registerTransport)] Transport " + c.name + " is already registered");
  }
}

