module.exports = HashCache;

function HashCache(options) {

  // Init the cache
  // ==============
  var cache = this._cache = {};
  this._expires = options.expires || 1000 * 60 * 60;

  // Clean up expired items
  // ======================
  setInterval(function () {
    var now = new Date().getTime();
    for (var c in cache) {
      if (cache[c].expires < now)
        delete cache[c];
    }
  }, 100);

  // oink!
  // =====
  return this;
}

HashCache.prototype.get = function (key) {
  if (this._cache[key])
    this._cache[key].expires = new Date().getTime() + this._expires;
  return this.peek(key);
}

HashCache.prototype.peek = function (key) {
  return (this._cache[key]) ? this._cache[key].value : undefined;
}

HashCache.prototype._getItem = function (key) {
  return (this._cache[key]) ? this._cache[key] : undefined;
}

HashCache.prototype.set = function (key, value) {
  this._cache[key] = new Item(key, value, this._expires);
  return this;
}

// Cache Item class
// ================
function Item(key, value, expires) {
  return {
    key: key,
    value: value,
    expires: new Date().getTime() + expires
  }
}
