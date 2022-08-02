/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseAt } from '../_internal/base-at';
import { _baseFlatten } from '../_internal/base-flatten';

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Array} Returns the picked values.
 * @example
 *
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 *
 * at(object, ['a[0].b.c', 'a[1]'])
 * // => [3, 4]
 */
export const at = (object, ...paths) => _baseAt(object, _baseFlatten(paths, 1));
