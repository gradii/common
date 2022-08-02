/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFlatten } from '../../_internal/base-flatten';

/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep
 * @example
 *
 * const array = [1, [2, [3, [4]], 5]]
 *
 * flattenDepth(array, 1)
 * // => [1, 2, [3, [4]], 5]
 *
 * flattenDepth(array, 2)
 * // => [1, 2, 3, [4], 5]
 */
export function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }
  depth = depth === undefined ? 1 : +depth;
  return _baseFlatten(array, depth);
}


