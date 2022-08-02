/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isArguments } from '../is-arguments';

/** Built-in value reference. */
const spreadableSymbol = Symbol.isConcatSpreadable;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
export function _isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol]);
}


