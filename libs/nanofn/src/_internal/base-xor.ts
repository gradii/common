/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseDifference } from './base-difference';
import { _baseFlatten } from './base-flatten';
import { _baseUniq } from './base-uniq';

/**
 * The base implementation of methods like `xor` which accepts an array of
 * arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
export function _baseXor(arrays, iteratee, comparator) {
  const length = arrays.length;
  if (length < 2) {
    return length ? _baseUniq(arrays[0]) : [];
  }
  let index = -1;
  const result = new Array(length);

  while (++index < length) {
    const array = arrays[index];
    let othIndex = -1;

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = _baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
      }
    }
  }
  return _baseUniq(_baseFlatten(result, 1), iteratee, comparator);
}


