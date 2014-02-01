var path    = require('path');
var through = require('through');

const QUERY = 'require[(]("|\')';

const REPLACE = 'require(\'';

module.exports = function(options) {
  options = options || {};

  return function(filename) {
    if (path.extname(filename) !== '.js') return through();

    var source = '';

    function read(chunk) {
      source += chunk;
    }

    function end() {
      for (var key in options) {
        var regex = new RegExp(QUERY + key, 'g');

        source = source.replace(regex, REPLACE + options[key]);
      }

      this.queue(source);
      this.queue(null);
    }

    return through(read, end);
  }
};
