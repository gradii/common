/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { SetCache } from './set-cache';
import { some } from '../some';
import { _cacheHas } from './cache-has';

/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG   = 1;
const COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
export function _equalArrays(array: any[],
                             other: any[],
                             bitmask: number,
                             customizer,
                             equalFunc,
                             stack) {
  const isPartial = bitmask & COMPARE_PARTIAL_FLAG;
  const arrLength = array.length;
  const othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  const stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  let index  = -1;
  let result = true;
  const seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache() : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    let compared;
    const arrValue = array[index];
    const othValue = other[index];

    if (customizer) {
      compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!some(other, (othValue, othIndex) => {
        if (!_cacheHas(seen, othIndex) &&
          (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(
      arrValue === othValue ||
      equalFunc(arrValue, othValue, bitmask, customizer, stack)
    )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}


