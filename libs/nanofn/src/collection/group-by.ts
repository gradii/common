import { getter } from '../obj/getter';

/**
 * Splits a list into sublists stored in an object, based on the result of
 * calling a String-returning function
 * on each element, and grouping the results according to values returned.
 *
 * @param list
 * @param fn
 */
export function groupBy<T>(
  list: T[],
  fn: ((value: T) => string | number) | string
) {
  let _getter = fn;
  if (typeof fn === 'string') {
    _getter = (it: any) => getter(it, fn as string);
  }
  return list.reduce((acc: Record<string | number, T[]>, obj: T) => {
    const property = (_getter as (value: T) => string | number)(obj);
    acc[property]  = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {} as Record<string | number, T[]>);
}