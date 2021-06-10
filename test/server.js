const logtk = require("../lib/logtk.js");
const pblib = require("./proto/message.js");

let server = new logtk.server.Server({
  host: "127.0.0.1",
  port: 6544,
  secret: Buffer.allocUnsafe(64).fill(0),
  supported_formats: [ "protobuf" ]
});

server.on("log", function(data) {
  console.log(pblib.test.Message.decode(data));
});

server.listen();

