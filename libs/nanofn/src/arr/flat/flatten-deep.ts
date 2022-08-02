/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFlatten } from '../../_internal/base-flatten';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Recursively flattens `array`.
 *
 * @category Array
 * @param {Array} arr The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @see flatMap, flatMapDeep, flatMapDepth, flatten, flattenDepth
 * @example
 *
 * flattenDeep([1, [2, [3, [4]], 5]])
 * // => [1, 2, 3, 4, 5]
 */
export function flattenDeep(arr: any[]): any[] {
  const length = arr == null ? 0 : arr.length;
  return length ? _baseFlatten(arr, INFINITY) : [];
}


