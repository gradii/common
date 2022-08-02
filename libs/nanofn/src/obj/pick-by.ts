/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { map } from '../arr/map';
import { _basePickBy } from '../_internal/base-pick-by';
import { _getAllKeysIn } from '../_internal/get-all-keys-in';

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * const object = { 'a': 1, 'b': '2', 'c': 3 }
 *
 * pickBy(object, isNumber)
 * // => { 'a': 1, 'c': 3 }
 */
export function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  const props = map(_getAllKeysIn(object), (prop) => [prop]);
  return _basePickBy(object, props, (value, path) => predicate(value, path[0]));
}


