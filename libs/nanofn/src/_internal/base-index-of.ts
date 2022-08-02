/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseFindIndex } from './base-find-index';
import { _baseIsNaN } from './base-is-nan';
import { _strictIndexOf } from './strict-index-of';

/**
 * The base implementation of `indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
export function _baseIndexOf(array: any[], value: any, fromIndex: number): number {
  return value === value
    ? _strictIndexOf(array, value, fromIndex)
    : _baseFindIndex(array, _baseIsNaN, fromIndex);
}


