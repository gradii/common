/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar  = /\\(\\)?/g;
const rePropName    = RegExp(
  // Match anything that isn't a dot or bracket.
  '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  '\\[(?:' +
  // Match a non-string expression.
  '([^"\'][^[]*)' + '|' +
  // Or match strings (supports escaping characters).
  '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]' + '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
  , 'g');

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} str The string to convert.
 * @returns {Array} Returns the property path array.
 */
export function stringToPath(str: string): string[] {
  const result = [];
  if (str.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }
  str.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
    return '';
  });
  return result;
}
