/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _arrayReduce } from '../_internal/array-reduce';
import { defaultTo } from './default-to';

/**
 * This method is like `defaultTo` except that it accepts multiple default values and returns the first one that is not
 * `NaN`, `null`, or `undefined`.
 *
 * @category Util
 * @param {*} value The value to check.
 * @param {...*} defaultValues The default values.
 * @returns {*} Returns the resolved value.
 * @see _.defaultTo
 * @example
 *
 * defaultToAny(1, 10, 20)
 * // => 1
 *
 * defaultToAny(undefined, 10, 20)
 * // => 10
 *
 * defaultToAny(undefined, null, 20)
 * // => 20
 *
 * defaultToAny(undefined, null, NaN)
 * // => NaN
 */
export function defaultToAny(value, ...defaultValues) {
  return _arrayReduce(defaultValues, defaultTo, value);
}


