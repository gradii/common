/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { isArguments } from './is-arguments';
import { isArrayLike } from './is-array-like';
import { isBuffer } from './is-buffer';
import { _isPrototype } from '../_internal/is-prototype';
import { isTypedArray } from './is-typed-array';

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * isEmpty(null)
 * // => true
 *
 * isEmpty(true)
 * // => true
 *
 * isEmpty(1)
 * // => true
 *
 * isEmpty([1, 2, 3])
 * // => false
 *
 * isEmpty('abc')
 * // => false
 *
 * isEmpty({ 'a': 1 })
 * // => false
 */
export function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) &&
    (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
      isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  const tag = _getTag(value);
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !value.size;
  }
  if (_isPrototype(value)) {
    return !Object.keys(value).length;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}


