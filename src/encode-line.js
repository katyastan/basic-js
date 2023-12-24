const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (!str) {
    return '';
  }
  let encoded = '';
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    let currentChar = str[i];
    let nextChar = str[i + 1];

    if (currentChar === nextChar) {
      count++;
    } else {
      encoded += (count > 1 ? count : '') + currentChar;
      count = 1;
    }
  }
  return encoded;
}

module.exports = {
  encodeLine,
};
