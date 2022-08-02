/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _customDefaultsMerge } from '../_internal/custom-defaults-merge';
import { mergeWith } from './merge-with';

/**
 * This method is like `defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see defaults
 * @example
 *
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } })
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
export function defaultsDeep(...args) {
  args.push(undefined, _customDefaultsMerge);
  return mergeWith.apply(undefined, args);
}


