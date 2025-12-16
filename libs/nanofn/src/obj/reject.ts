
declare const emptyObjectSymbol: unique symbol;
type EmptyObject = {[emptyObjectSymbol]?: never};
type EnumerableStringKeyOf<T> =
  Required<T> extends Record<infer K, unknown>
    ? `${Exclude<K, symbol>}`
    : never;
type ValuesOf<T> =
  T extends EmptyObject
    ? T[keyof T]
    : T extends Record<PropertyKey, infer V>
      ? V
      : never;

type EnumerableStringKeyedValueOf<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never : T[K];
}>;

/**
 * Same as `R.filterObject` but it returns the object with properties that do not satisfy the predicate function.
 */
export function reject<T extends object, U extends T>(
  obj: T,
  predicate: (
    value: EnumerableStringKeyedValueOf<T>,
    key: EnumerableStringKeyOf<T>,
    data: T
  ) => boolean
): U {
  const willReturn: any = {};

  for (const prop in obj) {
    if (!predicate(obj[prop] as any, prop as any, obj)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}
