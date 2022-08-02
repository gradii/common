/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _copyArray } from '../_internal/copy-array';
import { _getTag } from '../_internal/get-tag';
import { isArrayLike } from '../is/is-array-like';
import { isString } from '../is/is-string';
import { _iteratorToArray } from '../_internal/iterator-to-array';
import { _mapToArray } from '../_internal/map-to-array';
import { _setToArray } from '../_internal/set-to-array';
import { _stringToArray } from '../_internal/string-to-array';
import { values } from '../obj/values';

/** `Object#toString` result references. */
const mapTag = '[object Map]';
const setTag = '[object Set]';

/** Built-in value references. */
const symIterator = Symbol.iterator;

/**
 * Converts `value` to an array.
 *
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * toArray({ 'a': 1, 'b': 2 })
 * // => [1, 2]
 *
 * toArray('abc')
 * // => ['a', 'b', 'c']
 *
 * toArray(1)
 * // => []
 *
 * toArray(null)
 * // => []
 */
export function toArray(value: any): any[] {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? _stringToArray(value) : _copyArray(value);
  }
  if (symIterator && value[symIterator]) {
    return _iteratorToArray(value[symIterator]());
  }
  const tag  = _getTag(value);
  const func = tag == mapTag ? _mapToArray : (tag == setTag ? _setToArray : values);

  return func(value);
}


