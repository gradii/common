/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param first The first list.
 * @param second The second list.
 * @param iteratee
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @example
 *
 *      differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor); //=> [3.1, 1.3]
 *      differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], ({x})=>x); //=> [{ 'x': 2 }]
 */
export function differenceBy(first: any[], second: any[], iteratee: (...args: any) => any): any[] {
  const out         = [];
  let idx           = 0;
  const firstLen    = first.length;
  const secondLen   = second.length;
  const toFilterOut = new Set();

  for (let i = 0; i < secondLen; i += 1) {
    toFilterOut.add(iteratee(second[i]));
  }

  while (idx < firstLen) {
    const firstValue = iteratee(first[idx]);
    if (!toFilterOut.has(firstValue)) {
      toFilterOut.add(firstValue);
      out[out.length] = first[idx];
    }
    idx += 1;
  }
  return out;
}
