/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { isError } from '../is/is-error';

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * const elements = attempt(selector =>
 *   document.querySelectorAll(selector), '>_>')
 *
 * if (isError(elements)) {
 *   elements = []
 * }
 */
export function attempt(func, ...args) {
  try {
    return func(...args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
}


