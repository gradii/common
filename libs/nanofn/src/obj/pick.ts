export function pick<T, K extends string | number | symbol>(
  names: readonly K[],
  obj: T
): { [P in keyof T as P extends K ? P : never]: T[P] };

export function pick(names: any[], obj: any): any {
  if (obj == null) {
    return undefined;
  }
  const keys = names;
  const willReturn = {};
  let counter = 0;

  while (counter < keys.length) {
    if (keys[counter] in obj) {
      willReturn[keys[counter]] = obj[keys[counter]];
    }
    counter++;
  }

  return willReturn;
}
