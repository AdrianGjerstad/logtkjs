const levels = require("./levels.js");
const modules = require("./modules/modules.js");
const timestamp = require("./timestamp.js");

(function(API) {
  async function json(x, colors, depth=0) {
    if (x === undefined || x === null) {
      return " ".repeat(depth) + colors.number("" + x);
    } else if (x.constructor === Number || x.constructor === Boolean) {
      return " ".repeat(depth) + colors.number(JSON.stringify(x));
    } else if (x.constructor === String) {
      return " ".repeat(depth) + colors.string(JSON.stringify(x));
    } else if (x.constructor === Array) {
      if (x.length === 0) return " ".repeat(depth) + "[]";
      
      let res = " ".repeat(depth) + "[ ";
      for (let i = 0; i < x.length; ++i) {
        if (i === 0) res += await json(x[i], colors, depth + 2).trim();
        else res += await json(x[i], colors, depth + 2);

        if (i + 1 < x.length) res += ",\n";
      }

      res += " ]";
      return res;
    } else if (x.constructor === Function) {
      return " ".repeat(depth) + colors.constant("[Function: " + x.name + "]");
    } else if (x.constructor === Date) {
      return " ".repeat(depth) + colors.constant("[Date: " + timestamp.strftime(x, "%u%Y-%m-%dT%H:%M:%S.%fZ") + "]");
    } else if (Object.prototype.toString.call(x) === "[object Error]") {
      return " ".repeat(depth) + colors.red("[" + x.name + ": " + x.message + "]");
    } else {
      if (Object.keys(x).length === 0) return " ".repeat(depth) + "{}";
      
      let res = " ".repeat(depth) + "{ ";
      let keys = Object.keys(x);
      for (let i = 0; i < keys.length; ++i) {
        if (i === 0) res += colors.keyword(JSON.stringify(keys[i])) + ": ";
        else res += " ".repeat(depth + 2) + colors.keyword(JSON.stringify(keys[i])) + ": ";

        let tmp = await json(x[keys[i]], colors, depth + 2);
        if (tmp.trim()[0] === "{") res += "{\n" + tmp.replace(/{/, " ");
        else if (tmp.indexOf("\n") !== -1) res += "\n" + tmp;
        else res += tmp.trim();

        if (i + 1 < keys.length) res += ",\n";
      }

      res += " }";
      return x[Symbol.toStringTag] === undefined ? res : colors.constant(x[Symbol.toStringTag]) + " {\n" + " ".repeat(depth + 2) + res.trim().substring(2);
    }
  };
  
  function format_JSON() {
    let res = async function(a, b) { return await json(a, b) + "\n"; }
    
    res.MAGIC = format_JSON.MAGIC;
    return res;
  }

  // File magic number (ignoring the fact that json is not a binary format)
  format_JSON.MAGIC = 0x4E4F534A;  // JSON (LE)

  API("json", format_JSON);

  async function bson(x) {
    if (x.constructor === Object || x.constructor === Array) {
      let res = [];
      
      let keys = Object.keys(x);
      for (let i = 0; i < keys.length; ++i) {
        if (x[keys[i]] === undefined || x[keys[i]] === null) {
          res.push(Buffer.concat([Buffer.from([0x0A]), Buffer.from(keys[i] + "\x00")]));
        } else if (x[keys[i]].constructor === Number) {
          if (x[keys[i]] % 1 === 0) {
            let tmp = Buffer.concat([Buffer.from([0x10]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(4)]);
            tmp.writeInt32LE(x[keys[i]], tmp.byteLength - 4);

            res.push(tmp);
          } else {
            let tmp = Buffer.concat([Buffer.from([0x01]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(8)]);
            tmp.writeDoubleLE(x[keys[i]], tmp.byteLength - 8);

            res.push(tmp);
          }
        } else if (x[keys[i]].constructor === BigInt) {
          let tmp = Buffer.concat([Buffer.from([0x12]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(8)]);
          tmp.writeBigInt64LE(x[keys[i]], tmp.byteLength - 8);

          res.push(tmp);
        } else if (x[keys[i]].constructor === String) {
          let tmp = Buffer.concat([Buffer.from([0x02]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(4), Buffer.from(x[keys[i]]), Buffer.from([0x00])]);
          tmp.writeUint32LE(x[keys[i]].length + 1, 2 + keys[i].length);

          res.push(tmp);
        } else if (x[keys[i]].constructor === Object) {
          res.push(Buffer.concat([Buffer.from([0x03]), Buffer.from(keys[i] + "\x00"), await bson(x[keys[i]])]));
        } else if (x[keys[i]].constructor === Array) {
          res.push(Buffer.concat([Buffer.from([0x04]), Buffer.from(keys[i] + "\x00"), await bson(x[keys[i]])]));
        } else if (x[keys[i]].constructor === Boolean) {
          res.push(Buffer.concat([Buffer.from([0x08]), Buffer.from(keys[i] + "\x00"), Buffer.from([x[keys[i]] + 0])]));
        } else if (x[keys[i]].constructor === Buffer) {
          let tmp = Buffer.concat([Buffer.from([0x05]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(4), Buffer.from([0x00]), x[keys[i]]]);
          tmp.writeUint32LE(x[keys[i]].byteLength, 2 + keys[i].length);

          res.push(tmp);
        } else if (x[keys[i]].constructor === RegExp) {
          res.push(Buffer.concat([Buffer.from([0x0B]), Buffer.from(keys[i] + "\x00"), Buffer.from(x[keys[i]].source + "\x00"), Buffer.from(x[keys[i]].source + "\x00")]));
        } else if (x[keys[i]].constructor === Function) {
          let tmp = Buffer.concat([Buffer.from([0x0D]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(4), Buffer.from(x[keys[i]].toString()), Buffer.from([0x00])]);
          tmp.writeUint32LE(x[keys[i]].toString().length + 1, 2 + keys[i].length);

          res.push(tmp);
        } else if (x[keys[i]].constructor === Date) {
          let tmp = Buffer.concat([Buffer.from([0x09]), Buffer.from(keys[i] + "\x00"), Buffer.allocUnsafe(8)]);
          tmp.writeBigInt64LE(BigInt(x[keys[i]].getTime()), tmp.byteLength - 8);

          res.push(tmp);
        }
      }

      let size = 5;
      for (let i = 0; i < res.length; ++i) size += res[i].byteLength;

      let f = Buffer.allocUnsafe(4);
      f.writeUint32LE(size, 0);
      
      return Buffer.concat([f, ...res, Buffer.from([0x00])]);
    }
  }
  
  // File magic number
  bson.MAGIC = 0x4E4F5342;  // BSON (LE)

  function format_BSON() {
    return bson;
  }

  format_BSON.MAGIC = bson.MAGIC;

  API("bson", format_BSON);

  function format_modular(mods=null) {
    if (mods === null) {
      mods = [
        new modules.Timestamp("%Y-%m-%d %H:%M:%S.%f%z", "blue"),
        new modules.Trace({color: "red", short: true}),
        new modules.Level(),
        new modules.StaticText(": "),
        new modules.Message()
      ];
    }
    
    async function modular(x, colors) {
      let res = "";
      let tmp;

      for (let i = 0; i < mods.length; ++i) {
        res += tmp = mods[i].transform(x, colors, strip_ansi(res).length);
        
        if (i + 1 < mods.length) {
          if (!(mods[i].constructor === modules.StaticText || mods[i+1].constructor === modules.StaticText || tmp.length === 0)) {
            res += " ";
          }
        }

        if (tmp.indexOf("\n") !== -1) break;
      }

      return res + "\n";
    }
    
    modular.MAGIC = format_modular.MAGIC;

    return modular;
  }
  
  // File magic number (even though `modular` is by definition not binary)
  format_modular.MAGIC = 0x646F6D00; // \0mod

  API("modular", format_modular);

  function format_protobuf(pbBuilder) {
    // Format log messages using Protobuf, Google's Data Interchange Format.
    // It is recommended that `File.bin_list`s are be enabled to enable readers
    // to read the resultant files more easily.
    //
    // pblib must have fields like pblib.logtk.Trace, etc. that represent
    // protobuf messages.
    if (!pblib.logtk) {
      throw new Error("[logtkjs] proto library must import package 'logtk'");
    }

    // Primary must be a class referring to the primary message type that the
    // application wishes to use.
    
    async function protobuf(x) {
      return await pbBuilder.build(x);
    };

    protobuf.MAGIC = format_protobuf.MAGIC;

    return protobuf;
  }

  format_protobuf.MAGIC = 0x66427250;  // PrBf

  API("protobuf", format_protobuf);

  function sprintfcb(fmt, cb) {
    let res = "";

    for (let i = 0; i < fmt.length; ++i) {
      if (fmt[i] == "%") {
        if (fmt[i + 1] == "%") {
          res += "%";
          ++i;
          continue;
        }

        let flags = "";
        while ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(fmt[++i]) === -1) {
          flags += fmt[i];
        }
        res += cb({ sig: fmt[i], flags });
      } else {
        res += fmt[i];
      }
    }

    return res;
  }
  
  // Version of sprintf, but every occurrence of a format atom results in a call to cb.
  API("sprintfcb", sprintfcb);

  function strip_ansi(x) {
    return x.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
  }

  API("strip_ansi", strip_ansi);
})(function(n, f) {
  module.exports[n] = f;
});

