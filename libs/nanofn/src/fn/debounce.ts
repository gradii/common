/**
 *
 */

/**
 *
 * @param func
 * @param timeout
 */

export function debounce(this: any, func: (...args: any) => unknown, timeout = 300) {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout) as unknown as number;
  };
}