export function _includes(x, list) {
  let index = -1;
  const { length } = list;

  while (++index < length) {
    if (String(list[index]) === String(x)) {
      return true;
    }
  }

  return false;
}

export function omit<T, K extends string | number>(
  propsToOmit: readonly K[],
  obj: T
): Omit<T, K> {
  if (!obj) {
    return undefined;
  }

  const propsToOmitValue = propsToOmit;
  const willReturn = {} as Omit<T, K>;

  for (const key in obj) {
    if (!_includes(key, propsToOmitValue)) {
      // @ts-expect-error ignore me
      willReturn[key] = obj[key];
    }
  }

  return willReturn;
}
