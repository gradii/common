/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/** Used to generate unique IDs. */
const idCounter: Record<string, any> = {};

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @see random
 * @example
 *
 * uniqueId('contact_')
 * // => 'contact_104'
 *
 * uniqueId()
 * // => '105'
 */
export function uniqueId(prefix = '$$narafun$$') {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  const id = ++idCounter[prefix];
  if (prefix === '$$narafun$$') {
    return `${id}`;
  }

  return `${prefix}${id}`;
}


