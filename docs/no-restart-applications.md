# No-Restart Applications

The idea for this started with the idea of introducing greater scalability to `logtkjs` as I begin to develop it into a multipurpose application framework. In this document, I will be building on the idea of Clusters, and implementing specialized workers; prewritten workers with specific tasks for easier operation of the application.

## No-Restart

The biggest problem at the current time with this quickly growing framework is that an application must be stopped in order for changes to the program's code to be seen. With this proposal that gets completely changed. As of right now, I can think of two reasons you may need to restart the application.

1. You must make changes to the code to resolve a bug as a live hotfix (never a great habit, but it should be available just in case)
2. Your application is receiving greater demand than usual, so you must increase the number of workers available to the cluster.

Neither of these cases are ones where you want to allow traffic to your application to go unanswered while you restart it. Fortunately, Posix-style processes come to save the day.

With these, the `exec` syscall actually replaces the current process with the new one, which is why you must `fork` and then `exec` to run an external command. While calling this system "No-Restart" is a bit misleading, it can certainly be done much quicker than any human. Further research is needed to determine if this is possible in Node.js right now. **Update**: look up npm package `native-exec`

On the other hand, you don't want to even bother changing the code and restarting the app if you are trying to spin up new worker processes. That should be done in place and not in the code. That is why this document proposes an optional special worker process that creates a TCP (over TLS) server that will allow you to issue commands to a running application without stopping it. In hindsight, now that I am writing this, one of the commands could be to restart everything. This worker process will communicate with the primary, instructing it to do something.

My overall goal with doing this in a separate worker process is to offload any builtin work from the primary process, that way it is free to do whatever the user needs it to do. Anyways, off to write some examples!

## Implementation

`main.js`

```javascript
// ...
const c = new logtk.Cluster({
  // ...
});

c.start();  // Starts all workers

const shell = new logtk.addons.Shell({
  host: "127.0.0.1",
  port: 7777,
  password: Buffer.from("4bca2b137edc580fe50a88983ef860ebaca36c857b1f492839d6d7392452a63c82cbebc68e3b70a2a1480b4bb5d437a7cba6ecf9d89f9ff3ccd14cd6146ea7e7", "hex"),
  custom_commands: { ...require("./poke-commands.js") }
});

shell.start();  // Lauches shell process and a server inside it
```

`poke-commands.js`

```javascript
async function foo(argv, send, recv, primary) {
  for (let i = 0; i < argv.length; ++i) {
    send(argv[i] + "\n");
  }
}

async function bar(argv, send, recv, primary) {
  for (let i = argv.length-1; i >= 0; --i) {
    send(argv[i] + "\n");
  }

  primary.send({
    type: "restart" 
  });
}

async function baz(argv, send, recv, primary) {
  send("Give me a number: ");

  let buf = await recv();
  let num = parseFloat(buf.toString());

  send(num + "*2 = " + (num*2));
}

module.exports = { foo, bar, baz };

////// Later:
// Password:
// > foo 1 2 3
// foo
// 1
// 2
// 3
// > baz
// Give me a number: 21
// 21*2 = 42
// > bar foo
// foo
// bar
// Connection lost. Reconnecting... done!
// Password:
// > worker info
//   Current Workers: 3
//    Target Workers: 4
//      Dead Workers: 1
// > worker revive  # revive the dead workers
// > worker info
//   Current Workers: 4
//    Target Workers: 4
//      Dead Workers: 0
// > .exit
```

