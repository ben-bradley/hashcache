module.exports = HashCache;

function HashCache(options) {

  // Init the cache
  // ==============
  var cache = this._cache = {};
  var expires = this._expires = options.expires || 1000 * 60 * 60;

  // Clean up expired items
  // ======================
  if (this._expires > 0) {
    setInterval(function () {
      var now = new Date().getTime();
      for (var key in cache) {
        if (cache[key].expires < now && cache[key].status !== 'updating') {
          cache[key].status = 'updating';
          cache[key].update(function (value) {
            if (value)
              cache[key] = new Item(key, value, expires, cache[key].update);
            else
              delete cache[key];
          });
        }
      }
    }, 100);
  }

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

HashCache.prototype.set = function (key, value, update) {
  if (update && typeof update !== 'function')
    throw new Error('update argument should be a function, but is a ' + typeof update);
  else if (!update)
    update = function () {};
  this._cache[key] = new Item(key, value, this._expires, update);
  return this;
}

// Cache Item class
// ================
function Item(key, value, expires, update) {
  return {
    key: key,
    value: value,
    expires: new Date().getTime() + expires,
    update: update,
    status: 'created'
  }
}
