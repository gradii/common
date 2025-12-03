/**
 * It loops over each property of `obj` and returns a new object with only those properties that satisfy the `predicate`.
 */
declare const emptyObjectSymbol: unique symbol;
type EmptyObject = {[emptyObjectSymbol]?: never};

type ValuesOf<T> =
  T extends EmptyObject
    ? T[keyof T]
    : T extends Record<PropertyKey, infer V>
      ? V
      : never;

type EnumerableStringKeyedValueOf<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never : T[K];
}>;

type EnumerableStringKeyOf<T> =
  Required<T> extends Record<infer K, unknown>
    ? `${Exclude<K, symbol>}`
    : never;

export function filterObj<T extends object, U extends T>(
  valueMapper: (
    value: EnumerableStringKeyedValueOf<T>,
    key: EnumerableStringKeyOf<T>,
    data: T,
  ) => boolean,
  ojb: T
): U;

export function filterObj(predicate, obj) {
  const willReturn = {};

  for (const prop in obj) {
    if (predicate(obj[prop], prop, obj)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}
