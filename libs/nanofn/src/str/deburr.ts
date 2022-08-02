/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { deburrLetter } from '../_internal/deburr-letter';

/** Used to match Latin Unicode letters (excluding mathematical operators). */
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
const rsComboMarksRange           = '\\u0300-\\u036f';
const reComboHalfMarksRange       = '\\ufe20-\\ufe2f';
const rsComboSymbolsRange         = '\\u20d0-\\u20ff';
const rsComboMarksExtendedRange   = '\\u1ab0-\\u1aff';
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff';
const rsComboRange                =
        rsComboMarksRange +
        reComboHalfMarksRange +
        rsComboSymbolsRange +
        rsComboMarksExtendedRange +
        rsComboMarksSupplementRange;

/** Used to compose unicode capture groups. */
const rsCombo = `[${rsComboRange}]`;

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
const reComboMark = RegExp(rsCombo, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @category String
 * @param {string} [str=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * deburr('déjà vu')
 * // => 'deja vu'
 */
export function deburr(str: string): string {
  return str && str.replace(reLatin, deburrLetter).replace(reComboMark, '');
}
