var chai = require('chai');
var path = require('path');

describe('shortify', function() {

  it('should resolve module "foo"', function() {
    var foo = require('one/foo');

    chai.expect(foo).to.equal('foo');
  });

  it('should resolve module "bar"', function() {
    var bar = require('two/../two/bar');

    chai.expect(bar).to.equal('bar');
  });

});
