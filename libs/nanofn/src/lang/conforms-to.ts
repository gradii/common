/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseConformsTo } from '../_internal/base-conforms-to';
import { keys } from './keys';

/**
 * Checks if `object` conforms to `source` by invoking the predicate
 * properties of `source` with the corresponding property values of `object`.
 *
 * **Note:** This method is equivalent to `conforms` when `source` is
 * partially applied.
 *
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns `true` if `object` conforms, else `false`.
 * @example
 *
 * const object = { 'a': 1, 'b': 2 }
 *
 * conformsTo(object, { 'b': function(n) { return n > 1 } })
 * // => true
 *
 * conformsTo(object, { 'b': function(n) { return n > 2 } })
 * // => false
 */
export function conformsTo(object, source) {
  return source == null || _baseConformsTo(object, source, keys(source));
}


