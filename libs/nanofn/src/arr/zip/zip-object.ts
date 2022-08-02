/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { assignValue } from './_internal/assign-value';
import { baseZipObject } from './_internal/base-zip-object';

/**
 * This method is like `fromPairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @see unzip, unzipWith, zip, zipObjectDeep, zipWith
 * @example
 *
 * zipObject(['a', 'b'], [1, 2])
 * // => { 'a': 1, 'b': 2 }
 */
export function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue);
}


