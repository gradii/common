/* eslint-disable @typescript-eslint/ban-ts-comment */
export function _cloneRegExp(pattern: RegExp): RegExp {
  return new RegExp(pattern.source, (pattern.flags ?  pattern.flags : (pattern.global     ? 'g' : '') +
    (pattern.ignoreCase ? 'i' : '') +
    (pattern.multiline  ? 'm' : '') +
    (pattern.sticky     ? 'y' : '') +
    (pattern.unicode    ? 'u' : '') +
    // @ts-ignore
    (pattern.dotAll     ? 's' : '')));
}
