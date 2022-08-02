/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { filter } from './filter';
import { map } from './map';
import { baseProperty } from './_internal/base-property';
import { isArrayLikeObject } from './is-array-like-object';

/**
 * This method is like `zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @see unzipWith, zip, zipObject, zipObjectDeep, zipWith
 * @example
 *
 * const zipped = zip(['a', 'b'], [1, 2], [true, false])
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * unzip(zipped)
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
export function unzip(array) {
  if (!(array != null && array.length)) {
    return [];
  }
  let length = 0;
  array = filter(array, (group) => {
    if (isArrayLikeObject(group)) {
      length = Math.max(group.length, length);
      return true;
    }
  });
  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = map(array, baseProperty(index));
  }
  return result;
}


