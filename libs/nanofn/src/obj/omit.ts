export function _includes<T, K extends string | number>(list: readonly T[], x: K): boolean;
export function _includes<T, K extends string | number>(list: T[], x: K): boolean;
export function _includes<T, K extends string | number>(list: T[] | readonly T[], x: K): boolean {
  let index = -1;
  const { length } = list;

  while (++index < length) {
    if (String(list[index]) === String(x)) {
      return true;
    }
  }

  return false;
}

export function omit<T, K extends string | number>(obj: T, propsToOmit: readonly K[]): Omit<T, K> {
  if (!obj) {
    return undefined;
  }

  const propsToOmitValue = propsToOmit;
  const willReturn = {} as Omit<T, K>;

  for (const key in obj) {
    if (!_includes(propsToOmitValue, key)) {
      // @ts-expect-error ignore me
      willReturn[key] = obj[key];
    }
  }

  return willReturn;
}
