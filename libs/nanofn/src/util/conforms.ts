/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseClone } from '../_internal/base-clone';
import { _baseConforms } from '../_internal/base-conforms';

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1;

/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * **Note:** The created function is equivalent to `conformsTo` with
 * `source` partially applied.
 *
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * const objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ]
 *
 * filter(objects, conforms({ 'b': function(n) { return n > 1 } }))
 * // => [{ 'a': 1, 'b': 2 }]
 */
export function conforms(source) {
  return _baseConforms(_baseClone(source, CLONE_DEEP_FLAG));
}


