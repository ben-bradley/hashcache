var HashCache = require('../');

var cache = new HashCache({
  expires: 1001 * 2 // 3 sec
});

//cache.set('key1', 'value1');
//
//setInterval(function () {
//  console.log(cache.get('key1')); // => 'value1', 'value1', ???
//  console.log(cache.get('badkey'));
//}, 1000);

cache.set('key2', 'valueX', function (update) {
  setTimeout(function () {
    //    update('fake data: ' + new Date().getTime());
    update();
  }, 500);
});

console.log(cache.peek('key2'));
setInterval(function () {
  console.log(cache.peek('key2'));
}, 1000);
