// http.js
//
// common - Common HTTP Access Log Format
// combined - Combined HTTP Access Log Format

const modules = require("../modules/modules.js");
const format = require("../format.js");

(function(API) {
  function request_line_colorer(s, x, c) {
    switch (x.status.toString()[0]) {
    case '1':
    case '2':
      return c.green(s);
    case '3':
      return c.yellow(s);
    default:
      return c.red(s);
    }
  }

  function common() {
    return format.modular([
      new modules.Echo("client", "cyan"),
      new modules.Echo("identity", "green"),
      new modules.Echo("user", "green"),
      new modules.Timestamp("%d/%b/%Y:%H:%M:%S %z", "blue"),
      new modules.StaticText(" \""),
      new modules.Echo("line", request_line_colorer),
      new modules.StaticText("\" "),
      new modules.Echo("status", request_line_colorer),
      new modules.Echo("size", "purple")
    ]);
  }

  API("common", common);
  
  function combined() {
    return format.modular([
      new modules.Echo("client", "cyan"),
      new modules.Echo("identity", "green"),
      new modules.Echo("user", "green"),
      new modules.Timestamp("%d/%b/%Y:%H:%M:%S %z", "blue"),
      new modules.StaticText(" \""),
      new modules.Echo("line", request_line_colorer),
      new modules.StaticText("\" "),
      new modules.Echo("status", request_line_colorer),
      new modules.Echo("size", "purple"),
      new modules.PacketTraverser(x=>(x.headers["referrer"]?"\""+x.headers["referrer"]+"\"":"-"), "cyan"),
      new modules.PacketTraverser(x=>(x.headers["user-agent"]?"\""+x.headers["user-agent"]+"\"":"-"), "cyan")
    ]);
  }

  API("combined", combined);
})(function(n, f) {
  module.exports[n] = f;
});

