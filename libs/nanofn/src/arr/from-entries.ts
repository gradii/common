/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The inverse of `entries`is method returns an object composed
 * from key-value `pairs`.
 *
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * fromEntries([['a', 1], ['b', 2]])
 * // => { 'a': 1, 'b': 2 }
 */
export function fromEntries(pairs) {
  const result = {};
  if (pairs == null) {
    return result;
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1];
  }
  return result;
}


