/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _cloneArrayBuffer } from './clone-array-buffer';

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
export function _cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}


