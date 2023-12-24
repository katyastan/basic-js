const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  const controlActions = {
    '--discard-next': (result, i, arr, usedIndices) => {
      if (i + 1 < arr.length) {
        usedIndices[i + 1] = true;
      }
    },
    '--discard-prev': (result, i) => {
      if (i > 0 && !usedIndices[i - 1]) {
        result.pop();
      }
    },
    '--double-next': (result, i, arr) => {
      if (i + 1 < arr.length) {
        result.push(arr[i + 1]);
      }
    },
    '--double-prev': (result, i, arr, usedIndices) => {
      if (i > 0 && !usedIndices[i - 1]) {
        result.push(arr[i - 1]);
      }
    },
  };

  let usedIndices = {};
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (usedIndices[i]) continue;
    if (arr[i] in controlActions) {
      controlActions[arr[i]](result, i, arr, usedIndices);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

module.exports = {
  transform,
};
