/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.test = (function() {
    
        /**
         * Namespace test.
         * @exports test
         * @namespace
         */
        var test = {};
    
        test.Message = (function() {
    
            /**
             * Properties of a Message.
             * @memberof test
             * @interface IMessage
             * @property {logtk.ILogMessage} base Message base
             * @property {string} _message Message _message
             * @property {number} pid Message pid
             */
    
            /**
             * Constructs a new Message.
             * @memberof test
             * @classdesc Represents a Message.
             * @implements IMessage
             * @constructor
             * @param {test.IMessage=} [properties] Properties to set
             */
            function Message(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Message base.
             * @member {logtk.ILogMessage} base
             * @memberof test.Message
             * @instance
             */
            Message.prototype.base = null;
    
            /**
             * Message _message.
             * @member {string} _message
             * @memberof test.Message
             * @instance
             */
            Message.prototype._message = "";
    
            /**
             * Message pid.
             * @member {number} pid
             * @memberof test.Message
             * @instance
             */
            Message.prototype.pid = 0;
    
            /**
             * Creates a new Message instance using the specified properties.
             * @function create
             * @memberof test.Message
             * @static
             * @param {test.IMessage=} [properties] Properties to set
             * @returns {test.Message} Message instance
             */
            Message.create = function create(properties) {
                return new Message(properties);
            };
    
            /**
             * Encodes the specified Message message. Does not implicitly {@link test.Message.verify|verify} messages.
             * @function encode
             * @memberof test.Message
             * @static
             * @param {test.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                $root.logtk.LogMessage.encode(message.base, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                writer.uint32(/* id 2, wireType 2 =*/18).string(message._message);
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.pid);
                return writer;
            };
    
            /**
             * Encodes the specified Message message, length delimited. Does not implicitly {@link test.Message.verify|verify} messages.
             * @function encodeDelimited
             * @memberof test.Message
             * @static
             * @param {test.IMessage} message Message message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Message.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Message message from the specified reader or buffer.
             * @function decode
             * @memberof test.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {test.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.test.Message();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.base = $root.logtk.LogMessage.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message._message = reader.string();
                        break;
                    case 3:
                        message.pid = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("base"))
                    throw $util.ProtocolError("missing required 'base'", { instance: message });
                if (!message.hasOwnProperty("_message"))
                    throw $util.ProtocolError("missing required '_message'", { instance: message });
                if (!message.hasOwnProperty("pid"))
                    throw $util.ProtocolError("missing required 'pid'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Message message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof test.Message
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {test.Message} Message
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Message.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Message message.
             * @function verify
             * @memberof test.Message
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Message.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                {
                    var error = $root.logtk.LogMessage.verify(message.base);
                    if (error)
                        return "base." + error;
                }
                if (!$util.isString(message._message))
                    return "_message: string expected";
                if (!$util.isInteger(message.pid))
                    return "pid: integer expected";
                return null;
            };
    
            /**
             * Creates a Message message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof test.Message
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {test.Message} Message
             */
            Message.fromObject = function fromObject(object) {
                if (object instanceof $root.test.Message)
                    return object;
                var message = new $root.test.Message();
                if (object.base != null) {
                    if (typeof object.base !== "object")
                        throw TypeError(".test.Message.base: object expected");
                    message.base = $root.logtk.LogMessage.fromObject(object.base);
                }
                if (object._message != null)
                    message._message = String(object._message);
                if (object.pid != null)
                    message.pid = object.pid >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Message message. Also converts values to other types if specified.
             * @function toObject
             * @memberof test.Message
             * @static
             * @param {test.Message} message Message
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Message.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.base = null;
                    object._message = "";
                    object.pid = 0;
                }
                if (message.base != null && message.hasOwnProperty("base"))
                    object.base = $root.logtk.LogMessage.toObject(message.base, options);
                if (message._message != null && message.hasOwnProperty("_message"))
                    object._message = message._message;
                if (message.pid != null && message.hasOwnProperty("pid"))
                    object.pid = message.pid;
                return object;
            };
    
            /**
             * Converts this Message to JSON.
             * @function toJSON
             * @memberof test.Message
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Message.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Message;
        })();
    
        return test;
    })();
    
    $root.logtk = (function() {
    
        /**
         * Namespace logtk.
         * @exports logtk
         * @namespace
         */
        var logtk = {};
    
        logtk.Trace = (function() {
    
            /**
             * Properties of a Trace.
             * @memberof logtk
             * @interface ITrace
             * @property {string} file Trace file
             * @property {number} line Trace line
             * @property {number} col Trace col
             */
    
            /**
             * Constructs a new Trace.
             * @memberof logtk
             * @classdesc Represents a Trace.
             * @implements ITrace
             * @constructor
             * @param {logtk.ITrace=} [properties] Properties to set
             */
            function Trace(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Trace file.
             * @member {string} file
             * @memberof logtk.Trace
             * @instance
             */
            Trace.prototype.file = "";
    
            /**
             * Trace line.
             * @member {number} line
             * @memberof logtk.Trace
             * @instance
             */
            Trace.prototype.line = 0;
    
            /**
             * Trace col.
             * @member {number} col
             * @memberof logtk.Trace
             * @instance
             */
            Trace.prototype.col = 0;
    
            /**
             * Creates a new Trace instance using the specified properties.
             * @function create
             * @memberof logtk.Trace
             * @static
             * @param {logtk.ITrace=} [properties] Properties to set
             * @returns {logtk.Trace} Trace instance
             */
            Trace.create = function create(properties) {
                return new Trace(properties);
            };
    
            /**
             * Encodes the specified Trace message. Does not implicitly {@link logtk.Trace.verify|verify} messages.
             * @function encode
             * @memberof logtk.Trace
             * @static
             * @param {logtk.ITrace} message Trace message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Trace.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.file);
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.line);
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.col);
                return writer;
            };
    
            /**
             * Encodes the specified Trace message, length delimited. Does not implicitly {@link logtk.Trace.verify|verify} messages.
             * @function encodeDelimited
             * @memberof logtk.Trace
             * @static
             * @param {logtk.ITrace} message Trace message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Trace.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Trace message from the specified reader or buffer.
             * @function decode
             * @memberof logtk.Trace
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {logtk.Trace} Trace
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Trace.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk.Trace();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.file = reader.string();
                        break;
                    case 2:
                        message.line = reader.uint32();
                        break;
                    case 3:
                        message.col = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("file"))
                    throw $util.ProtocolError("missing required 'file'", { instance: message });
                if (!message.hasOwnProperty("line"))
                    throw $util.ProtocolError("missing required 'line'", { instance: message });
                if (!message.hasOwnProperty("col"))
                    throw $util.ProtocolError("missing required 'col'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a Trace message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof logtk.Trace
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {logtk.Trace} Trace
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Trace.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Trace message.
             * @function verify
             * @memberof logtk.Trace
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Trace.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.file))
                    return "file: string expected";
                if (!$util.isInteger(message.line))
                    return "line: integer expected";
                if (!$util.isInteger(message.col))
                    return "col: integer expected";
                return null;
            };
    
            /**
             * Creates a Trace message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof logtk.Trace
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {logtk.Trace} Trace
             */
            Trace.fromObject = function fromObject(object) {
                if (object instanceof $root.logtk.Trace)
                    return object;
                var message = new $root.logtk.Trace();
                if (object.file != null)
                    message.file = String(object.file);
                if (object.line != null)
                    message.line = object.line >>> 0;
                if (object.col != null)
                    message.col = object.col >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Trace message. Also converts values to other types if specified.
             * @function toObject
             * @memberof logtk.Trace
             * @static
             * @param {logtk.Trace} message Trace
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Trace.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.file = "";
                    object.line = 0;
                    object.col = 0;
                }
                if (message.file != null && message.hasOwnProperty("file"))
                    object.file = message.file;
                if (message.line != null && message.hasOwnProperty("line"))
                    object.line = message.line;
                if (message.col != null && message.hasOwnProperty("col"))
                    object.col = message.col;
                return object;
            };
    
            /**
             * Converts this Trace to JSON.
             * @function toJSON
             * @memberof logtk.Trace
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Trace.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Trace;
        })();
    
        logtk.LogMessage = (function() {
    
            /**
             * Properties of a LogMessage.
             * @memberof logtk
             * @interface ILogMessage
             * @property {number|Long} _time LogMessage _time
             * @property {logtk.ITrace} _trace LogMessage _trace
             * @property {number} _level LogMessage _level
             */
    
            /**
             * Constructs a new LogMessage.
             * @memberof logtk
             * @classdesc Represents a LogMessage.
             * @implements ILogMessage
             * @constructor
             * @param {logtk.ILogMessage=} [properties] Properties to set
             */
            function LogMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LogMessage _time.
             * @member {number|Long} _time
             * @memberof logtk.LogMessage
             * @instance
             */
            LogMessage.prototype._time = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * LogMessage _trace.
             * @member {logtk.ITrace} _trace
             * @memberof logtk.LogMessage
             * @instance
             */
            LogMessage.prototype._trace = null;
    
            /**
             * LogMessage _level.
             * @member {number} _level
             * @memberof logtk.LogMessage
             * @instance
             */
            LogMessage.prototype._level = 0;
    
            /**
             * Creates a new LogMessage instance using the specified properties.
             * @function create
             * @memberof logtk.LogMessage
             * @static
             * @param {logtk.ILogMessage=} [properties] Properties to set
             * @returns {logtk.LogMessage} LogMessage instance
             */
            LogMessage.create = function create(properties) {
                return new LogMessage(properties);
            };
    
            /**
             * Encodes the specified LogMessage message. Does not implicitly {@link logtk.LogMessage.verify|verify} messages.
             * @function encode
             * @memberof logtk.LogMessage
             * @static
             * @param {logtk.ILogMessage} message LogMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message._time);
                $root.logtk.Trace.encode(message._trace, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message._level);
                return writer;
            };
    
            /**
             * Encodes the specified LogMessage message, length delimited. Does not implicitly {@link logtk.LogMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof logtk.LogMessage
             * @static
             * @param {logtk.ILogMessage} message LogMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LogMessage message from the specified reader or buffer.
             * @function decode
             * @memberof logtk.LogMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {logtk.LogMessage} LogMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LogMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk.LogMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message._time = reader.uint64();
                        break;
                    case 2:
                        message._trace = $root.logtk.Trace.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message._level = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("_time"))
                    throw $util.ProtocolError("missing required '_time'", { instance: message });
                if (!message.hasOwnProperty("_trace"))
                    throw $util.ProtocolError("missing required '_trace'", { instance: message });
                if (!message.hasOwnProperty("_level"))
                    throw $util.ProtocolError("missing required '_level'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LogMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof logtk.LogMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {logtk.LogMessage} LogMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LogMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a LogMessage message.
             * @function verify
             * @memberof logtk.LogMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LogMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message._time) && !(message._time && $util.isInteger(message._time.low) && $util.isInteger(message._time.high)))
                    return "_time: integer|Long expected";
                {
                    var error = $root.logtk.Trace.verify(message._trace);
                    if (error)
                        return "_trace." + error;
                }
                if (!$util.isInteger(message._level))
                    return "_level: integer expected";
                return null;
            };
    
            /**
             * Creates a LogMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof logtk.LogMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {logtk.LogMessage} LogMessage
             */
            LogMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.logtk.LogMessage)
                    return object;
                var message = new $root.logtk.LogMessage();
                if (object._time != null)
                    if ($util.Long)
                        (message._time = $util.Long.fromValue(object._time)).unsigned = true;
                    else if (typeof object._time === "string")
                        message._time = parseInt(object._time, 10);
                    else if (typeof object._time === "number")
                        message._time = object._time;
                    else if (typeof object._time === "object")
                        message._time = new $util.LongBits(object._time.low >>> 0, object._time.high >>> 0).toNumber(true);
                if (object._trace != null) {
                    if (typeof object._trace !== "object")
                        throw TypeError(".logtk.LogMessage._trace: object expected");
                    message._trace = $root.logtk.Trace.fromObject(object._trace);
                }
                if (object._level != null)
                    message._level = object._level >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a LogMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof logtk.LogMessage
             * @static
             * @param {logtk.LogMessage} message LogMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LogMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object._time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object._time = options.longs === String ? "0" : 0;
                    object._trace = null;
                    object._level = 0;
                }
                if (message._time != null && message.hasOwnProperty("_time"))
                    if (typeof message._time === "number")
                        object._time = options.longs === String ? String(message._time) : message._time;
                    else
                        object._time = options.longs === String ? $util.Long.prototype.toString.call(message._time) : options.longs === Number ? new $util.LongBits(message._time.low >>> 0, message._time.high >>> 0).toNumber(true) : message._time;
                if (message._trace != null && message.hasOwnProperty("_trace"))
                    object._trace = $root.logtk.Trace.toObject(message._trace, options);
                if (message._level != null && message.hasOwnProperty("_level"))
                    object._level = message._level;
                return object;
            };
    
            /**
             * Converts this LogMessage to JSON.
             * @function toJSON
             * @memberof logtk.LogMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LogMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LogMessage;
        })();
    
        return logtk;
    })();

    return $root;
});
