/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { _baseIsMatch } from './base-is-match';
import { _getMatchData } from './get-match-data';
import { _matchesStrictComparable } from './matches-strict-comparable';

/**
 * The base implementation of `matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
export function _baseMatches(source) {
  const matchData = _getMatchData(source);
  if (matchData.length === 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return (object) => object === source || _baseIsMatch(object, source, matchData);
}


