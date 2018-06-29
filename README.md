# hypercore-proxy-protocol

A module that allows you to proxy a single hypercore replication stream to multiple peers.

```
npm install hypercore-proxy-protocol
```

Useful if you want to implement a hypercore proxy gateway that replicates with many peers behind the scene, for privacy or connectivity reasons.

## Usage

``` js
const createProxyStream = require('hypercore-proxy-protocol')
const net = require('net')
const pump = require('pump')

net.createServer(function (socket) {
  const { stream, proxy } = createProxyStream(aFeedKey)

  pump(socket, stream, socket)

  // find some peers something
  findSomePeers(aFeedKey, function (stream) {
    proxy(stream) // proxy to this peer, can be called multiple times
  })
}).listen(3282)
```

## API

#### `{ stream, proxy } = createProxyStream(feedKey, [options])`

Create a proxy stream and forwarded.
All options are forwarded to hypercore's replication method.

Call `proxy(stream)` with a stream to another peer to start proxying to them.
It is safe to call this as many times as you want.

## License

MIT
