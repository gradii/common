/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _getTag } from '../_internal/get-tag';
import { nodeTypes } from '../_internal/node-types';
import { isObjectLike } from './is-object-like';

/* Node.js helper references. */
const nodeIsDate = nodeTypes && nodeTypes.isDate;

/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
export const isDate = nodeIsDate
  ? (value) => nodeIsDate(value)
  : (value) => isObjectLike(value) && _getTag(value) == '[object Date]';
