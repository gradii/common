/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { SetCache } from './-set-cache';
import { _arrayIncludes } from './array-includes';
import { _arrayIncludesWith } from './array-includes-with';
import { map } from '../map';
import { _cacheHas } from './cache-has';

/**
 * The base implementation of methods like `intersection` that accepts an
 * array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
export function _baseIntersection(arrays, iteratee, comparator) {
  const includes = comparator ? _arrayIncludesWith : _arrayIncludes;
  const length = arrays[0].length;
  const othLength = arrays.length;
  const caches = new Array(othLength);
  const result = [];

  let array;
  let maxLength = Infinity;
  let othIndex = othLength;

  while (othIndex--) {
    array = arrays[othIndex];
    if (othIndex && iteratee) {
      array = map(array, (value) => iteratee(value));
    }
    maxLength = Math.min(array.length, maxLength);
    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
      ? new SetCache(othIndex && array)
      : undefined;
  }
  array = arrays[0];

  let index = -1;
  const seen = caches[0];

  outer:
  while (++index < length && result.length < maxLength) {
    let value = array[index];
    const computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (!(seen
      ? _cacheHas(seen, computed)
      : includes(result, computed, comparator)
    )) {
      othIndex = othLength;
      while (--othIndex) {
        const cache = caches[othIndex];
        if (!(cache
          ? _cacheHas(cache, computed)
          : includes(arrays[othIndex], computed, comparator))
        ) {
          continue outer;
        }
      }
      if (seen) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}


