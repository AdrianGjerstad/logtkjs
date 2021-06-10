# LogTK Cluster-Network Logging

This feature makes use of the Node.js `cluster` module.

## Reasoning

Logging in generally is a tricky thing to get right. Sure, logging basic text to the console is easy, but there are several problems with that approach.

1. If you have multiple processes running that are all using the same console, the console may not respond nicely to logging two things at almost the same exact time.
2. The console should be for debug logs, as the output of the console (unless it's being piped) cannot be saved to a file.
3. Text is inefficient as a means of storage in general, but if you tried outputting a compact binary format on the console, you'd be sure to wreck it at some point.

These problems were solved with the introduction of the `File` transport in logtk. However, a new problem arises when you begin to build up large warehouses of application workers full of many servers. If you're making logs on all of those servers, surely you would want to aggregate them somewhere. This is where the `Network` transport comes in, because it can communicate (1) over a network (2) using a specialized serialization format that is not text-based.

As I have learned from writing the network protocol, `Network` transport, and log server software, networks are extremely unpredictable in their timing. This becomes a real problem if your application is running into an uncaught exception or unhandled rejection, and it isn't logging it because the network frame isn't able to make it over before the process exits. This is where the new solution, called Cluster-Network logging, comes in.

Your applications will run in their own processes, and communicate over IPC via the Node.js `cluster` module to a primary process that handles all network logging. This way, if your application process dies for some reason, not only will that be able to be logged, the process may be started up again. In addition, this method encourages the use of multiprocessing and multithreading, making for stronger, and more redundant applications that may be running high-demand servers.

## Implementation

This section contains notes I have made for how implementation should be handled

`main.js`

```javascript
const logtk = require("logtkjs");
const cluster = require("cluster");

const pblib = require("./proto/loggable-message.js");

// Internally sets cluster 'message', 'exit', etc. events
let c = new logtk.Cluster({
  workers: 1,
  file: "./worker.js",
  args: [],
  restart: false,  // Should processes be restarted after death?
  cwd: "/",
  uid: logtk.system.resolveUser("unprivileged-worker"),
  gid: logtk.system.resolveGroup("unprivileged-worker"),
  env: {},
  
  // These two options get forwarded in the worker's logtk.worker object.
  format: logtk.format.protobuf(pblib, pblib.cluster.LoggableMessage),
  theme: logtk.colors.none,

  transports: [
    new logtk.transports.Network({ /* options here */ })
  ]
});

c.start();

// Do whatever else you want in this process

/*
cluster.on("message", (worker, data) => {
  if (data[logtk.Cluster.log] !== undefined) return;

  // Do whatever you want with any custom messages you may have.
});*/ // On the other hand...

// This event only gets emitted when a process sends data that isn't a log.
c.on("message", (worker, data) => {
  console.log("Received IPC data:", data);
});
```

`worker.js`

```javascript
const logtk = require("logtkjs");

let logger = logtk.createLogger({
  // etc...
  transports: [
    new logtk.transports.ClusterReport()
  ]
});

logger.info("Hello, world!");
// This does many things:
// 
// Inside ClusterReport transport
// 1. Report back to the primary process using process.send() with the data the
//    logger gives it.
// 
// Inside Primary Process Cluster Instance
// 2. Receive this message, and dispatch it to the transports
// 
// Inside Network Transport
// 3. Encode the message using the format and theme specified above.
// 4. Take the data and perform further I/O logic to send it out.
// 
// Inside Server
// 5. Receive the data, and perform whatever actions are required to log it.

throw new Error("This is an uncaught error that will be discovered by the cluster, and logged.");
```

