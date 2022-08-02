/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
export function _setToArray(set: Set<any>): any[] {
  let index    = -1;
  const result = new Array(set.size);

  set.forEach((value) => {
    result[++index] = value;
  });
  return result;
}


