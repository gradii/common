/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseGet } from './base-get';

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
export function _basePropertyDeep(path) {
  return (object) => _baseGet(object, path);
}


