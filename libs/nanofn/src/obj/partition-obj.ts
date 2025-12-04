/**
 * It returns an array containing two objects. The first object holds all properties of the input object for which the predicate returns true, while the second object holds those that do not.
 */
export function partitionObj<T, S extends T>(
  obj: Record<string, T>,
  predicate: (value: T, prop: string, obj: Record<string, T>) => value is S,
): [Record<string, S>, Record<string, Exclude<T, S>>];
export function partitionObj<T>(
  obj: Record<string, T>,
  predicate: (value: T, prop: string, obj: Record<string, T>) => boolean,
): [Record<string, T>, Record<string, T>];

export function partitionObj(
  obj: any,
  predicate: (value: any, prop: string, obj: Record<string, any>) => boolean,
): [Record<string, any>, Record<string, any>] {
  const yes: any = {};
  const no: any = {};
  Object.entries(obj).forEach(([prop, value]) => {
    if (predicate(value, prop, obj)) {
      yes[prop] = value;
    } else {
      no[prop] = value;
    }
  });

  return [yes, no];
}
