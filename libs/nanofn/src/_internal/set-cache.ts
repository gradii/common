/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { MapCache } from './map-cache';

/** Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = '__lodash_hash_undefined__';

export interface SetCache {
  push(value: any): void;
}

export class SetCache {
  private _data: MapCache;

  /**
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  constructor(values?: any[]) {
    let index    = -1;
    const length = values == null ? 0 : values.length;

    this._data = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  add(value: any): SetCache {
    this._data.set(value, HASH_UNDEFINED);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {boolean} Returns `true` if `value` is found, else `false`.
   */
  has(value: any): boolean {
    return this._data.has(value);
  }
}

SetCache.prototype.push = SetCache.prototype.add;
