const clusterOps = require("cluster-ops");
const logtk = require("../../lib/logtk.js");

const c = clusterOps.createCluster({
  workers: 2,
  file: "./worker.js",
  args: [],
  restart: {
    error: true,
    signal: true,
    normal: false,
    min_age: 500
  },
  env: {},
});

const l = logtk.createCluster({
  cluster: c,

  format: logtk.format.modular([
    new logtk.modules.Timestamp("%Y-%m-%d %H:%M:%S.%f%z", "blue"),
    new logtk.modules.Pid("purple"),
    new logtk.modules.Trace({color: "red", short: true}),
    new logtk.modules.Level(),
    new logtk.modules.StaticText(": "),
    new logtk.modules.Message()
  ]),
  theme: logtk.colors.onedark,

  transports: [
    new logtk.transports.Console()
  ]
});

c.start();

