var through = require('through');

const PAIRS = [
  // `require()`
  {
    query:   ['require[(]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
    replace: ['require($1$2', '$3$4']
  },

  // ` from ""`
  {
    query:   ['[\\s]from[\\s]([\'"])([^\'"]*)', '([^\'"]*)([\'"])'],
    replace: [' from $1$2', '$3$4',]
  },
];

module.exports = function(options) {
  options = options || {};

  return function(filename) {
    let source = '';

    function read(chunk) {
      source += chunk;
    }

    function end() {
      for (var key in options) {
        if (!options.hasOwnProperty(key)) {
          continue;
        }
        PAIRS.forEach((params) => {
          let query = params.query;
          let replace = params.replace;
          let searchTerm = query[0] + key + query[1];
          let replaceTerm = replace[0] + options[key] + replace[1];
          let regex = new RegExp(searchTerm, 'g');
          source = source.replace(regex, replaceTerm);
        });

      }

      this.queue(source);
      this.queue(null);
    }

    return through(read, end);
  }
};
