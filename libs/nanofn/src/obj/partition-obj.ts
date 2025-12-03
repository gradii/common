/**
 * It returns an array containing two objects. The first object holds all properties of the input object for which the predicate returns true, while the second object holds those that do not.
 */
export function partitionObj<T, S extends T>(
  predicate: (value: T, prop: string, obj: Record<string, T>) => value is S,
  obj: Record<string, T>
): [Record<string, S>, Record<string, Exclude<T, S>>];
export function partitionObj<T>(
  predicate: (value: T, prop: string, obj: Record<string, T>) => boolean,
  obj: Record<string, T>
): [Record<string, T>, Record<string, T>];

export function partitionObj(predicate, obj) {
  const yes = {};
  const no = {};
  Object.entries(obj).forEach(([prop, value]) => {
    if (predicate(value, prop)) {
      yes[prop] = value;
    } else {
      no[prop] = value;
    }
  });

  return [yes, no];
}
