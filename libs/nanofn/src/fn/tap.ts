export function tap<T>(fn: (a: T) => void, x: T): T {
  fn(x);

  return x;
}
