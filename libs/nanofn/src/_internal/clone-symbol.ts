/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/** Used to convert symbols to primitives and strings. */
const symbolValueOf = Symbol.prototype.valueOf;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
export function _cloneSymbol(symbol) {
  return Object(symbolValueOf.call(symbol));
}


