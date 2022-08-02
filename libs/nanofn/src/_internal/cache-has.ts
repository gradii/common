/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
export function _cacheHas(cache: Record<string, any>, key: string): boolean {
  return cache.has(key);
}


