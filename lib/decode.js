// Node.js Library for Decoding Binary Log Formats
// Current Support:
// - protobuf (via protobufjs)
// - BSON (binary JSON)

const levels = require("./levels.js");
const format = require("./format.js");

const fs = require("fs");

const pmin = require("protobufjs/minimal");

(function(API) {
  function protobuf(filename, Primary) {
    let res = [];

    let raw = fs.readFileSync(filename);

    if (raw.readUint32LE() !== format.protobuf.MAGIC) {
      throw new Error("[logtkjs] cannot decode protobuf log file: invalid magic");
    }

    let index = 4;
    while (index < raw.byteLength) {
      let length = raw.readUint32LE(index);
      index += 4;
      let msg = Primary.decode(raw.slice(index, length+index));
      index += length;

      let obj = {};
      obj.$message = msg._message;
      obj.$level = { level: msg.base._level, repr: levels[msg.base._level] };
      obj.$trace = {
        file: msg.base._trace.file,
        line: msg.base._trace.line,
        col: msg.base._trace.col
      };
      obj.$time = new Date(msg.base._time.toNumber());

      for (let key in msg) {
        if (key !== "toJSON" && key !== "base" && key !== "$message" && key !== "$level" && key !== "$trace" && key !== "$time") {
          if (msg[key].constructor === pmin.util.Long) {
            obj[key] = msg[key].toNumber();
          } else {
            obj[key] = msg[key];
          }
        }
      }

      res.push(obj);
    }

    return res;
  }

  API("protobuf", protobuf);

  function decode_bson_object(buf, is_array=false) {
    let res;
    if (is_array) res = [];
    else res = {};

    let length = buf.readUint32LE(0);
    let index = 4;

    while (index < length) {
      let opcode = buf[index++];
      if (opcode === 0x00) break;  // End of document
      let next_null = index;
      for (let i = index; i < length; ++i) {
        if (buf[i] === 0x00) {
          next_null = i;
          break;
        }
      }
      let name = buf.slice(index, next_null).toString();
      index = next_null + 1;

      switch (opcode) {
      case 0x01: {
        // Floating point number
        res[name] = buf.readDoubleLE(index);
        index += 8;
        break;
      }
      case 0x02: {
        // UTF-8 String
        let size = buf.readUint32LE(index);
        res[name] = buf.slice(index += 4, (index += size) - 1).toString();
        break;
      }
      case 0x03: {
        // BSON Embedded Document
        res[name] = decode_bson_object(buf.slice(index, index += buf.readUint32LE(index)), false);
        break;
      }
      case 0x04: {
        // BSON Embedded Document (Interpreted as an array)
        res[name] = decode_bson_object(buf.slice(index, index += buf.readUint32LE(index)), true);
        break;
      }
      case 0x05: {
        // Arbitrary Binary Data
        let size = buf.readUint32LE(index);
        index += 4;
        switch (buf[index++]) {
        case 0x00:
        case 0x01: {
          res[name] = buf.slice(index, index += size);
          break;
        }
        }

        break;
      }
      case 0x06: {
        // Undefined (deprecated in spec, but still supported here)
        res[name] = undefined;
        break;
      }
      case 0x08: {
        // Boolean Value
        res[name] = buf[index++] !== 0x00;
        break;
      }
      case 0x09:
      case 0x11: {
        // UTC datetime (gets decoded into Date object)
        let number = buf.readBigInt64LE(index);
        index += 8;
        res[name] = new Date(Number(number));
        break;
      }
      case 0x0a: {
        // Null
        res[name] = null;
        break;
      }
      case 0x0b: {
        // Regex
        next_null = index;
        for (let i = index; i < length; ++i) {
          if (buf[i] === 0x00) {
            next_null = i;
            break;
          }
        }
        let source = buf.slice(index, next_null).toString();
        index = next_null + 1;
        
        next_null = index;
        for (let i = index; i < length; ++i) {
          if (buf[i] === 0x00) {
            next_null = i;
            break;
          }
        }
        let flags = buf.slice(index, next_null).toString();
        index = next_null + 1;

        res[name] = new RegExp(source, flags);
        break;
      }
      case 0x10: {
        // Normal JS integer number
        res[name] = buf.readInt32LE(index);
        index += 4;
        break;
      }
      case 0x12: {
        // JS BigInt
        res[name] = buf.readBigInt64LE(index);
        index += 8;
        break;
      }
      }
    }

    return res;
  }

  API("decode_bson_object", decode_bson_object);

  function bson(filename) {
    let res = [];

    let raw = fs.readFileSync(filename);

    if (raw.readUint32LE(0) !== format.bson.MAGIC) {
      throw new Error("[logtkjs] cannot decode BSON log file: invalid magic");
    }

    let index = 4;
    while (index < raw.byteLength) {
      let length = raw.readUint32LE(index);
      index += 4;
      let buf = raw.slice(index, length+index);
      index += length;

      res.push(decode_bson_object(buf));
    }

    return res;
  }

  API("bson", bson);
})(function(n, f) {
  module.exports[n] = f;
});

