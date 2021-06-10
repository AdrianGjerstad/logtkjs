const ProtobufBuilder = require("../../lib/protobuf-builder.js");

const path = require("path");
const net = require("net");

const pblib = require(path.resolve(__dirname, global.protobuf_location || ".") + "/http.js")

class HttpRequestProtobufBuilder extends ProtobufBuilder {
  constructor() {
    super();
  }

  #buildFromv4(s) {
    let res = 0n;

    let p = s.split(".").map(x=>parseInt(x));

    for (let i = 0; i < 4; ++i) {
      res <<= 8n;
      res |= BigInt(p[i]);
    }

    return pblib.logtk.net.internal.IpAddress.create({
      v4: Number(res)
    });
  }

  #buildFromv6(s) {
    return pblib.logtk.net.internal.IpAddress.create({
      v6: Buffer.from(this.#expandv6(s))
    });
  }

	#expandv6(ip_string) {
    // replace ipv4 address if any
    var ipv4 = ip_string.match(/(.*:)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$)/);
    if (ipv4) {
      var ip_string = ipv4[1];
      ipv4 = ipv4[2].match(/[0-9]+/g);
      for (var i = 0;i < 4;i ++) {
        var byte = parseInt(ipv4[i],10);
        ipv4[i] = ("0" + byte.toString(16)).substr(-2);
      }
      ip_string += ipv4[0] + ipv4[1] + ':' + ipv4[2] + ipv4[3];
    }

    // take care of leading and trailing ::
    ip_string = ip_string.replace(/^:|:$/g, '');

    var ipv6 = ip_string.split(':');

    for (var i = 0; i < ipv6.length; i ++) {
      var hex = ipv6[i];
      if (hex != "") {
        // normalize leading zeros
        ipv6[i] = ("0000" + hex).substr(-4);
      } else {
        // normalize grouped zeros ::
        hex = [];
        for (var j = ipv6.length; j <= 8; j ++) {
          hex.push('0000');
        }
        ipv6[i] = hex.join(':');
      }
    }

    let sres = ipv6.join("");
    let res = [];
    for (let i = 0; i < sres.length; i += 2) {
      res.push(parseInt(sres[i] + sres[i+1], 16));
    }

    return res;
  }

  async build(x) {
    let remote_ip, server_ip;

    if (net.isIPv4(x.client_ip)) {
      remote_ip = this.#buildFromv4(x.client_ip);
    } else if (net.isIPv6(x.client_ip)) {
      remote_ip = this.#buildFromv6(x.client_ip);
    }
    
    if (net.isIPv4(x.server_ip)) {
      server_ip = this.#buildFromv4(x.server_ip);
    } else if (net.isIPv6(x.server_ip)) {
      server_ip = this.#buildFromv6(x.server_ip);
    }

    return pblib.logtk.http.HttpRequest.encode(pblib.logtk.http.HttpRequest.create({
      base: pblib.logtk.LogMessage.create({
        _time: x.$time.getTime(),
        _trace: pblib.logtk.Trace.create({
          file: x.$trace.file,
          line: x.$trace.line,
          col: x.$trace.col
        }),
        _message: x.$message || ""
      }),
      method: pblib.logtk.http.internal.RequestMethod[x.method || "DEFAULT"],
      url: x.url,
      version: pblib.logtk.http.internal.HttpVersion.create({
        protocol: x.version.split("/")[0],
        major: parseInt(x.version.split("/")[1].split(".")[0]),
        minor: parseInt(x.version.split("/")[1].split(".")[1])
      }),
      bodySize: x.body_size,
      txOut: x.tx_out,
      txIn: x.request_size,
      remoteIp: remote_ip, serverIp: server_ip,
      userId: x.user || 0,
      status: x.status || 0,
      userAgent: x.agent || "-",
      referrer: x.referrer || "-",
      latency: x.delay || 0
    })).finish();
  }
}

module.exports = HttpRequestProtobufBuilder;

