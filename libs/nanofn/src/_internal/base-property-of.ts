/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} obj The object to query.
 * @returns {Function} Returns the new accessor function.
 */
export function _basePropertyOf(obj: any): Function {
  return (key) => obj == null ? undefined : obj[key];
}


