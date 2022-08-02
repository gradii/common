/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { SetCache } from './set-cache';
import { _arrayIncludes } from './array-includes';
import { _arrayIncludesWith } from './array-includes-with';
import { _cacheHas } from './cache-has';
import { createSet } from './create-set';
import { _setToArray } from './set-to-array';

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `uniqBy`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
export function _baseUniq(array: any[],
                          iteratee: (value: any) => any,
                          comparator?: (value: any, other: any) => boolean): any[] {
  let index         = -1;
  let includes: any = _arrayIncludes;
  let isCommon      = true;

  const {length}             = array;
  const result: any[]        = [];
  let seen: any[] | SetCache = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  } else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSet(array);
    if (set) {
      return _setToArray(set);
    }
    isCommon = false;
    includes = _cacheHas;
    seen     = new SetCache();
  } else {
    seen = iteratee ? [] : result;
  }

  outer:
    while (++index < length) {
      let value      = array[index];
      const computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (isCommon && computed === computed) {
        let seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
  return result;
}


