/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * The base implementation of `property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
export function _baseProperty(key) {
  return (object) => object == null ? undefined : object[key];
}


