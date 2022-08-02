/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from '../map';
import { _baseIndexOf } from './base-index-of';
import { _baseIndexOfWith } from './base-index-of-with';
import { _copyArray } from './copy-array';

/**
 * The base implementation of `pullAllBy`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 */
export function _basePullAll(array, values, iteratee, comparator) {
  const indexOf = comparator ? _baseIndexOfWith : _baseIndexOf;
  const length = values.length;

  let index = -1;
  let seen = array;

  if (array === values) {
    values = _copyArray(values);
  }
  if (iteratee) {
    seen = map(array, (value) => iteratee(value));
  }
  while (++index < length) {
    let fromIndex = 0;
    const value = values[index];
    const computed = iteratee ? iteratee(value) : value;

    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        seen.splice(fromIndex, 1);
      }
      array.splice(fromIndex, 1);
    }
  }
  return array;
}


