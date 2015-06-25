var chai = require('chai');
var path = require('path');

import { foo as fooImport } from 'one/foo';
import { bar as barImport } from 'two/../two/bar';
import { baz as bazImport } from '../test/three/baz';


describe('shortify', function() {

  it('should resolve module "foo"', function() {
    var foo = require('one/foo');

    chai.expect(foo).to.equal('foo');
  });

  it('should resolve module "bar"', function() {
    var bar = require('two/../two/bar');

    chai.expect(bar).to.equal('bar');
  });

  it('should resolve module "baz"', function() {
    var baz = require('../test/three/baz');

    chai.expect(baz).to.equal('baz');
  });

});


describe('shortify in ES6', function() {

  it('should resolve module "foo"', function() {
    chai.expect(fooImport).to.equal('foo');
  });

  it('should resolve module "bar"', function() {
    chai.expect(barImport).to.equal('bar');
  });

  it('should resolve module "baz"', function() {
    chai.expect(bazImport).to.equal('baz');
  });

});
