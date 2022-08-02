/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _basePick } from '../_internal/base-pick';

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pick(object, ['a', 'c'])
 * // => { 'a': 1, 'c': 3 }
 */
export function pick(object, ...paths) {
  return object == null ? {} : _basePick(object, paths);
}


