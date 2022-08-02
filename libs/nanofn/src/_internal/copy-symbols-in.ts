/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _copyObject } from './copy-object';
import { _getSymbolsIn } from './get-symbols-in';

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
export function _copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}


