/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
export function _getHolder(func) {
  const object = func;
  return object.placeholder;
}


