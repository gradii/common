/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIndexOf } from './base-index-of';

/**
 * A specialized version of `includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
export function _arrayIncludes(array: any[], value: any): boolean {
  const length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}


