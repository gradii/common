/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { eq } from '../lang/eq';


/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
export function _assocIndexOf(array: any[], key: any): number {
  let {length} = array;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}


