/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export function relativeError(calculated, correct) {
  if (typeof calculated == 'number' && typeof correct == 'number') {
    const diff = Math.abs(calculated - correct);
    return diff / correct;
  }

  return calculated.relativeError(correct);
}

export function absoluteError(calculated, correct) {
  if (typeof calculated == 'number' && typeof correct == 'number') {
    const diff = Math.abs(calculated - correct);
    return diff;
  }

  return calculated.absoluteError(correct);
}
