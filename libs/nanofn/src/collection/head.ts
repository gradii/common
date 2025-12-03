/**
 * It returns the first element of list or string `input`. It returns `undefined` if array has length of 0.
 */
export function head<T>(listOrString: T): T extends [] ? undefined :
  T extends readonly [infer F, ...infer R] ? F :
    T extends readonly [infer F] ? F :
      T extends [infer F] ? F :
        T extends [infer F, ...infer R] ? F :
          T extends unknown[] ? T[number] :
            undefined {
  return listOrString[0];
}
