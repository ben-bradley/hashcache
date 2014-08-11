module.exports = HashCache;

function HashCache(options) {

  // error handling
  if (!arguments)
    throw new Error('HashCache() expects arguments');
  // cache('key'); => return value
  else if (arguments.length === 1 && typeof arguments[0] === 'string')
    return this.get(this._cache, arguments);
  // cache('key', 'value'); => set key = value in cache
  else if (arguments.length === 2 && typeof arguments[0] === 'string')
    this.set(this._cache, arguments[0], arguments[1]);


  // Init the cache
  // ==============
  var cache = this._cache = {};

  // Clean up expired items
  // ======================
  setInterval(function () {
    var now = new Date().getTime();
    for (var c in cache) {
      if (cache[c].expires < now)
        delete cache[c];
    }
  }, 1000);

  // Register the expiration timeout
  // ===============================
  this._expires = options.expires || 1000 * 60 * 60;

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
  this._cache[key] = new Item(key, value);
  return this;
}

// Cache Item class
// ================
function Item(key, value) {
  return {
    key: key,
    value: value,
    expires: new Date().getTime() + this._expires
  }
}
