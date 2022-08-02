/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/** Used to match `RegExp` flags from their coerced string values. */
const reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
export function _cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}


