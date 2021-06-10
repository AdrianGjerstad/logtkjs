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
    
    $root.logtk = (function() {
    
        /**
         * Namespace logtk.
         * @exports logtk
         * @namespace
         */
        var logtk = {};
    
        logtk.http = (function() {
    
            /**
             * Namespace http.
             * @memberof logtk
             * @namespace
             */
            var http = {};
    
            http.HttpRequest = (function() {
    
                /**
                 * Properties of a HttpRequest.
                 * @memberof logtk.http
                 * @interface IHttpRequest
                 * @property {logtk.ILogMessage} base HttpRequest base
                 * @property {logtk.http.internal.RequestMethod} method HttpRequest method
                 * @property {string} url HttpRequest url
                 * @property {logtk.http.internal.IHttpVersion} version HttpRequest version
                 * @property {number} bodySize HttpRequest bodySize
                 * @property {number} txOut HttpRequest txOut
                 * @property {number} txIn HttpRequest txIn
                 * @property {logtk.net.internal.IIpAddress} remoteIp HttpRequest remoteIp
                 * @property {logtk.net.internal.IIpAddress} serverIp HttpRequest serverIp
                 * @property {number} userId HttpRequest userId
                 * @property {number} status HttpRequest status
                 * @property {string} userAgent HttpRequest userAgent
                 * @property {string} referrer HttpRequest referrer
                 * @property {number} latency HttpRequest latency
                 */
    
                /**
                 * Constructs a new HttpRequest.
                 * @memberof logtk.http
                 * @classdesc Represents a HttpRequest.
                 * @implements IHttpRequest
                 * @constructor
                 * @param {logtk.http.IHttpRequest=} [properties] Properties to set
                 */
                function HttpRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }
    
                /**
                 * HttpRequest base.
                 * @member {logtk.ILogMessage} base
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.base = null;
    
                /**
                 * HttpRequest method.
                 * @member {logtk.http.internal.RequestMethod} method
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.method = 0;
    
                /**
                 * HttpRequest url.
                 * @member {string} url
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.url = "";
    
                /**
                 * HttpRequest version.
                 * @member {logtk.http.internal.IHttpVersion} version
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.version = null;
    
                /**
                 * HttpRequest bodySize.
                 * @member {number} bodySize
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.bodySize = 0;
    
                /**
                 * HttpRequest txOut.
                 * @member {number} txOut
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.txOut = 0;
    
                /**
                 * HttpRequest txIn.
                 * @member {number} txIn
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.txIn = 0;
    
                /**
                 * HttpRequest remoteIp.
                 * @member {logtk.net.internal.IIpAddress} remoteIp
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.remoteIp = null;
    
                /**
                 * HttpRequest serverIp.
                 * @member {logtk.net.internal.IIpAddress} serverIp
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.serverIp = null;
    
                /**
                 * HttpRequest userId.
                 * @member {number} userId
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.userId = 0;
    
                /**
                 * HttpRequest status.
                 * @member {number} status
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.status = 0;
    
                /**
                 * HttpRequest userAgent.
                 * @member {string} userAgent
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.userAgent = "";
    
                /**
                 * HttpRequest referrer.
                 * @member {string} referrer
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.referrer = "";
    
                /**
                 * HttpRequest latency.
                 * @member {number} latency
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 */
                HttpRequest.prototype.latency = 0;
    
                /**
                 * Creates a new HttpRequest instance using the specified properties.
                 * @function create
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {logtk.http.IHttpRequest=} [properties] Properties to set
                 * @returns {logtk.http.HttpRequest} HttpRequest instance
                 */
                HttpRequest.create = function create(properties) {
                    return new HttpRequest(properties);
                };
    
                /**
                 * Encodes the specified HttpRequest message. Does not implicitly {@link logtk.http.HttpRequest.verify|verify} messages.
                 * @function encode
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {logtk.http.IHttpRequest} message HttpRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HttpRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    $root.logtk.LogMessage.encode(message.base, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.method);
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
                    $root.logtk.http.internal.HttpVersion.encode(message.version, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.bodySize);
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.txOut);
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.txIn);
                    $root.logtk.net.internal.IpAddress.encode(message.remoteIp, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                    $root.logtk.net.internal.IpAddress.encode(message.serverIp, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                    writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.userId);
                    writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.status);
                    writer.uint32(/* id 12, wireType 2 =*/98).string(message.userAgent);
                    writer.uint32(/* id 13, wireType 2 =*/106).string(message.referrer);
                    writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.latency);
                    return writer;
                };
    
                /**
                 * Encodes the specified HttpRequest message, length delimited. Does not implicitly {@link logtk.http.HttpRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {logtk.http.IHttpRequest} message HttpRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                HttpRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };
    
                /**
                 * Decodes a HttpRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {logtk.http.HttpRequest} HttpRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HttpRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk.http.HttpRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.base = $root.logtk.LogMessage.decode(reader, reader.uint32());
                            break;
                        case 2:
                            message.method = reader.int32();
                            break;
                        case 3:
                            message.url = reader.string();
                            break;
                        case 4:
                            message.version = $root.logtk.http.internal.HttpVersion.decode(reader, reader.uint32());
                            break;
                        case 5:
                            message.bodySize = reader.uint32();
                            break;
                        case 6:
                            message.txOut = reader.uint32();
                            break;
                        case 7:
                            message.txIn = reader.uint32();
                            break;
                        case 8:
                            message.remoteIp = $root.logtk.net.internal.IpAddress.decode(reader, reader.uint32());
                            break;
                        case 9:
                            message.serverIp = $root.logtk.net.internal.IpAddress.decode(reader, reader.uint32());
                            break;
                        case 10:
                            message.userId = reader.uint32();
                            break;
                        case 11:
                            message.status = reader.uint32();
                            break;
                        case 12:
                            message.userAgent = reader.string();
                            break;
                        case 13:
                            message.referrer = reader.string();
                            break;
                        case 14:
                            message.latency = reader.uint32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    if (!message.hasOwnProperty("base"))
                        throw $util.ProtocolError("missing required 'base'", { instance: message });
                    if (!message.hasOwnProperty("method"))
                        throw $util.ProtocolError("missing required 'method'", { instance: message });
                    if (!message.hasOwnProperty("url"))
                        throw $util.ProtocolError("missing required 'url'", { instance: message });
                    if (!message.hasOwnProperty("version"))
                        throw $util.ProtocolError("missing required 'version'", { instance: message });
                    if (!message.hasOwnProperty("bodySize"))
                        throw $util.ProtocolError("missing required 'bodySize'", { instance: message });
                    if (!message.hasOwnProperty("txOut"))
                        throw $util.ProtocolError("missing required 'txOut'", { instance: message });
                    if (!message.hasOwnProperty("txIn"))
                        throw $util.ProtocolError("missing required 'txIn'", { instance: message });
                    if (!message.hasOwnProperty("remoteIp"))
                        throw $util.ProtocolError("missing required 'remoteIp'", { instance: message });
                    if (!message.hasOwnProperty("serverIp"))
                        throw $util.ProtocolError("missing required 'serverIp'", { instance: message });
                    if (!message.hasOwnProperty("userId"))
                        throw $util.ProtocolError("missing required 'userId'", { instance: message });
                    if (!message.hasOwnProperty("status"))
                        throw $util.ProtocolError("missing required 'status'", { instance: message });
                    if (!message.hasOwnProperty("userAgent"))
                        throw $util.ProtocolError("missing required 'userAgent'", { instance: message });
                    if (!message.hasOwnProperty("referrer"))
                        throw $util.ProtocolError("missing required 'referrer'", { instance: message });
                    if (!message.hasOwnProperty("latency"))
                        throw $util.ProtocolError("missing required 'latency'", { instance: message });
                    return message;
                };
    
                /**
                 * Decodes a HttpRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {logtk.http.HttpRequest} HttpRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                HttpRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };
    
                /**
                 * Verifies a HttpRequest message.
                 * @function verify
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                HttpRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    {
                        var error = $root.logtk.LogMessage.verify(message.base);
                        if (error)
                            return "base." + error;
                    }
                    switch (message.method) {
                    default:
                        return "method: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        break;
                    }
                    if (!$util.isString(message.url))
                        return "url: string expected";
                    {
                        var error = $root.logtk.http.internal.HttpVersion.verify(message.version);
                        if (error)
                            return "version." + error;
                    }
                    if (!$util.isInteger(message.bodySize))
                        return "bodySize: integer expected";
                    if (!$util.isInteger(message.txOut))
                        return "txOut: integer expected";
                    if (!$util.isInteger(message.txIn))
                        return "txIn: integer expected";
                    {
                        var error = $root.logtk.net.internal.IpAddress.verify(message.remoteIp);
                        if (error)
                            return "remoteIp." + error;
                    }
                    {
                        var error = $root.logtk.net.internal.IpAddress.verify(message.serverIp);
                        if (error)
                            return "serverIp." + error;
                    }
                    if (!$util.isInteger(message.userId))
                        return "userId: integer expected";
                    if (!$util.isInteger(message.status))
                        return "status: integer expected";
                    if (!$util.isString(message.userAgent))
                        return "userAgent: string expected";
                    if (!$util.isString(message.referrer))
                        return "referrer: string expected";
                    if (!$util.isInteger(message.latency))
                        return "latency: integer expected";
                    return null;
                };
    
                /**
                 * Creates a HttpRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {logtk.http.HttpRequest} HttpRequest
                 */
                HttpRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.logtk.http.HttpRequest)
                        return object;
                    var message = new $root.logtk.http.HttpRequest();
                    if (object.base != null) {
                        if (typeof object.base !== "object")
                            throw TypeError(".logtk.http.HttpRequest.base: object expected");
                        message.base = $root.logtk.LogMessage.fromObject(object.base);
                    }
                    switch (object.method) {
                    case "DEFAULT":
                    case 0:
                        message.method = 0;
                        break;
                    case "OPTIONS":
                    case 1:
                        message.method = 1;
                        break;
                    case "GET":
                    case 2:
                        message.method = 2;
                        break;
                    case "HEAD":
                    case 3:
                        message.method = 3;
                        break;
                    case "POST":
                    case 4:
                        message.method = 4;
                        break;
                    case "PUT":
                    case 5:
                        message.method = 5;
                        break;
                    case "DELETE":
                    case 6:
                        message.method = 6;
                        break;
                    case "TRACE":
                    case 7:
                        message.method = 7;
                        break;
                    case "CONNECT":
                    case 8:
                        message.method = 8;
                        break;
                    }
                    if (object.url != null)
                        message.url = String(object.url);
                    if (object.version != null) {
                        if (typeof object.version !== "object")
                            throw TypeError(".logtk.http.HttpRequest.version: object expected");
                        message.version = $root.logtk.http.internal.HttpVersion.fromObject(object.version);
                    }
                    if (object.bodySize != null)
                        message.bodySize = object.bodySize >>> 0;
                    if (object.txOut != null)
                        message.txOut = object.txOut >>> 0;
                    if (object.txIn != null)
                        message.txIn = object.txIn >>> 0;
                    if (object.remoteIp != null) {
                        if (typeof object.remoteIp !== "object")
                            throw TypeError(".logtk.http.HttpRequest.remoteIp: object expected");
                        message.remoteIp = $root.logtk.net.internal.IpAddress.fromObject(object.remoteIp);
                    }
                    if (object.serverIp != null) {
                        if (typeof object.serverIp !== "object")
                            throw TypeError(".logtk.http.HttpRequest.serverIp: object expected");
                        message.serverIp = $root.logtk.net.internal.IpAddress.fromObject(object.serverIp);
                    }
                    if (object.userId != null)
                        message.userId = object.userId >>> 0;
                    if (object.status != null)
                        message.status = object.status >>> 0;
                    if (object.userAgent != null)
                        message.userAgent = String(object.userAgent);
                    if (object.referrer != null)
                        message.referrer = String(object.referrer);
                    if (object.latency != null)
                        message.latency = object.latency >>> 0;
                    return message;
                };
    
                /**
                 * Creates a plain object from a HttpRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof logtk.http.HttpRequest
                 * @static
                 * @param {logtk.http.HttpRequest} message HttpRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                HttpRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.base = null;
                        object.method = options.enums === String ? "DEFAULT" : 0;
                        object.url = "";
                        object.version = null;
                        object.bodySize = 0;
                        object.txOut = 0;
                        object.txIn = 0;
                        object.remoteIp = null;
                        object.serverIp = null;
                        object.userId = 0;
                        object.status = 0;
                        object.userAgent = "";
                        object.referrer = "";
                        object.latency = 0;
                    }
                    if (message.base != null && message.hasOwnProperty("base"))
                        object.base = $root.logtk.LogMessage.toObject(message.base, options);
                    if (message.method != null && message.hasOwnProperty("method"))
                        object.method = options.enums === String ? $root.logtk.http.internal.RequestMethod[message.method] : message.method;
                    if (message.url != null && message.hasOwnProperty("url"))
                        object.url = message.url;
                    if (message.version != null && message.hasOwnProperty("version"))
                        object.version = $root.logtk.http.internal.HttpVersion.toObject(message.version, options);
                    if (message.bodySize != null && message.hasOwnProperty("bodySize"))
                        object.bodySize = message.bodySize;
                    if (message.txOut != null && message.hasOwnProperty("txOut"))
                        object.txOut = message.txOut;
                    if (message.txIn != null && message.hasOwnProperty("txIn"))
                        object.txIn = message.txIn;
                    if (message.remoteIp != null && message.hasOwnProperty("remoteIp"))
                        object.remoteIp = $root.logtk.net.internal.IpAddress.toObject(message.remoteIp, options);
                    if (message.serverIp != null && message.hasOwnProperty("serverIp"))
                        object.serverIp = $root.logtk.net.internal.IpAddress.toObject(message.serverIp, options);
                    if (message.userId != null && message.hasOwnProperty("userId"))
                        object.userId = message.userId;
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = message.status;
                    if (message.userAgent != null && message.hasOwnProperty("userAgent"))
                        object.userAgent = message.userAgent;
                    if (message.referrer != null && message.hasOwnProperty("referrer"))
                        object.referrer = message.referrer;
                    if (message.latency != null && message.hasOwnProperty("latency"))
                        object.latency = message.latency;
                    return object;
                };
    
                /**
                 * Converts this HttpRequest to JSON.
                 * @function toJSON
                 * @memberof logtk.http.HttpRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                HttpRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
    
                return HttpRequest;
            })();
    
            http.internal = (function() {
    
                /**
                 * Namespace internal.
                 * @memberof logtk.http
                 * @namespace
                 */
                var internal = {};
    
                /**
                 * RequestMethod enum.
                 * @name logtk.http.internal.RequestMethod
                 * @enum {number}
                 * @property {number} DEFAULT=0 DEFAULT value
                 * @property {number} OPTIONS=1 OPTIONS value
                 * @property {number} GET=2 GET value
                 * @property {number} HEAD=3 HEAD value
                 * @property {number} POST=4 POST value
                 * @property {number} PUT=5 PUT value
                 * @property {number} DELETE=6 DELETE value
                 * @property {number} TRACE=7 TRACE value
                 * @property {number} CONNECT=8 CONNECT value
                 */
                internal.RequestMethod = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "DEFAULT"] = 0;
                    values[valuesById[1] = "OPTIONS"] = 1;
                    values[valuesById[2] = "GET"] = 2;
                    values[valuesById[3] = "HEAD"] = 3;
                    values[valuesById[4] = "POST"] = 4;
                    values[valuesById[5] = "PUT"] = 5;
                    values[valuesById[6] = "DELETE"] = 6;
                    values[valuesById[7] = "TRACE"] = 7;
                    values[valuesById[8] = "CONNECT"] = 8;
                    return values;
                })();
    
                internal.HttpVersion = (function() {
    
                    /**
                     * Properties of a HttpVersion.
                     * @memberof logtk.http.internal
                     * @interface IHttpVersion
                     * @property {string|null} [protocol] HttpVersion protocol
                     * @property {number} major HttpVersion major
                     * @property {number} minor HttpVersion minor
                     */
    
                    /**
                     * Constructs a new HttpVersion.
                     * @memberof logtk.http.internal
                     * @classdesc Represents a HttpVersion.
                     * @implements IHttpVersion
                     * @constructor
                     * @param {logtk.http.internal.IHttpVersion=} [properties] Properties to set
                     */
                    function HttpVersion(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * HttpVersion protocol.
                     * @member {string} protocol
                     * @memberof logtk.http.internal.HttpVersion
                     * @instance
                     */
                    HttpVersion.prototype.protocol = "HTTP";
    
                    /**
                     * HttpVersion major.
                     * @member {number} major
                     * @memberof logtk.http.internal.HttpVersion
                     * @instance
                     */
                    HttpVersion.prototype.major = 0;
    
                    /**
                     * HttpVersion minor.
                     * @member {number} minor
                     * @memberof logtk.http.internal.HttpVersion
                     * @instance
                     */
                    HttpVersion.prototype.minor = 0;
    
                    /**
                     * Creates a new HttpVersion instance using the specified properties.
                     * @function create
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {logtk.http.internal.IHttpVersion=} [properties] Properties to set
                     * @returns {logtk.http.internal.HttpVersion} HttpVersion instance
                     */
                    HttpVersion.create = function create(properties) {
                        return new HttpVersion(properties);
                    };
    
                    /**
                     * Encodes the specified HttpVersion message. Does not implicitly {@link logtk.http.internal.HttpVersion.verify|verify} messages.
                     * @function encode
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {logtk.http.internal.IHttpVersion} message HttpVersion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    HttpVersion.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.protocol);
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.major);
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.minor);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified HttpVersion message, length delimited. Does not implicitly {@link logtk.http.internal.HttpVersion.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {logtk.http.internal.IHttpVersion} message HttpVersion message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    HttpVersion.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a HttpVersion message from the specified reader or buffer.
                     * @function decode
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {logtk.http.internal.HttpVersion} HttpVersion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    HttpVersion.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk.http.internal.HttpVersion();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.protocol = reader.string();
                                break;
                            case 2:
                                message.major = reader.uint32();
                                break;
                            case 3:
                                message.minor = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        if (!message.hasOwnProperty("major"))
                            throw $util.ProtocolError("missing required 'major'", { instance: message });
                        if (!message.hasOwnProperty("minor"))
                            throw $util.ProtocolError("missing required 'minor'", { instance: message });
                        return message;
                    };
    
                    /**
                     * Decodes a HttpVersion message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {logtk.http.internal.HttpVersion} HttpVersion
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    HttpVersion.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a HttpVersion message.
                     * @function verify
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    HttpVersion.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.protocol != null && message.hasOwnProperty("protocol"))
                            if (!$util.isString(message.protocol))
                                return "protocol: string expected";
                        if (!$util.isInteger(message.major))
                            return "major: integer expected";
                        if (!$util.isInteger(message.minor))
                            return "minor: integer expected";
                        return null;
                    };
    
                    /**
                     * Creates a HttpVersion message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {logtk.http.internal.HttpVersion} HttpVersion
                     */
                    HttpVersion.fromObject = function fromObject(object) {
                        if (object instanceof $root.logtk.http.internal.HttpVersion)
                            return object;
                        var message = new $root.logtk.http.internal.HttpVersion();
                        if (object.protocol != null)
                            message.protocol = String(object.protocol);
                        if (object.major != null)
                            message.major = object.major >>> 0;
                        if (object.minor != null)
                            message.minor = object.minor >>> 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a HttpVersion message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof logtk.http.internal.HttpVersion
                     * @static
                     * @param {logtk.http.internal.HttpVersion} message HttpVersion
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    HttpVersion.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.protocol = "HTTP";
                            object.major = 0;
                            object.minor = 0;
                        }
                        if (message.protocol != null && message.hasOwnProperty("protocol"))
                            object.protocol = message.protocol;
                        if (message.major != null && message.hasOwnProperty("major"))
                            object.major = message.major;
                        if (message.minor != null && message.hasOwnProperty("minor"))
                            object.minor = message.minor;
                        return object;
                    };
    
                    /**
                     * Converts this HttpVersion to JSON.
                     * @function toJSON
                     * @memberof logtk.http.internal.HttpVersion
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    HttpVersion.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return HttpVersion;
                })();
    
                return internal;
            })();
    
            return http;
        })();
    
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
             * @property {string|null} [_message] LogMessage _message
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
             * LogMessage _message.
             * @member {string} _message
             * @memberof logtk.LogMessage
             * @instance
             */
            LogMessage.prototype._message = "";
    
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
                if (message._message != null && Object.hasOwnProperty.call(message, "_message"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message._message);
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
                    case 4:
                        message._message = reader.string();
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
                if (message._message != null && message.hasOwnProperty("_message"))
                    if (!$util.isString(message._message))
                        return "_message: string expected";
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
                if (object._message != null)
                    message._message = String(object._message);
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
                    object._message = "";
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
                if (message._message != null && message.hasOwnProperty("_message"))
                    object._message = message._message;
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
    
        logtk.net = (function() {
    
            /**
             * Namespace net.
             * @memberof logtk
             * @namespace
             */
            var net = {};
    
            net.internal = (function() {
    
                /**
                 * Namespace internal.
                 * @memberof logtk.net
                 * @namespace
                 */
                var internal = {};
    
                internal.IpAddress = (function() {
    
                    /**
                     * Properties of an IpAddress.
                     * @memberof logtk.net.internal
                     * @interface IIpAddress
                     * @property {number|null} [v4] IpAddress v4
                     * @property {Uint8Array|null} [v6] IpAddress v6
                     */
    
                    /**
                     * Constructs a new IpAddress.
                     * @memberof logtk.net.internal
                     * @classdesc Represents an IpAddress.
                     * @implements IIpAddress
                     * @constructor
                     * @param {logtk.net.internal.IIpAddress=} [properties] Properties to set
                     */
                    function IpAddress(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * IpAddress v4.
                     * @member {number|null|undefined} v4
                     * @memberof logtk.net.internal.IpAddress
                     * @instance
                     */
                    IpAddress.prototype.v4 = null;
    
                    /**
                     * IpAddress v6.
                     * @member {Uint8Array|null|undefined} v6
                     * @memberof logtk.net.internal.IpAddress
                     * @instance
                     */
                    IpAddress.prototype.v6 = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * IpAddress blob.
                     * @member {"v4"|"v6"|undefined} blob
                     * @memberof logtk.net.internal.IpAddress
                     * @instance
                     */
                    Object.defineProperty(IpAddress.prototype, "blob", {
                        get: $util.oneOfGetter($oneOfFields = ["v4", "v6"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new IpAddress instance using the specified properties.
                     * @function create
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {logtk.net.internal.IIpAddress=} [properties] Properties to set
                     * @returns {logtk.net.internal.IpAddress} IpAddress instance
                     */
                    IpAddress.create = function create(properties) {
                        return new IpAddress(properties);
                    };
    
                    /**
                     * Encodes the specified IpAddress message. Does not implicitly {@link logtk.net.internal.IpAddress.verify|verify} messages.
                     * @function encode
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {logtk.net.internal.IIpAddress} message IpAddress message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    IpAddress.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.v4 != null && Object.hasOwnProperty.call(message, "v4"))
                            writer.uint32(/* id 1, wireType 5 =*/13).fixed32(message.v4);
                        if (message.v6 != null && Object.hasOwnProperty.call(message, "v6"))
                            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.v6);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified IpAddress message, length delimited. Does not implicitly {@link logtk.net.internal.IpAddress.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {logtk.net.internal.IIpAddress} message IpAddress message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    IpAddress.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an IpAddress message from the specified reader or buffer.
                     * @function decode
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {logtk.net.internal.IpAddress} IpAddress
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    IpAddress.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.logtk.net.internal.IpAddress();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.v4 = reader.fixed32();
                                break;
                            case 2:
                                message.v6 = reader.bytes();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an IpAddress message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {logtk.net.internal.IpAddress} IpAddress
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    IpAddress.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an IpAddress message.
                     * @function verify
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    IpAddress.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.v4 != null && message.hasOwnProperty("v4")) {
                            properties.blob = 1;
                            if (!$util.isInteger(message.v4))
                                return "v4: integer expected";
                        }
                        if (message.v6 != null && message.hasOwnProperty("v6")) {
                            if (properties.blob === 1)
                                return "blob: multiple values";
                            properties.blob = 1;
                            if (!(message.v6 && typeof message.v6.length === "number" || $util.isString(message.v6)))
                                return "v6: buffer expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates an IpAddress message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {logtk.net.internal.IpAddress} IpAddress
                     */
                    IpAddress.fromObject = function fromObject(object) {
                        if (object instanceof $root.logtk.net.internal.IpAddress)
                            return object;
                        var message = new $root.logtk.net.internal.IpAddress();
                        if (object.v4 != null)
                            message.v4 = object.v4 >>> 0;
                        if (object.v6 != null)
                            if (typeof object.v6 === "string")
                                $util.base64.decode(object.v6, message.v6 = $util.newBuffer($util.base64.length(object.v6)), 0);
                            else if (object.v6.length)
                                message.v6 = object.v6;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an IpAddress message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof logtk.net.internal.IpAddress
                     * @static
                     * @param {logtk.net.internal.IpAddress} message IpAddress
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    IpAddress.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.v4 != null && message.hasOwnProperty("v4")) {
                            object.v4 = message.v4;
                            if (options.oneofs)
                                object.blob = "v4";
                        }
                        if (message.v6 != null && message.hasOwnProperty("v6")) {
                            object.v6 = options.bytes === String ? $util.base64.encode(message.v6, 0, message.v6.length) : options.bytes === Array ? Array.prototype.slice.call(message.v6) : message.v6;
                            if (options.oneofs)
                                object.blob = "v6";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this IpAddress to JSON.
                     * @function toJSON
                     * @memberof logtk.net.internal.IpAddress
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    IpAddress.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return IpAddress;
                })();
    
                return internal;
            })();
    
            return net;
        })();
    
        return logtk;
    })();

    return $root;
});
