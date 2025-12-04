/**
 * It loops over each property of `obj` and returns a new object with only those properties that satisfy the `predicate`.
 */
declare const emptyObjectSymbol: unique symbol;
type EmptyObject = { [emptyObjectSymbol]?: never };

type ValuesOf<T> = T extends EmptyObject ? T[keyof T] : T extends Record<PropertyKey, infer V> ? V : never;

type EnumerableStringKeyedValueOf<T> = ValuesOf<{
  [K in keyof T]-?: K extends symbol ? never : T[K];
}>;

type EnumerableStringKeyOf<T> = Required<T> extends Record<infer K, unknown> ? `${Exclude<K, symbol>}` : never;

export function filterObj<T extends object, U extends T>(
  ojb: T,
  valueMapper: (value: EnumerableStringKeyedValueOf<T>, key: EnumerableStringKeyOf<T>, data: T) => boolean,
): U;

export function filterObj<T>(obj: T, predicate: (value: any, key: any, data: T) => boolean): any {
  const willReturn: any = {};

  for (const prop in obj) {
    if (predicate(obj[prop], prop, obj)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}
