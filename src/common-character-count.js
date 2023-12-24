const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const s1Chars = s1.split('');
  const s2Chars = s2.split('');
  const s1CharCount = {};
  const s2CharCount = {};
  let commonCount = 0;
  s1Chars.forEach((char) => {
    if (s1CharCount[char]) {
      s1CharCount[char]++;
    } else {
      s1CharCount[char] = 1;
    }
  });
  s2Chars.forEach((char) => {
    if (s2CharCount[char]) {
      s2CharCount[char]++;
    } else {
      s2CharCount[char] = 1;
    }
  });
  Object.keys(s1CharCount).forEach((char) => {
    if (s2CharCount[char]) {
      commonCount += Math.min(s1CharCount[char], s2CharCount[char]);
    }
  });
  return commonCount;
}

module.exports = {
  getCommonCharacterCount,
};
