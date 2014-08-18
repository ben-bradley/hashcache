var HashCache = require('../');

var cache = new HashCache({
  expires: 1000 * 3 // 3 sec
});

cache.set('key1', 'value1');

setInterval(function () {
  console.log(cache.get('key1')); // => 'value1', 'value1', ???
  console.log(cache.get('badkey'));
}, 1000);
