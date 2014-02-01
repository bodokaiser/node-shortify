var path    = require('path');
var through = require('through');

const QUERY = [
  'require[(]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'
];

const REPLACE = [
  'require($1$2', '$3$4'
];

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
        var regex = new RegExp(QUERY[0] + key + QUERY[1], 'g');

        source = source.replace(regex, REPLACE[0] + options[key] + REPLACE[1]);
      }

      this.queue(source);
      this.queue(null);
    }

    return through(read, end);
  }
};
