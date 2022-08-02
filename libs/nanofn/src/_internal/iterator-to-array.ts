/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
export function _iteratorToArray(iterator) {
  let data;
  const result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}


