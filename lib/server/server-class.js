const EventEmitter = require("events");
const net = require("net");
const tls = require("tls");
const http = require("http");
const https = require("https");

const WebSocket = require("ws");

const network = require("../network.js");

class Server extends EventEmitter {
  #protocol;
  #secure;
  #host;
  #port;
  #secret;
  #supported_formats;
  #certificate;
  #private_key;

  #input_buffer;
  #server;

  constructor(opts) {
    super();

    opts = {
      protocol: network.TCP,
      server: null,
      path: "/",
      secure: false,  // Assuming communication is only on localhost. Otherwise, this is a TERRIBLE idea!
      host: "127.0.0.1",
      port: 6544,
      secret: null,
      supported_formats: [ "protobuf", "bson" ],
      certificate: null,
      private_key: null,
      ...opts
    };

    if (opts.secret === null) throw new Error("[logtkjs] Server secret option must be set");
    if (opts.secure && (opts.certificate === null || opts.private_key === null)) {
      throw new Error("[logtkjs] secure Server instances must have certificate and private key set");
    }

    this.#protocol = opts.protocol;
    this.#secure = opts.secure;
    this.#host = opts.host;
    this.#port = opts.port;
    this.#secret = opts.secret;
    this.#supported_formats = opts.supported_formats;
    this.#certificate = opts.certificate;
    this.#private_key = opts.private_key;
    
    this.#input_buffer = Buffer.from([]);
    
    if (this.#protocol === network.TCP) {
      if (this.#secure) {
        this.#server = tls.createServer({
          handshakeTimeout: 5000,
          cert: this.#certificate,
          key: this.#private_key
        });
      } else {
        this.#server = net.createServer();
      }
    } else if (this.#protocol === network.WS) {
      let tmp;
      
      if (opts.server !== null) {
        tmp = opts.server;
      } else {
        if (this.#secure) {
          tmp = https.createServer({
            handshakeTimeout: 5000,
            cert: this.#certificate,
            key: this.#private_key
          });
        } else {
          tmp = http.createServer();
        }
      }

      this.#server = new WebSocket.Server({ noServer: true });

      tmp.on("upgrade", (request, socket, head) => {
        if (opts.server !== null && request.url.startsWith(opts.path)) {
          this.#authenticate(Buffer.from(request.headers["X-LogTK-Auth"] || "", "base64"), err => {
            if (err) {
              socket.write(request.httpVersion + " 401 Unauthorized\r\n\r\n");
              socket.destroy();
              return;
            }

            this.#server.handleUpgrade(request, socket, head, ws => {
              this.#server.emit("connection", ws, request);
            });
          });
        }
      });
    }

    this.#server.on("connection", this.#onConnection.bind(this));
  }

  #onConnection(c, request) {
    c._authorized = this.#protocol === network.WS;
    c._initialized = false;

    c._format = "protobuf";
    c._id = null;
    c._ping_min_delta = null;
    c._ping_recv = false;

    c.on(this.#protocol === network.TCP ? "data" : "message",
         this.#protocol === network.TCP ? this.#onData.bind(this, c, c.write, c.destroy) : this.#onData.bind(this, c, c.send, c.close.bind(c, 1000)));
  }

  #authenticate(key, callback) {
    if (this.#secret.equals(key)) {
      return callback(false);
    }

    return callback(true);
  }

  #onData(c, send, close, buf) {
    this.#input_buffer = Buffer.concat([this.#input_buffer, buf]);
    let decoded = network.decode_frame(this.#input_buffer);
    this.#input_buffer = this.#input_buffer.slice(decoded.bytes_used);

    for (let request of decoded.collector) {
      if (request.type === network.FRAME_CLOSE) {
        if (!(request.code & 0x80)) {
          send(network.encode_frame(network.FRAME_CLOSE, {}), ()=>{close()});
        } else {
          close();
        }
      } else if (request.type === network.FRAME_AUTH) {
        if (c._authorized) {
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: "already authorized"
          }), ()=>{close()});

          return;
        }

        this.#authenticate(request.key, err=>{
          if (err) {
            // Auth denied
            send(network.encode_frame(network.FRAME_AUTH, {
              status: false
            }), ()=>{close()});
          } else {
            // Auth successful
            c._authorized = true;
            send(network.encode_frame(network.FRAME_AUTH, {
              status: true
            }));
          }
        });
      } else if (request.type === network.FRAME_INIT) {
        if (!c._authorized || c._initialized) {          
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: (!c._authorized ? "not authorized" : "already initialized")
          }), ()=>{close()});

          return;
        }

        if (request.id === undefined || (request.ping_recv && request.ping_min_delta === undefined)) {
          // Malformed request
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: "malformed frame received"
          }), ()=>{close()});

          return;
        }
        
        if (this.#supported_formats.indexOf(request.format) === -1) {
          // Unrecognized format
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: "unrecognized format"
          }), ()=>{close()});

          return;
        }

        if (request.format !== undefined) c._format = request.format;
        c._id = request.id;
        c._ping_min_delta = request.ping_min_delta || 0;
        c._ping_recv = request.ping_recv || false;

        // Finish initialization
        send(network.encode_frame(network.FRAME_INIT, {
          format: c._format,
          ping_min_delta: 1000,
          ping_recv: false
        }));
      } else if (request.type === network.FRAME_DATA) {
        if (!c._authorized || !c._initialized) {
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: "not " + (!c._authorized ? "authorized" : "initialized")
          }), ()=>{close()});

          return;
        }

        if (request.data === undefined || request.idem === undefined) {
          // Malformed request
          send(network.encode_frame(network.FRAME_CLOSE, {
            code: 0xfe,
            reason: "malformed frame received"
          }), ()=>{close()});

          return;
        }
        
        // Respond with idempotency token
        send(network.encode_frame(network.FRAME_ACK, {
          idem: request.idem
        }));

        this.emit("log", c._format, request.data);
      }
    }
  }

  listen() {
    this.#server.listen(this.#port, this.#host);
  }
}

module.exports = Server;

