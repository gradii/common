/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { baseSet } from './_internal/base-set';
import { baseZipObject } from './_internal/base-zip-object';

/**
 * This method is like `zipObject` except that it supports property paths.
 *
 * @category Array
 * @param {Array} [props=[]] The property identifiers.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @see unzip, unzipWith, zip, zipObject, zipWith
 * @example
 *
 * zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2])
 * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
 */
export function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet);
}


