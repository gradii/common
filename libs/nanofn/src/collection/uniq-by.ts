/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @param list The array to consider.
 * @param fn A function used to produce a value to use during comparisons.
 * @return The list of unique items.
 * @example
 *
 *      uniqBy([-1, -5, 2, 10, 1, 2], Math.abs); //=> [-1, -5, 2, 10]
 */
export function uniqBy<T>(list: T[], fn: (value: T) => any): T[] {
  const set         = new Set();
  const result: T[] = [];
  let idx           = 0;
  let appliedItem, item;

  while (idx < list.length) {
    item        = list[idx];
    appliedItem = fn(item);
    if (!set.has(appliedItem)) {
      set.add(appliedItem);
      result.push(item);
    }
    idx += 1;
  }
  return result;
}
