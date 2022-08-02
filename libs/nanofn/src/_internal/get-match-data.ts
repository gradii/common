/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { keys } from '../obj/keys';
import { _isStrictComparable } from './is-strict-comparable';

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
export function _getMatchData(object: any): any[] {
  const result: any[] = keys(object);
  let length          = result.length;

  while (length--) {
    const key      = result[length];
    const value    = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}


