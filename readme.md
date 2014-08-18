# Hash Cache

A simple bit of code for creating an in-memory object store/cache.  LRU Cache has a lot more bells & whistles if you're looking for something production ready.

## Install

`npm install hashcache`

-or-

`npm install ben-bradley/hashcache`

## Use

```js
var HashCache = require('../');

var cache = new HashCache({
  expires: 1000 * 10 // 1000ms * 10 = 10sec expiration for items
});

cache.set('key1', 'value1');

setInterval(function () {
  // this will get called every 1sec & return the cached value
  // after 10sec, it returns `undefined`
  console.log(cache.get('key1'));
}, 1000);)
```

## Methods

### __`get('key')`__

Returns the cached value associated with `'key'` and reset the expiration timer.

### __`peek('key')`__

Returns the cached value associated with `'key'` and does NOT reset the expiration timer.

### __`set('key', 'value')`__

Sets a new cached value

## Test

`npm test`

-or-

`mocha -R spec`
