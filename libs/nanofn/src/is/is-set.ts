/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { nodeTypes } from '../_internal/node-types';
import { isObjectLike } from './is-object-like';

/* Node.js helper references. */
const nodeIsSet = nodeTypes && nodeTypes.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * isSet(new Set)
 * // => true
 *
 * isSet(new WeakSet)
 * // => false
 */
export const isSet = nodeIsSet
  ? (value) => nodeIsSet(value)
  : (value) => isObjectLike(value) && _getTag(value) == '[object Set]';
