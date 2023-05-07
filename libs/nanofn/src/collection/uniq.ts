/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @sig (a -> b) -> [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      uniqBy([-1, -5, 2, 10, 1, 2], Math.abs); //=> [-1, -5, 2, 10]
 */
export function uniq<T>(list: T[]): T[] {
  const set         = new Set();
  const result: T[] = [];
  let idx           = 0;

  while (idx < list.length) {
    const item = list[idx];
    if (!set.has(item)) {
      set.add(item);
      result.push(item);
    }
    idx += 1;
  }
  return result;
}
