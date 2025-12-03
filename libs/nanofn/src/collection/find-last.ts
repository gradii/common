/**
 * It returns the last element of `list` satisfying the `predicate` function.
 *
 * If there is no such element, then `undefined` is returned.
 */
export function findLast<T>(
  predicate: (x: T) => boolean,
  list: T[]
): T | undefined {
  let index = list.length;

  while (--index >= 0) {
    if (predicate(list[index])) {
      return list[index];
    }
  }

  return undefined;
}
