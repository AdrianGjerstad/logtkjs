const logtk = require("../lib/logtk.js");
const pblib = require("./proto/message.js");

let logger = logtk.createLogger({
  format: logtk.format.modular([
    new logtk.modules.Timestamp("%u%Y-%m-%d %H:%M:%S.%f %z", "blue"),
    new logtk.modules.Pid("purple"),
    new logtk.modules.Trace({ color: "red", short: true }),
    new logtk.modules.Level(),
    new logtk.modules.StaticText(": "),
    new logtk.modules.Message()
  ]),
  theme: logtk.colors.onedark,
  level: logtk.levels.debug,
  defaults: {
    pid: process.pid
  },
  transports: [
    new logtk.transports.Console(),
    new logtk.transports.Network({
      protocol: logtk.network.TCP,
      secure: false,
      host: '127.0.0.1',
      port: 6544,
      format_id: 'protobuf',
      format: logtk.format.protobuf(pblib, pblib.test.Message),
      secret: Buffer.allocUnsafe(64).fill(0)
    })
  ]
});

//throw new Error("Hello, world!");

//logger.error(new Error("Test error"));

setTimeout(() => {
  logger.info("Hello, world!");
  logger.info("This is a test!");
  logger.exit(0);
}, 5000);

/*
logger.info({
  client: "127.0.0.1",
  identity: "-",
  user: "-",
  line: "GET / HTTP/1.1",
  status: 200,
  size: 12345,
  headers: {
    "user-agent": "a user-agent header"
  }
});
*/

