module.exports.TCP = Symbol("transport control protocol");
module.exports.WS = Symbol("websocket");

module.exports.FRAME_CLOSE = 0x00;
module.exports.FRAME_AUTH = 0x01;
module.exports.FRAME_INIT = 0x02;
module.exports.FRAME_DATA = 0x03;
module.exports.FRAME_ACK = 0x04;
module.exports.FRAME_PING = 0x80;
module.exports.FRAME_PONG = 0x81;

function varuint32(n) {
  if (n < 0) n = -n;

  let res = [];
  
  let skip = true;
  while (n !== 0) {
    let byte = n & 0x7F;
    n >>= 7;
    byte |= 0x80;
    
    if (skip) {
      byte &= 0x7F;
      skip = false;
    }

    res.unshift(byte);
  }

  return res;
}

function q_varuint32(x, y=0) {
  let res = 0;
  let i = y;

  for (; x[i] & 0x80; ++i) {
    res <<= 7;
    res |= x[i] ^ 0x80;
  }

  res <<= 7;
  res |= x[i];

  if (res < 0) res = ~res + 1;

  ++i;

  return { res, offset: i-y };
}

function uint32(n) {
  if (n < 0) n = -n;

  let res = [];
  for (let i = 0; i < 4; ++i) {
    res.unshift(n & 0xFF);
    n >>= 8;
  }

  return res;
}

function q_uint32(x, y=0) {
  let res = Number((BigInt(x[y  ]) << 24n) |
                   (BigInt(x[y+1]) << 16n) |
                   (BigInt(x[y+2]) <<  8n) |
                   (BigInt(x[y+3])));
  
  return res;
}

function encode_frame(type, opts) {
  if (type === module.exports.FRAME_CLOSE) {
    let code_buf = (opts.code!==undefined && opts.code!==null ? [0x01, opts.code] : []);
    let reason_buf = [];

    if (opts.reason !== undefined && opts.reason !== null) {
      let s_buf = Buffer.from(opts.reason);
      reason_buf = [0x02, ...varuint32(s_buf.byteLength), ...(Array.from(s_buf))];
    }

    return Buffer.from([type, ...code_buf, ...reason_buf, 0x00]);
  } else if (type === module.exports.FRAME_AUTH) {
    let secret_buf = [];

    if (opts.secret !== undefined && opts.secret !== null) {
      let s_buf = Buffer.from(opts.secret).slice(0, 64);
      secret_buf = [0x01, ...(Array.from(s_buf))];
    }

    let status_buf = (opts.status !== undefined && opts.status !== null ? [0x02, opts.status+0] : []);

    return Buffer.from([type, ...secret_buf, ...status_buf, 0x00]);
  } else if (type === module.exports.FRAME_INIT) {
    let format_buf = [];

    if (opts.format !== undefined && opts.format !== null) {
      format_buf = [0x01, ...(Array.from(Buffer.from(opts.format))), 0x00];
    }

    let id_buf = [];

    if (opts.id !== undefined && opts.id !== null) {
      id_buf = [0x02, ...uint32(opts.id)];
    }

    let ping_min_delta_buf = [];

    if (opts.ping_min_delta !== undefined && opts.ping_min_delta !== null) {
      ping_min_delta_buf = [0x03, ...varuint32(opts.ping_min_delta)];
    }

    let ping_recv_buf = [];

    if (opts.ping_recv !== undefined && opts.ping_recv !== null) {
      ping_recv_buf = [0x04, opts.ping_recv+0];
    }

    return Buffer.from([type, ...format_buf, ...id_buf, ...ping_min_delta_buf, ...ping_recv_buf, 0x00]);
  } else if (type === module.exports.FRAME_DATA) {
    let data_buf = [];

    if (opts.data !== undefined && opts.data !== null) {
      let s_buf = Buffer.from(opts.data);
      data_buf = [0x01, ...varuint32(s_buf.byteLength), ...(Array.from(s_buf))];
    }

    let idem_buf = [];

    if (opts.idem !== undefined && opts.idem !== null) {
      idem_buf = [0x02, ...uint32(opts.idem)];
    }

    return Buffer.from([type, ...data_buf, ...idem_buf, 0x00]);
  } else if (type === module.exports.FRAME_ACK) {
    let idem_buf = [];

    if (opts.idem !== undefined && opts.idem !== null) {
      idem_buf = [0x01, ...uint32(opts.idem)];
    }

    return Buffer.from([type, ...idem_buf, 0x00]);
  } else if (type === module.exports.FRAME_PING || type === module.exports.FRAME_PONG) {
    let ackid_buf = [];

    if (opts.ackid !== undefined && opts.ackid !== null) {
      ackid_buf = [0x01, ...uint32(opts.ackid)];
    }

    return Buffer.from([type, ...ackid_buf, 0x00]);
  }
}

module.exports.encode_frame = encode_frame;

function decode_frame(buf) {
  let collector = [];
  let x = 0;
  let bytes_used = 0;
  let escape = false;

  while (x < buf.byteLength) {
    let res = { type: buf[x] };
    
    if (buf[x] === module.exports.FRAME_CLOSE) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // close code
          res.code = buf[x];
          x += 1;
          break;
        case 0x02:
          // close reason
          let opts = q_varuint32(buf, x);
          x += opts.offset;
          let size = opts.res;

          res.reason = buf.slice(x, x += size).toString();
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else if (buf[x] === module.exports.FRAME_AUTH) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // auth secret
          res.secret = buf.slice(x, x += 64);
          break;
        case 0x02:
          // auth status
          res.status = buf[x++] !== 0x00;
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else if (buf[x] === module.exports.FRAME_INIT) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // init format
          let start = x+0;
          while (buf[++x] !== 0x00);
          res.format = buf.slice(start, x).toString();
          ++x;
          break;
        case 0x02:
          // init id
          res.id = q_uint32(buf, x);
          x += 4;
          break;
        case 0x03:
          // init ping_min_delta
          let opts = q_varuint32(buf, x);
          x += opts.offset;
          res.ping_min_delta = opts.res;
          break;
        case 0x04:
          // init ping_recv
          res.ping_recv = buf[x++] !== 0x00;
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else if (buf[x] === module.exports.FRAME_DATA) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // data
          let opts = q_varuint32(buf, x);
          x += opts.offset;
          res.data = buf.slice(x, x += opts.res);
          break;
        case 0x02:
          // idem
          res.idem = q_uint32(buf, x);
          x += 4;
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else if (buf[x] === module.exports.FRAME_ACK) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // idem
          res.idem = q_uint32(buf, x);
          x += 4;
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else if (buf[x] === module.exports.FRAME_PING || buf[x] === module.exports.FRAME_PONG) {
      ++x;
      while (buf[x] !== 0x00) {
        switch (buf[x++]) {
        case 0x01:
          // ackid
          res.ackid = q_uint32(buf, x);
          x += 4;
          break;
        }

        if (x > buf.byteLength) {
          escape = true;
          break;
        }
      }
      ++x;
    } else {
      break;
    }

    if (escape) break;

    collector.push(res);
    bytes_used = x;
  }

  return { collector, bytes_used };
}

module.exports.decode_frame = decode_frame;

