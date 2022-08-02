/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { keys } from '../obj/keys';
import { _getSymbols } from './get-symbols';

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function _getAllKeys(object) {
  const result = keys(object);
  if (!Array.isArray(object)) {
    result.push(..._getSymbols(object));
  }
  return result;
}


