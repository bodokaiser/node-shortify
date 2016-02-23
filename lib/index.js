'use strict';

var through = require('through');
var shortenerBuilder = require('./shortener.js');

module.exports = function (options) {
  var shortener = shortenerBuilder(options || {});

  return function (filename) {
    var source = '';

    function read(chunk) {
      source += chunk;
    }

    function end() {
      this.queue(shortener(source));
      this.queue(null);
    }

    return through(read, end);
  };
};
