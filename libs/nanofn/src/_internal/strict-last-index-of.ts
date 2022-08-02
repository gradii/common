/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * A specialized version of `lastIndexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
export function _strictLastIndexOf(array: any[], value: any, fromIndex: number): number {
  let index = fromIndex + 1;
  while (index--) {
    if (array[index] === value) {
      return index;
    }
  }
  return index;
}


