var chai = require('chai');
var path = require('path');
var shortener = require('../../lib/shortener')({
    'App': '__toto__'
});

import { foo as fooImport } from 'one/foo';
import { bar as barImport } from 'two/../two/bar';
import { baz as bazImport } from '../test/three/baz';

import 'one/fooGlobal';
import 'two/../two/barGlobal';
import '../test/three/bazGlobal';

describe('shortener', function() {

  it('should replace with require', function() {
    chai.expect(shortener('require("App/Modules/view.js")'))
      .to.equal('require("__toto__/Modules/view.js")');
  });

  it('should replace with from', function() {
    chai.expect(shortener('import { foo as fooImport } from "App/Modules/view.js"'))
      .to.equal('import { foo as fooImport } from "__toto__/Modules/view.js"');
  });

  it('should replace with import', function() {
    chai.expect(shortener('import "App/Modules/view.js"'))
      .to.equal('import "__toto__/Modules/view.js"');
  });
});

describe('shortify', function() {

  it('should resolve module "foo"', function() {
    var foo = require('one/foo');

    chai.expect(foo.foo).to.equal(1);
  });

  it('should resolve module "bar"', function() {
    var bar = require('two/../two/bar');

    chai.expect(bar.bar).to.equal(1);
  });

  it('should resolve module "baz"', function() {
    var baz = require('../test/three/baz');

    chai.expect(baz.baz).to.equal(1);
  });

  it('should resolve module "vendor/module"', function() {
    var module = require('vendor/module');

    chai.expect(module.vendorModule).to.equal(1);
  });

});

// ES6 import doesn't work the same way as require,
// so we expect something slightly different.
describe('shortify in ES6', function() {

  it('should resolve module "foo"', function() {
    chai.expect(fooImport).to.equal(1);
  });

  it('should resolve module "bar"', function() {
    chai.expect(barImport).to.equal(1);
  });

  it('should resolve module "baz"', function() {
    chai.expect(bazImport).to.equal(1);
  });


  it('should resolve module "fooGlobal"', function() {
    if (typeof(window) != "undefined") {
      chai.expect(window.foo).to.equal(1);
    }
    else if (typeof(process) != "undefined") {
      chai.expect(process.foo).to.equal(1);
    }
    else {
      chat.fail();
    }
  });

  it('should resolve module "barGlobal"', function() {
    if (typeof(window) != "undefined") {
      chai.expect(window.bar).to.equal(1);
    }
    else if (typeof(process) != "undefined") {
      chai.expect(process.bar).to.equal(1);
    }
    else {
      chat.fail();
    }
  });

  it('should resolve module "bazGlobal"', function() {
    if (typeof(window) != "undefined") {
      chai.expect(window.baz).to.equal(1);
    }
    else if (typeof(process) != "undefined") {
      chai.expect(process.baz).to.equal(1);
    }
    else {
      chat.fail();
    }
  });

});
