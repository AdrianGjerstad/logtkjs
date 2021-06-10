const Transport = require("../transport.js");

const net = require("net");
const tls = require("tls");
const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");

const network = require("../network.js");
const colors = require("../colors.js");

// Formal definition of a logtk network client (worker) in JavaScript
class Network extends Transport {
  constructor(opts) {
    super(opts);

    opts = {
      protocol: network.TCP,
      secure: true,
      host: "127.0.0.1",
      port: 6544,
      path: "",
      format_id: "protobuf",
      secret: null,
      id: 0xffffffff,
      disk_cache: "/tmp",
      ...opts
    };

    if (opts.secret === null) {
      throw new Error("[logtkjs] Network transport `secret` option must be set");
    }

    this._protocol = opts.protocol;
    this._secure = opts.secure;
    this._host = opts.host;
    this._port = opts.port;
    this._path = opts.path;
    this._format_id = opts.format_id;
    this._secret = opts.secret;
    this._id = opts.id;
    this._disk_cache = opts.disk_cache;

    this._data_cache = {};
    this._next_idem = Math.floor(Math.random()*0x100000000);
    
    this._authorized = false;
    this._initialized = false;
    this._recv_close_ack = false;

    this._input_buffer = Buffer.from([]);
  }

  ready() {
    process.on("exit", () => {
      if (this._initialized) {
        this.#close(0xff, "going away");
      }
    });

    this.#loadCacheFromDisk();
    this.#attemptConnect();
  }

  #writeCacheToDisk() {
    let res = [];

    for (let idem in this._data_cache) {
      let part = Buffer.allocUnsafe(8);
      part.writeUint32LE(idem, 0);
      part.writeUint32LE(this._data_cache[idem].data.byteLength, 4);
      part = Buffer.concat([part, this._data_cache[idem].data]);

      res.push(part);
    }

    fs.writeFileSync(path.join(this._disk_cache, "logger-" + this._id.toString(16).padStart(8, '0') + ".log.dat"), Buffer.concat(res));
  }

  #loadCacheFromDisk() {
    try {
      fs.statSync(path.join(this._disk_cache, "logger-" + this._id.toString(16).padStart(8, '0') + ".log.dat"));
    } catch(e) { return; }
    
    let buf = fs.readFileSync(path.join(this._disk_cache, "logger-" + this._id.toString(16).padStart(8, '0') + ".log.dat"));
    for (let i = 0; i < buf.byteLength;) {
      let idem = buf.readUint32LE(i);
      let size = buf.readUint32LE(i += 4);
      i += 4;
      let data = buf.slice(i, i += size);

      this._data_cache[idem] = { data, timeout: null };
    }
  }

  #close(code, reason) {
    let close_buf = network.encode_frame(network.FRAME_CLOSE, {
      code, reason
    });

    if (this._protocol === network.TCP) {
      this._socket.write(close_buf);

      if (!(code & 0x80)) {
        this._recv_close_ack = true;
      } else {
        this._socket.destroy();
      }
    } else if (this._protocol === network.WS) {
      this._socket.send(close_buf);
      
      if (!(code & 0x80)) {
        this._recv_close_ack = true;
      } else {
        this._socket.terminate();
      }
    }
  }
  
  #attemptConnect() {
    if (this._protocol === network.TCP) {
      this._authorized = false;
      this._initialized = false;
      
      let config = {
        host: this._host,
        port: this._port
      };
      
      if (this._secure) {
        this._socket = tls.connect(config);
      } else {
        this._socket = net.connect(config);
      }

      this._socket.on("connect", () => {
        let auth_buf = network.encode_frame(network.FRAME_AUTH, {
          secret: this._secret
        });

        this._socket.write(auth_buf);
      });

      this._socket.on("data", (buf) => {
        this._input_buffer = Buffer.concat([this._input_buffer, buf]);
        let decoded = network.decode_frame(this._input_buffer);
        if (this._input_buffer.byteLength > decoded.used_bytes) this._input_buffer = this._input_buffer.slice(decoded.used_bytes);
        else this._input_buffer = Buffer.from([]);
        
        for (let response of decoded.collector) {
          if (!this._authorized) {
            if (response.status) {
              this._authorized = true;
              let init_buf = network.encode_frame(network.FRAME_INIT, {
                format: this._format_id,
                id: this._id,
                ping_min_delta: 5000,
                ping_recv: true
              });

              this._socket.write(init_buf);
            } else {
              throw new Error("[logtkjs] Network authentication failed");
            }
          } else if (!this._initialized) {
            if (response.format === this._format_id) {
              this._initialized = true;

              for (let idem in this._data_cache) {
                let data_frame = network.encode_frame(network.FRAME_DATA, {
                  data: this._data_cache[idem].data,
                  idem
                });

                this._data_cache[idem].timeout = setInterval(() => {
                  this._socket.write(data_frame);
                }, 1000);

                this._socket.write(data_frame);
              }
            } else {
              throw new Error("[logtkjs] Network handshake failed");
            }
          } else if (response.type === network.FRAME_ACK) {
            if (this._data_cache[response.idem] !== undefined) {
              clearInterval(this._data_cache[response.idem].timeout);

              delete this._data_cache[response.idem];
            }
          } else if (response.type === network.FRAME_CLOSE) {
            if (!(response.code & 0x80)) {
              // requires close-ack frame
              let close_ack = Buffer.from([0x00, 0x00]);
              
              this._socket.write(close_ack);
              this._socket.end();
            }
            
            this._authorized = false;
            this._initialized = false;

            for (let idem in this._data_cache) {
              clearInterval(this._data_cache[idem].timeout);
            }

            this.#attemptConnect();
          }
        }
      });
    } else if (this._protocol === network.WS) {
      this._socket = new WebSocket("ws" + (this._secure ? "s" : "") + "://" + this._host + ":" + this._port + this._path, "logtk", {
        followRedirects: true,
        headers: {
          "X-LogTK-Auth": this._secret.toString("base64")
        }
      });

      this._authorized = false;
      this._initialized = false;

      this._socket.on("open", () => {
        this._authorized = true;
        this._socket.send(network.encode_frame(network.FRAME_INIT, {
          format: this._format_id,
          id: this._id,
          ping_recv: false
        }));
      });
      
      this._socket.on("message", (x) => {
        let buf = Buffer.from(x);
        this._input_buffer = Buffer.concat([this._input_buffer, buf]);
        let decoded = network.decode_frame(this._input_buffer);
        this._input_buffer = this._input_buffer.slice(decoded.used_bytes);

        for (let response of decoded.collector) {
          if (!this._initialized) {
            if (response.format === this._format_id) {
              this._initialized = true;
              
              for (let idem in this._data_cache) {
                let data_frame = network.encode_frame(network.FRAME_DATA, {
                  data: this._data_cache[idem].data,
                  idem
                });

                this._data_cache[idem].timeout = setInterval(() => {
                  this._socket.send(data_frame);
                }, 1000);

                this._socket.send(data_frame);
              }
            } else {
              throw new Error("[logtkjs] Network handshake failed");
            }
          } else if (response.type === network.FRAME_ACK) {
            if (this._data_cache[response.idem]) {
              clearInterval(this._data_cache[response.idem].timeout);

              delete this._data_cache[response.idem];
            }
          } else if (response.type === network.FRAME_CLOSE) {
            if (!(response.code & 0x80)) {
              // requires close-ack frame
              let close_ack = Buffer.from([0x00, 0x00]);
              
              this._socket.send(close_ack);
              this._socket.close(1000);
            }
            
            this._authorized = false;
            this._initialized = false;

            for (let idem in this._data_cache) {
              clearInterval(this._data_cache[idem].timeout);
            }

            this.#attemptConnect();
          }
        }
      });
    }
  }

  async data(x) {
    let data = await this._format(x, colors.none);
    this._data_cache[this._next_idem] = { data, timeout: null };

    if (this._initialized) {
      let idem = Number(this._next_idem);
      this._data_cache[this._next_idem].timeout = setInterval(() => {
        
        let data_frame = network.encode_frame(network.FRAME_DATA, {
          data,
          idem
        });

        if (this._protocol === network.TCP) {
          this._socket.write(data_frame);
        } else if (this._protocol === network.WS) {
          this._socket.send(data_frame);
        }
      }, 1000);

      let data_frame = network.encode_frame(network.FRAME_DATA, {
        data,
        idem
      });

      if (this._protocol === network.TCP) {
        this._socket.write(data_frame);
      } else if (this._protocol === network.WS) {
        this._socket.send(data_frame);
      }
    }
    
    this._next_idem += 1;
    this._next_idem = Number(BigInt(this._next_idem) & 0xFFFFFFFFn);
  }

  exit(n) {
    this.#writeCacheToDisk();  // Any data that might be in the cache would be forfeit without this.
    this.#close(0xff, "going away");
  }
}

module.exports = Network;

