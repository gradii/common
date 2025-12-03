/**
 * It returns list of the values of `property` taken from the all objects inside `list`.
 * Basically, this is `R.map(R.prop(property))`.
 */
export function pluck<K extends keyof T, T>(p: K, list: readonly T[]): Array<T[K]>;
export function pluck<T>(p: number, list: ReadonlyArray<{ [k: number]: T }>): T[];

export function pluck<T, >(property: string | number, list: T[] | ReadonlyArray<{ [k: number]: T }>) {
  const willReturn = [];

  list.forEach(x => {
    if (x[property] !== undefined) {
      willReturn.push(x[property]);
    }
  });

  return willReturn;
}


/**
 * It returns list of the values of `property` taken from the all objects inside `list`.
 * Basically, this is `R.map(R.prop(property))`.
 */
export function pluckLazy<T, K extends keyof T>(property: K): (list: T[]) => T[K][];
export function pluckLazy<K extends PropertyKey>(prop: K): {
  <U extends O[keyof O], UK extends keyof U, O extends Record<string, any>>(obj: K extends UK ? O : never): { [OK in keyof O]: O[OK][K] };
  <U extends readonly unknown[] | Record<K, any>>(list: readonly U[]): U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
};

export function pluckLazy(property: any): (list: any) => any[] {
  return list => {
    const willReturn = [];

    list.forEach(x => {
      if (x[property] !== undefined) {
        willReturn.push(x[property]);
      }
    });

    return willReturn;
  };
}
