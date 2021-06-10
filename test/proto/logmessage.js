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
    
    $root.logtk_test = (function() {
    
        /**
         * Namespace logtk_test.
         * @exports logtk_test
         * @namespace
         */
        var logtk_test = {};
    
        logtk_test.LogMessage = (function() {
    
            /**
             * Properties of a LogMessage.
             * @memberof logtk_test
             * @interface ILogMessage
             * @property {number} id LogMessage id
             */
    
            /**
             * Constructs a new LogMessage.
             * @memberof logtk_test
             * @classdesc Represents a LogMessage.
             * @implements ILogMessage
             * @constructor
             * @param {logtk_test.ILogMessage=} [properties] Properties to set
             */
            function LogMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * LogMessage id.
             * @member {number} id
             * @memberof logtk_test.LogMessage
             * @instance
             */
            LogMessage.prototype.id = 0;
    
            /**
             * Creates a new LogMessage instance using the specified properties.
             * @function create
             * @memberof logtk_test.LogMessage
             * @static
             * @param {logtk_test.ILogMessage=} [properties] Properties to set
             * @returns {logtk_test.LogMessage} LogMessage instance
             */
            LogMessage.create = function create(properties) {
                return new LogMessage(properties);
            };
    
            /**
             * Encodes the specified LogMessage message. Does not implicitly {@link logtk_test.LogMessage.verify|verify} messages.
             * @function encode
             * @memberof logtk_test.LogMessage
             * @static
             * @param {logtk_test.ILogMessage} message LogMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
                return writer;
            };
    
            /**
             * Encodes the specified LogMessage message, length delimited. Does not implicitly {@link logtk_test.LogMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof logtk_test.LogMessage
             * @static
             * @param {logtk_test.ILogMessage} message LogMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LogMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a LogMessage message from the specified reader or buffer.
             * @function decode
             * @memberof logtk_test.LogMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {logtk_test.LogMessage} LogMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LogMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk_test.LogMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                return message;
            };
    
            /**
             * Decodes a LogMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof logtk_test.LogMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {logtk_test.LogMessage} LogMessage
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
             * @memberof logtk_test.LogMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LogMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
                return null;
            };
    
            /**
             * Creates a LogMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof logtk_test.LogMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {logtk_test.LogMessage} LogMessage
             */
            LogMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.logtk_test.LogMessage)
                    return object;
                var message = new $root.logtk_test.LogMessage();
                if (object.id != null)
                    message.id = object.id >>> 0;
                return message;
            };
    
            /**
             * Creates a plain object from a LogMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof logtk_test.LogMessage
             * @static
             * @param {logtk_test.LogMessage} message LogMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LogMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.id = 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };
    
            /**
             * Converts this LogMessage to JSON.
             * @function toJSON
             * @memberof logtk_test.LogMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LogMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return LogMessage;
        })();
    
        return logtk_test;
    })();

    return $root;
});
