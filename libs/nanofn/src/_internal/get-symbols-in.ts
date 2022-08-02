/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getSymbols } from './get-symbols';

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
export function _getSymbolsIn(object) {
  const result = [];
  while (object) {
    result.push(..._getSymbols(object));
    object = Object.getPrototypeOf(Object(object));
  }
  return result;
}


