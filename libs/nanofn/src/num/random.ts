/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */
export function random(): number;
export function random(max: number): number;
export function random(
  lower?: number,
  upper?: number,
) {
  if (lower == undefined) {
    return Math.random();
  }
  if (!upper) {
    upper = lower;
    lower = 0;
  }
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}


