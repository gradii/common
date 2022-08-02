/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { isObjectLike } from './is-object-like';
import { nodeTypes } from '../_internal/node-types';

/* Node.js helper references. */
const nodeIsMap = nodeTypes && nodeTypes.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
export const isMap = nodeIsMap
  ? (value) => nodeIsMap(value)
  : (value) => isObjectLike(value) && _getTag(value) == '[object Map]';
