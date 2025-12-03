/**
 * It will return array of two arrays according to `predicate` function. The first member holds all instances of `input` that pass the `predicate` function, while the second member - those who doesn't.
 */
export function partition<T, S extends T>(
  predicate: (value: T, index: number, data: ReadonlyArray<T>) => value is S,
  data: ReadonlyArray<T>
): [Array<S>, Array<Exclude<T, S>>];
export function partition<T>(
  predicate: (value: T, index: number, data: ReadonlyArray<T>) => boolean,
  data: ReadonlyArray<T>
): [Array<T>, Array<T>];

export function partition(predicate, list) {
  const yes = [];
  const no = [];
  let counter = -1;

  while (counter++ < list.length - 1) {
    if (predicate(list[counter], counter)) {
      yes.push(list[counter]);
    } else {
      no.push(list[counter]);
    }
  }

  return [yes, no];
}
