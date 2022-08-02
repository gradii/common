/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { eq } from '../lang/eq';
import { _baseAssignValue } from './base-assign-value';

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
export function _assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
    (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}


