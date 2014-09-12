var HashCache = require('../'),
  should = require('should');

describe('HashCache', function () {

  it('should have .get()', function () {
    var cache = new HashCache({
      expires: 1000 * 3
    });
    (cache.get).should.be.a.Function;
  });

  it('should have .peek()', function () {
    var cache = new HashCache({
      expires: 1000 * 3
    });
    (cache.peek).should.be.a.Function;
  });

  it('should have .set()', function () {
    var cache = new HashCache({
      expires: 1000 * 3
    });
    (cache.set).should.be.a.Function;
  });

  describe('.get(), .set(), .peek()', function () {

    it('should cache a value for 3 sec', function (done) {
      this.timeout(5000);
      var cache = new HashCache({
        expires: 1000 * 3
      });
      cache.set('key1', 'value1');
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value1');
      }, 2000);
      setTimeout(function () {
        (cache.peek('key1') === undefined).should.be.true;
        done();
      }, 3500);
    });

    it('should cache a value for 4 sec', function (done) {
      this.timeout(5000);
      var cache = new HashCache({
        expires: 1000 * 3
      });
      cache.set('key1', 'value1');
      setTimeout(function () {
        // calling .get() resets the timeout
        (cache.get('key1')).should.equal('value1');
      }, 1000);
      setTimeout(function () {
        (cache.peek('key1') === undefined).should.be.true;
        done();
      }, 4500);
    });

    it('.get("invalid_key") should be undefined', function (done) {
      this.timeout(5000);
      var cache = new HashCache({
        expires: 1000 * 3
      });
      cache.set('key1', 'value1');
      setTimeout(function () {
        (cache.peek('invalid_key') === undefined).should.be.true;
      }, 2000);
      setTimeout(function () {
        (cache.peek('key1') === undefined).should.be.true;
        done();
      }, 3500);
    });

    it('should never expire with { expires: 0 }', function (done) {
      this.timeout(5000);
      var cache = new HashCache({
        expires: 0
      });
      cache.set('key1', 'value1');
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value1');
      }, 2000);
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value1');
      }, 3500);
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value1');
      }, 4500);
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value1');
        done();
      }, 4950);
    });

    it('should allow for updating values before expiration', function (done) {
      var cache = new HashCache({
        expires: 500
      });
      cache.set('key1', 'value1', function (update) {
        setTimeout(function () {
          update('value2');
        });
      });
      (cache.peek('key1')).should.equal('value1');
      setTimeout(function () {
        (cache.peek('key1')).should.equal('value2');
        done();
      }, 600);

    });

  });

});
