
export function tap<T>(x: T, fn: (a: T) => void): T {
  fn(x);

  return x;
}
