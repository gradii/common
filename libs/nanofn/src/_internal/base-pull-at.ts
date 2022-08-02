/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseUnset } from './base-unset';
import { _isIndex } from './is-index';

/**
 * The base implementation of `pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
export function _basePullAt(array, indexes) {
  let length = array ? indexes.length : 0;
  const lastIndex = length - 1;

  while (length--) {
    let previous;
    const index = indexes[length];
    if (length === lastIndex || index !== previous) {
      previous = index;
      if (_isIndex(index)) {
        array.splice(index, 1);
      } else {
        _baseUnset(array, index);
      }
    }
  }
  return array;
}


