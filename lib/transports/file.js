const fs = require("fs");

const Transport = require("../transport.js");
const levels = require("../levels.js");
const colors = require("../colors.js");

class File extends Transport {
  constructor(opts) {
    super(opts);

    opts = {
      send_colors: false,  // Usually not a good idea to enable
      filename: null,
      mode: File.PERMISSION_RESTRICT,
      binlog: false,  // Output padding data that allows the resulting file to
                      // be traversed like a list of protobufs (for example).
      ...opts
    };

    if (opts.filename === null || opts.filename === undefined) {
      throw new Error("[logtkjs] must specify `filename` option for File transport");
    }

    if (opts.filename.constructor !== String) {
      throw new Error("[logtkjs] `filename` option for File transport must be a string");
    }
    
    let dir = opts.filename.substring(0, opts.filename.lastIndexOf("/"));
    if (dir.length) {
      let dirstat = fs.statSync(dir, {throwIfNoEntry: false})

      if (dirstat === undefined) {
        // TODO: Implement file modes
        fs.mkdirSync(dir, { recursive: true });
      }
    }

    this._send_colors = opts.send_colors;
    this._file_mode = opts.mode;
    this._filename = opts.filename;
    this._binlog = opts.binlog;
  }

  ready() {
    if (this._binlog) {
      let buf = Buffer.allocUnsafe(4);
      buf.writeUint32LE(this._format.MAGIC, 0);
      try {
        let stat = fs.statSync(this._filename);
        if(stat.size < 4) {
          fs.writeFileSync(this._filename, buf, {
            mode: this._file_mode
          });
        }
      } catch(e) {
        fs.writeFileSync(this._filename, buf, {
          mode: this._file_mode
        });
      }
    }
    
    this._stream = fs.createWriteStream(this._filename, {
      mode: this._file_mode,
      flags: "a"
    });
  }

  async data(x) {
    if (x.$level.level <= this._level) {
      let use_theme;
      if (this._send_colors) {
        // User has opted to use this._theme to color the output for some
        // reason.
        use_theme = this._theme;
      } else {
        // User does not want color codes getting sent to the file. This means
        // overriding this._theme to use logtk.colors.none.
        use_theme = colors.none;
      }

      let data = await this._format(x, use_theme);

      if (data.constructor !== Buffer) data = Buffer.from(data);
      
      let res = data;
      if (this._binlog) {
        res = Buffer.concat([Buffer.allocUnsafe(4), data]);
        res.writeUint32LE(data.byteLength, 0);
      }
      
      this._stream.cork();
      this._stream.write(res);
      process.nextTick(this._stream.uncork);
    }
  }

  exit(n) {
    this._stream.close();
  }
}

File.PERMISSION_RESTRICT = 0o600;    // rw-------
File.PERMISSION_SAFE = 0o640;        // rw-r-----
File.PERMISSION_PERMISSIVE = 0o644;  // rw-r--r--
File.PERMISSION_GLOBAL = 0o666;      // rw-rw-rw-

module.exports = File;

