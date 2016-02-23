'use strict';

var PAIRS = [
  // `require(""`
  {
    query: ['require[(]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
    replace: ['require($1$2', '$3$4']
  },

  // ` from ""`
  {
    query: ['[\\s]from[\\s]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
    replace: [' from $1$2', '$3$4']
  },

  // `import "";`
  {
    query: ['import[\\s]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
    replace: ['import $1$2', '$3$4']
  }
];

module.exports = function (options) {
  options = options || {};

  return function(source) {
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

    return source;
  };
};
