/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
export function _addSetEntry(set: Set<any>, value: any) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}


