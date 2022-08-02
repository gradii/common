/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getSymbolsIn } from './get-symbols-in';

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
export function _getAllKeysIn(object) {
  const result = [];
  for (const key in object) {
    result.push(key);
  }
  if (!Array.isArray(object)) {
    result.push(..._getSymbolsIn(object));
  }
  return result;
}


