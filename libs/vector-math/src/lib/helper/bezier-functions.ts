import { Vector2 } from '../vector2';
import { binomialCoefficients, cValues, tValues } from './bezier-values';

// four points
export function cubicPoint(points: Vector2[], t: number): Vector2 {
  const x =
          (1 - t) * (1 - t) * (1 - t) * points[0].x +
          3 * (1 - t) * (1 - t) * t * points[1].x +
          3 * (1 - t) * t * t * points[2].x +
          t * t * t * points[3].x;
  const y =
          (1 - t) * (1 - t) * (1 - t) * points[0].y +
          3 * (1 - t) * (1 - t) * t * points[1].y +
          3 * (1 - t) * t * t * points[2].y +
          t * t * t * points[3].y;

  return new Vector2(x, y);
}

export function cubicDerivative(points: Vector2[], t: number) {
  return quadraticPoint(
    [
      new Vector2(
        3 * (points[1].x - points[0].x),
        3 * (points[1].y - points[0].y),
      ),
      new Vector2(
        3 * (points[2].x - points[1].x),
        3 * (points[2].y - points[1].y)
      ),
      new Vector2(
        3 * (points[3].x - points[2].x),
        3 * (points[3].y - points[2].y)
      ),
    ],
    t
  );
}

export function getCubicArcLength(points: Vector2[], t: number) {
  let z: number;
  let sum: number;
  let correctedT: number;

  /*if (xs.length >= tValues.length) {
        throw new Error('too high n bezier');
      }*/

  const n = 20;

  z   = t / 2;
  sum = 0;
  for (let i = 0; i < n; i++) {
    correctedT = z * tValues[n][i] + z;
    sum += cValues[n][i] * BFunc(points, correctedT);
  }
  return z * sum;
}

export function quadraticPoint(points: Vector2[], t: number): Vector2 {
  const x = (1 - t) * (1 - t) * points[0].x + 2 * (1 - t) * t * points[1].x + t * t * points[2].x;
  const y = (1 - t) * (1 - t) * points[0].y + 2 * (1 - t) * t * points[1].y + t * t * points[2].y;
  return new Vector2(x, y);
}

export function getQuadraticArcLength(points: Vector2[], t: number): number {
  if (t === undefined) {
    t = 1;
  }
  const ax = points[0].x - 2 * points[1].x + points[2].x;
  const ay = points[0].y - 2 * points[1].y + points[2].y;
  const bx = 2 * points[1].x - 2 * points[0].x;
  const by = 2 * points[1].y - 2 * points[0].y;

  const A = 4 * (ax * ax + ay * ay);
  const B = 4 * (ax * bx + ay * by);
  const C = bx * bx + by * by;

  if (A === 0) {
    return (
      t * Math.sqrt(Math.pow(points[2].x - points[0].x, 2) + Math.pow(points[2].y - points[0].y, 2))
    );
  }
  const b = B / (2 * A);
  const c = C / A;
  const u = t + b;
  const k = c - b * b;

  const uuk  = u * u + k > 0 ? Math.sqrt(u * u + k) : 0;
  const bbk  = b * b + k > 0 ? Math.sqrt(b * b + k) : 0;
  const term =
          b + Math.sqrt(b * b + k) !== 0
            ? k * Math.log(Math.abs((u + uuk) / (b + bbk)))
            : 0;

  return (Math.sqrt(A) / 2) * (u * uuk - b * bbk + term);
}

export function quadraticDerivative(points: Vector2[], t: number) {
  return new Vector2(
    (1 - t) * 2 * (points[1].x - points[0].x) + t * 2 * (points[2].x - points[1].x),
    (1 - t) * 2 * (points[1].y - points[0].y) + t * 2 * (points[2].y - points[1].y),
  );
}

function BFunc(points: Vector2[], t: number) {
  const xbase    = getDerivative(1, t, points.map(it => it.x));
  const ybase    = getDerivative(1, t, points.map(it => it.y));
  const combined = xbase * xbase + ybase * ybase;
  return Math.sqrt(combined);
}

/**
 * Compute the curve derivative (hodograph) at t.
 */
const getDerivative = (derivative: number, t: number, vs: number[]): number => {
  // the derivative of any 't'-less function is zero.
  const n = vs.length - 1;
  let _vs;
  let value;

  if (n === 0) {
    return 0;
  }

  // direct values? compute!
  if (derivative === 0) {
    value = 0;
    for (let k = 0; k <= n; k++) {
      value +=
        binomialCoefficients[n][k] *
        Math.pow(1 - t, n - k) *
        Math.pow(t, k) *
        vs[k];
    }
    return value;
  } else {
    // Still some derivative? go down one order, then try
    // for the lower order curve's.
    _vs = new Array(n);
    for (let k = 0; k < n; k++) {
      _vs[k] = n * (vs[k + 1] - vs[k]);
    }
    return getDerivative(derivative - 1, t, _vs);
  }
};

export const t2length = (
  length: number,
  totalLength: number,
  func: (t: number) => number
): number => {
  let error = 1;
  let t     = length / totalLength;
  let step  = (length - func(t)) / totalLength;

  let numIterations = 0;
  while (error > 0.001) {
    const increasedTLength = func(t + step);
    const increasedTError  = Math.abs(length - increasedTLength) / totalLength;
    if (increasedTError < error) {
      error = increasedTError;
      t += step;
    } else {
      const decreasedTLength = func(t - step);
      const decreasedTError  = Math.abs(length - decreasedTLength) / totalLength;
      if (decreasedTError < error) {
        error = decreasedTError;
        t -= step;
      } else {
        step /= 2;
      }
    }

    numIterations++;
    if (numIterations > 500) {
      break;
    }
  }

  return t;
};
