/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param list1 The first list.
 * @param list2 The second list.
 * @param predicate
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @example
 *
 *      var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 *      var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 *      intersectionWith(objects, others, (a, b)=> a.x === b.x && a.y === b.y);
 *      // => [{ 'x': 1, 'y': 2 }]
 */
export function intersectionWith<T, K, R = any>(list1: T[], list2: K[], predicate: (a: T, b: K) => boolean): R[] {
  return list2.filter((value2) => {
      return list1.some((value1) => predicate(value1, value2));
    }
  ) as unknown as R[];
}
