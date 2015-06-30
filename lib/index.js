'use strict';

var through = require('through');

var PAIRS = [
// `require()`
{
  query: ['require[(]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
  replace: ['require($1$2', '$3$4']
},

// ` from ""`
{
  query: ['[\\s]from[\\s]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
  replace: [' from $1$2', '$3$4']
}];

module.exports = function (options) {
  options = options || {};

  return function (filename) {
    var source = '';

    function read(chunk) {
      source += chunk;
    }

    function end() {
      for (var key in options) {
        if (!options.hasOwnProperty(key)) {
          continue;
        }
        PAIRS.forEach(function (params) {
          var query = params.query;
          var replace = params.replace;
          var searchTerm = query[0] + key + query[1];
          var replaceTerm = replace[0] + options[key] + replace[1];
          var regex = new RegExp(searchTerm, 'g');
          source = source.replace(regex, replaceTerm);
        });
      }

      this.queue(source);
      this.queue(null);
    }

    return through(read, end);
  };
};
