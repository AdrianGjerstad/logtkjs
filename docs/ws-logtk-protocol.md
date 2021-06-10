# LogTK WebSocket Protocol

This document outlines the specification for the Logging Toolkit WebSocket Protocol, which can optionally be dumbed down to TCP, with an extra authentication handshake at the beginning.

## Authentication

Obviously, you don't want malicious actors injecting logs into your system, so you'll need a way to lock down your server before launching it. Fortunately, this protocol supports just that.

If the server is listening over HTTP and looking out for WebSocket upgrade requests, an authenticatable request should look like this:

```
GET /logging/myapplication HTTP/1.1
Host: 10.0.255.24
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: logtk
X-LogTK-Auth: VGhpcyBrZXkgaXMgNjQgYnl0ZXMgbG9uZyBhbmQgY2FuIGhhdmUgYmluYXJ5IGRhdGEgaW4gaXTerb7vi63wDQ==
```

If your server is operating over simple TCP with no additional HTTP layer in the middle, the client MUST send an `auth` packet before sending `data` packets.

After this request, the server should respond with either `401 Unauthorized` or `101 Switching Protocols`, depending on whether or not authentication succeeded (this is ignoring namespaced requests where servers can respond with `404 Not Found`s).

## Packet types

To transfer as little data as possible, everything about this protocol is in binary, including the log data itself, utilizing binary serialization formats such as `protobuf` or `BSON`.

Example communication:

```
> auth <mytoken>
< auth-accept
: The server has authenticated this connection
> init fmt:protobuf ping:5000ms,recv
< init fmt:protobuf ping:1000ms,recv
: The client and server have decided that a ping should be sent every 5 seconds.
: If either said they did not want to recv, neither side should send ping
: frames.
< ping
> ping
> data <id0> <mydata>
< ack <id0>
> data <id1> <mydata>
< ack <id1>
: The server has now logged two entries on its end
> close 0x80 "client exiting"
: The client wants to close the connection because it is exiting.
: Server acknowledges the close (0x80 has high bit set, so no real ack is necessary).
: Begin closing connections of network layers below this one.
```

NOTE: All frames end with a single null byte.

### `close` 0x00

Either side of the connection may send this frame at any time, and it represents that one of the sides has requested to close the connection. It goes along with a single-byte close code representing why the endpoint wishes to close. It can optionally also have a full UTF-8 string for a more human-readable explanation. Once the receiving end sees this, it is FORBIDDEN from sending or receiving anything other than a close-ack frame, which uses the same opcode (0x00).

#### Fields

- code (op:1) {byte(1)}: Exit code
  - If the high bit of this field is set, the sending party has requested that no close-ack frame is sent in response
- reason (op:2) {string} (optional): Reason for closing

#### Examples

Sent malformed frame:

close: (fe) malformed frame received

```
> 00 01 fe 02 18 6d616c666f726d6564206672616d65207265636569766564 00
: Connection closed
```

Normal close:

close: code 0
close-ack

```
> 00 01 00 00
< 00 00
: Connection closed
```

### `auth` 0x01

This packet is only necessary for endpoints listening using raw TCP. It allows the client to authenticate using 64-byte security tokens. DO NOT EXPOSE THESE TOKENS. This frame my also be sent by the server to signify that the authentication request has (1) succeeded or (2) failed. Once authenticated, the server MUST ignore all auth frames it receives.

#### Fields

- token (op:1) {byte(64)}: Secret token (client only)
  - The existence of this token is why it is recommended to communicate over TLS.
- status (op:2) {boolean}: Whether or not the client has passed auth (server only)

#### Examples

Valid token:

auth mykey
auth-accept

```
> 01 01 6c9f50a14f40475ee4f68398e819ba298579af0884441bfc486ae2bcd22c233cb5edb168be03bf7460a9b11a5d8da678 00
< 01 02 01 00
: You may now init the connection
```

Invalid token:

auth mybadkey
auth-deny
close: (ff) invalid auth

```
> 01 01 423ad31e10d4cf9fa73b5b1e0a113f4ac5f64dbad08d529ca318577e58b4ba57852e690db15782281a62c6cd22c97270 00
< 01 02 00 00
< 00 01 ff 02 0c 696e76616c69642061757468 00
: Connection closed
```

### `init` 0x02

This frame is sent to initialize a connection using shared information, such as the format that will be used for interchange. It may be sent only once by the client, and only once by the server. All other occurrences of the frame SHOULD be ignored. The server MAY treat it as a firewall violation to send this frame without first authenticating.

#### Fields

- format (op:1) {cstring} (default: `protobuf`): The data interchange format that log entries sent over the wire will use.
  - Notice: a server MAY treat it as a malformed frame if this field is missing, so it is always best to send it anyway.
- id (op:2) {uint32}: A unique identifier that identifies the sending application (client only) (required).
- ping_min_delta (op:3) {varuint32}: The minimum delay, in milliseconds, between ping frames that this side can guarantee.
  - Notice: if ping_recv is true, the server WILL treat this frame as malformed.
- ping_recv (op:4) {boolean} (default: `false`): Whether or not the sending party wishes to receive ping frames.

#### Examples

Correct:

```
> 02 01 70726f746f62756600 02 285db4ad 03 a708 04 01 00
< 02 01 70726f746f62756600 03 8768 04 01 00
: Both sides wish to use pings, ideally sending one every 2500ms.
: The format was chosen by the client, and ack'd by the server, to be `protobuf`
```

No ping_min_delta:

```
> 02 01 70726f746f62756600 02 285db4ad 04 01 00
< 00 01 fe 02 18 6d616c666f726d6564206672616d65207265636569766564 00
: Connection closed forcefully by the server.
```

### `data` 0x03

This frame is sent any time the client (application) performs an action that it wants to log, and contains the binary-serialized data inside. This frame should only be sent by the client. If the client receives a `data` frame, it SHOULD ignore it. It also contains an idempotency token to make sure that the data is logged only once. To be safe, this number should be a combination of incremental and random, such that there is no chance that the server ignores this packet.

#### Fields

- data (op:1) {varuint32.bytes(x)}: A binary-serialized representation of a logging object, containing a timestamp, level, trace information, etc. (REQUIRED)
- idem (op:2) {uint32}: An idempotency token uniquely identifying this object. If no acknowledgement for the data has been received in a second or so, send it again with the same token. It should also be cached somewhere such that, if the connection has failed, lack of pings will close the connection, attempt to reconnect, and send it again WITH THE SAME TOKEN.

#### Examples

Correct:

```
> 03 01 08 12345678deadbeef 02 3a7bd946 00
< 04 01 3a7bd946 00
: The message has been logged, and it is safe to remove the message from the cache.
```

Failed Connection:

```
> 03 01 08 12345678deadbeef 02 3a7bd946 00
: A second passes
> 03 01 08 12345678deadbeef 02 3a7bd946 00
: Another second passes
> 03 01 08 12345678deadbeef 02 3a7bd946 00
: Now the client is sure the connection is dead, because of lack of pings. Drop it.
...
: Reconnect and complete the handshake
> 03 01 08 12345678deadbeef 02 3a7bd946 00
< 04 01 3a7bd946 00
: Note: SAME IDEMPOTENCY TOKEN
```

### `ack` 0x04

This frame is sent by the server upon receipt of a `data` frame. It acknowledges the receipt of a single log message based on an idempotency token that was received in the same message. This idempotency token should be cached for a decent amount of time, such that, if it is received again, you can safely ignore it.

#### Fields

- idem (op:1) uint32: An idempotency token corresponding to the one received in the corresponding `data` frame.

#### Examples

Basic:

```
< 03 01 08 12345678deadbeef 02 3a7bd946 00
> 04 01 3a7bd946 00
: The message has been logged.
```

### `ping` 0x80

This packet type is only necessary over TCP or over WS connections that aren't utilizing `ping` and `pong` WS frames. The server will calculate the amount of time between each ping frame as the following:

pingDelta = max(clientDelta, serverDelta)/2

The server will send a ping frame and expect a client `pong` frame in response. If it misses two in a row, the connection is dead. If the client sees that there has been no ping frame in `pingDelta`*2, it will assume the connection is dead. If either party says they do not wish to use pings, no pings will be sent, and any that are SHOULD be ignored upon receipt.

THE `ping` FRAME IS ONLY SENT BY THE SERVER.

#### Fields

- ackid (op:1) {uint32}: A unique identifier that is used in `pong` frames to acknowledge the ping.

#### Examples

Basic:

```
< 80 01 deadbeef 00
> 81 01 deadbeef 00
```

### `pong` 0x81

See `ping` (0x80) for more information.

THE `pong` FRAME IS ONLY SENT BY THE CLIENT.

#### Fields

- ackid (op:1) {uint32}: A copy of the `ackid` of the `ping` frame this frame is responding to.

#### Examples

Basic:

```
< 80 01 deadbeef 00
> 81 01 deadbeef 00
```

