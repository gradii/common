/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseSet } from '../_internal/base-set';

/**
 * This method is like `set` except that it accepts `customizer` which is
 * invoked to produce the objects of `path`. If `customizer` returns `undefined`
 * path creation is handled by the method instead. The `customizer` is invoked
 * with three arguments: (nsValue, key, nsObject).
 *
 * **Note:** This method mutates `object`.
 *
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * const object = {}
 *
 * setWith(object, '[0][1]', 'a', Object)
 * // => { '0': { '1': 'a' } }
 */
export function setWith(object, path, value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined;
  return object == null ? object : _baseSet(object, path, value, customizer);
}


