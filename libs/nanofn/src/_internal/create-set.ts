/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _setToArray } from './set-to-array';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
export const createSet = (Set && (1 / _setToArray(new Set([, -0]))[1]) == INFINITY)
  ? (values) => new Set(values)
  : () => {};
