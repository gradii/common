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

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `difference` without support
 * for excluding multiple arrays.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
export function _baseDifference(array, values, iteratee, comparator) {
  let includes = _arrayIncludes;
  let isCommon = true;
  const result = [];
  const valuesLength = values.length;

  if (!array.length) {
    return result;
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value));
  }
  if (comparator) {
    includes = _arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = _cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    } else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}


