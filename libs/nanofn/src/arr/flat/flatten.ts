/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFlatten } from '../../_internal/base-flatten';

/**
 * Flattens `array` a single level deep.
 *
 * @category Array
 * @param {Array} arr The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flattenDeep, flattenDepth
 * @example
 *
 * flatten([1, [2, [3, [4]], 5]])
 * // => [1, 2, [3, [4]], 5]
 */
export function flatten(arr: any[]): any[] {
  const length = arr == null ? 0 : arr.length;
  return length ? _baseFlatten(arr, 1) : [];
}


