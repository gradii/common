/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { eq } from '../lang/eq';
import { _baseAssignValue } from './base-assign-value';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export function _assignValue(object: any, key: string | symbol, value: any) {
  const objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      _baseAssignValue(object, key, value);
    }
  } else if (value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}


