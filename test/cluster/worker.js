const clusterOps = require("cluster-ops");
const logtk = require("../../lib/logtk.js");

const worker = new clusterOps.Worker();

let logger = logtk.createLogger({
  error: {report: true, exit: true},
  defaults: {
    pid: process.pid
  },
  transports: [
    new logtk.transports.ClusterReport({
      worker
    })
  ]
});

function test() {
  if (Math.random() < 0.9) {
    logger.info("Hello!");
    setTimeout(test, Math.random()*1000);
  } else {
    throw new Error("Hello, error!");
  }
}

test();

