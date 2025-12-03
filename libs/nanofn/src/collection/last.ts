/**
 * It returns the last element of `input`, as the `input` can be either a string or an array. It returns `undefined` if array has length of 0.
 */
export function last<T extends readonly []>(list: T): undefined;
export function last<T extends readonly [any]>(list: T): T[0];
export function last<T extends readonly any[]>(list: T): T extends readonly [...any[], infer L] ? L : T[number] | undefined
export function last<T extends readonly [any, ...any[]]>(list: T): T[number]; // or better: infer last
export function last<T extends string>(str: T): T extends '' ? undefined : string;
export function last<T extends readonly any[]>(list: T): T[number] | undefined;
export function last<T extends ArrayLike<any>>(list: T): T extends { length: 0 } ? undefined : T[number];

export function last(listOrString: any) {
  if (!listOrString || listOrString.length === 0) {
    return undefined;
  }
  return listOrString[listOrString.length - 1];
}