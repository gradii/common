/**
 * It returns list of the values of `property` taken from the all objects inside `list`.
 * Basically, this is `R.map(R.prop(property))`.
 */
export function pluck<K extends keyof T, T>(list: readonly T[], p: K): Array<T[K]>;
export function pluck<T>(list: ReadonlyArray<{ [k: number]: T }>, p: number): T[];

export function pluck<T>(list: T[] | ReadonlyArray<{ [p: number]: T }>, property: string | number) {
  const willReturn: any[] = [];

  list.forEach((x: any) => {
    if (x[property] !== undefined) {
      willReturn.push(x[property]);
    }
  });

  return willReturn;
}
