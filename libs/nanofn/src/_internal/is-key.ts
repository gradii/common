/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isSymbol } from '../is/is-symbol';


/** Used to match property names within property paths. */
const reIsDeepProp  = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
export function _isKey(value: any, object: any): boolean {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === 'number' || type === 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}


