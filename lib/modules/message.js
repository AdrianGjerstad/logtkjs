const Module = require("./module.js");

class Message extends Module {
  constructor() {
    super();
  }

  transform(x, c, l) {
    if (x.$message === undefined || x.$message === null)  {
      return c.number(x.$message);
    }

    let res = "";

    if (Object.prototype.toString.call(x.$message) === "[object Error]") {
      let s = x.$message.stack.split("\n");
      
      res += c.red(s[0]);

      for (let i = 1; i < s.length; ++i) {
        res += "\n" + ".".repeat(l-1) + " " + c.red(s[i]);
      }
    } else {
      res = x.$message;
    }
    
    return res;
  }
}

module.exports = Message;

