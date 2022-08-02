/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isArrayLikeObject } from '../is-array-like-object';

/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
export function _castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}


