const ram = require('random-access-memory')
const hypercore = require('hypercore')
const pump = require('pump')
const hyperproxy = require('./')

const feed = hypercore(ram)

feed.append(['a', 'b', 'c'], function () {
  const {stream, proxy} = hyperproxy(feed.key, {live: true})

  const a = hypercore(ram, feed.key, {sparse: true})
  const b = hypercore(ram, feed.key)

  pump(stream, a.replicate({live: true}), stream)
  setTimeout(function () {
    proxy(feed.replicate({live: true}))
    proxy(b.replicate({live: true}))
  }, 10)

  a.get(1, console.log)
})
