/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIndexOf } from './base-index-of';

/**
 * Used by `trim` and `trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
export function _charsEndIndex(strSymbols, chrSymbols) {
  let index = strSymbols.length;

  while (index-- && _baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}


