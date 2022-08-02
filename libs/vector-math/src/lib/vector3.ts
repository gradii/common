/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


import { clamp, EPSILON } from './common';
import { Vector2 } from './vector2';

export class Vector3 {
  public static up      = new Vector3([0, 1, 0]);
  public static right   = new Vector3([1, 0, 0]);
  public static forward = new Vector3([0, 0, 1]);

  private values = new Float32Array(3);

  constructor(values?: number[]);

  constructor(x: number, y: number, z: number);

  constructor(x?: number | number[], y?: number, z?: number) {
    if (arguments.length === 1) {
      if (x) {
        this.values[0] = (x as number[])[0];
        this.values[1] = (x as number[])[1];
        this.values[2] = (x as number[])[2];
      }
    } else if (arguments.length === 3) {
      this.values[0] = x as number;
      this.values[1] = y as number;
      this.values[2] = z as number;
    } else {
      this.values[0] = 0;
      this.values[1] = 0;
      this.values[2] = 0;
    }
  }

  get x(): number {
    return this.values[0];
  }

  set x(value: number) {
    this.values[0] = value;
  }

  get y(): number {
    return this.values[1];
  }

  set y(value: number) {
    this.values[1] = value;
  }

  get z(): number {
    return this.values[2];
  }

  set z(value: number) {
    this.values[2] = value;
  }

  get xy(): Vector2 {
    return new Vector2(
      this.values[0],
      this.values[1]
    );
  }

  set xy(v: Vector2) {
    this.values[0] = v.x;
    this.values[1] = v.y;
  }

  get xyz(): Vector3 {
    return new Vector3(
      this.values[0],
      this.values[1],
      this.values[2]
    );
  }

  set xyz(v: Vector3) {
    this.values[0] = v.values[0];
    this.values[1] = v.values[1];
    this.values[2] = v.values[2];
  }

  public get length(): number {
    return Math.sqrt(this.squaredLength);
  }

  public get squaredLength(): number {
    const x = this.values[0],
          y = this.values[1],
          z = this.values[2];

    return (x * x + y * y + z * z);
  }

  public static dot(vector: Vector3, vector2: Vector3): number {
    const x = vector.values[0],
          y = vector.values[1],
          z = vector.values[2];

    const x2 = vector2.x,
          y2 = vector2.y,
          z2 = vector2.z;

    return (x * x2 + y * y2 + z * z2);
  }

  public static direction(vector: Vector3, vector2: Vector3, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    const x = vector.values[0] - vector2.x,
          y = vector.values[1] - vector2.y,
          z = vector.values[2] - vector2.z;

    let length = Math.sqrt(x * x + y * y + z * z);

    if (length === 0) {
      dest.values[0] = 0;
      dest.values[1] = 0;
      dest.values[2] = 0;

      return dest;
    }

    length = 1 / length;

    dest.values[0] = x * length;
    dest.values[1] = y * length;
    dest.values[2] = z * length;

    return dest;
  }

  /// Set the values of [result] to the minimum of [a] and [b] for each line.
  public static min(a: Vector3, b: Vector3, result: Vector3) {
    result.setValues(
      Math.min(a.x, b.x),
      Math.min(a.y, b.y),
      Math.min(a.z, b.z)
    );
  }

  /// Set the values of [result] to the maximum of [a] and [b] for each line.
  public static max(a: Vector3, b: Vector3, result: Vector3) {
    result.setValues(
      Math.max(a.x, b.x),
      Math.max(a.y, b.y),
      Math.max(a.z, b.z)
    );
  }

  public static mix(vector: Vector3, vector2: Vector3, time: number,
                    dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    dest.values[0] = vector.values[0] + time * (vector2.x - vector.values[0]);
    dest.values[1] = vector.values[1] + time * (vector2.y - vector.values[1]);
    dest.values[2] = vector.values[2] + time * (vector2.z - vector.values[2]);

    return dest;
  }

  public static sum(vector: Vector3, vector2: Vector3, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    dest.values[0] = vector.values[0] + vector2.x;
    dest.values[1] = vector.values[1] + vector2.y;
    dest.values[2] = vector.values[2] + vector2.z;

    return dest;
  }

  public static difference(vector: Vector3, vector2: Vector3, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    dest.values[0] = vector.values[0] - vector2.x;
    dest.values[1] = vector.values[1] - vector2.y;
    dest.values[2] = vector.values[2] - vector2.z;

    return dest;
  }

  public static product(vector: Vector3, vector2: Vector3, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    dest.values[0] = vector.values[0] * vector2.x;
    dest.values[1] = vector.values[1] * vector2.y;
    dest.values[2] = vector.values[2] * vector2.z;

    return dest;
  }

  public static quotient(vector: Vector3, vector2: Vector3, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = new Vector3();
    }

    dest.values[0] = vector.values[0] / vector2.x;
    dest.values[1] = vector.values[1] / vector2.y;
    dest.values[2] = vector.values[2] / vector2.z;

    return dest;
  }

  public static zero() {
    return new Vector3(0, 0, 0);
  }

  public at(index: number): number {
    return this.values[index];
  }

  public reset(): void {
    this.values[0] = 0;
    this.values[1] = 0;
    this.values[2] = 0;
  }

  public copy(dest: Vector3): Vector3 {
    dest.values[0] = this.values[0];
    dest.values[1] = this.values[1];
    dest.values[2] = this.values[2];

    return dest;
  }

  public setFrom(v: Vector3) {
    this.values[0] = v.values[0];
    this.values[1] = v.values[1];
    this.values[2] = v.values[2];

    return this;
  }

  public setValues(x: number, y: number, z: number) {
    this.values[0] = x;
    this.values[1] = y;
    this.values[2] = z;
    return this;
  }

  public splat(arg: number) {
    this.values[0] = arg;
    this.values[1] = arg;
    this.values[2] = arg;
    return this;
  }

  public negate(dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = this;
    }

    dest.values[0] = -this.values[0];
    dest.values[1] = -this.values[1];
    dest.values[2] = -this.values[2];

    return dest;
  }

  public equals(vector: Vector3, threshold = EPSILON): boolean {
    if (Math.abs(this.values[0] - vector.values[0]) > threshold) {
      return false;
    }

    if (Math.abs(this.values[1] - vector.values[1]) > threshold) {
      return false;
    }

    if (Math.abs(this.values[2] - vector.values[2]) > threshold) {
      return false;
    }

    return true;
  }

  public add(vector: Vector3): Vector3 {
    this.values[0] += vector.values[0];
    this.values[1] += vector.values[1];
    this.values[2] += vector.values[2];

    return this;
  }

  public addScaled(vector: Vector3, factor: number): Vector3 {
    this.values[0] += vector.values[0] * factor;
    this.values[1] += vector.values[1] * factor;
    this.values[2] += vector.values[2] * factor;

    return this;
  }

  public subtract(vector: Vector3): Vector3 {
    this.values[0] -= vector.values[0];
    this.values[1] -= vector.values[1];
    this.values[2] -= vector.values[2];

    return this;
  }

  public multiply(vector: Vector3): Vector3 {
    this.values[0] *= vector.values[0];
    this.values[1] *= vector.values[1];
    this.values[2] *= vector.values[2];

    return this;
  }

  public divide(vector: Vector3): Vector3 {
    this.values[0] /= vector.values[0];
    this.values[1] /= vector.values[1];
    this.values[2] /= vector.values[2];

    return this;
  }

  public dot(v: Vector3) {
    return Vector3.dot(this, v);
  }

  public scale(value: number, dest: Vector3 = null): Vector3 {
    if (!dest) {
      dest = this;
    }

    dest.values[0] *= value;
    dest.values[1] *= value;
    dest.values[2] *= value;

    return dest;
  }

  public scaled(value: number): Vector3 {
    return this.clone().scale(value);
  }

  public normalize(): Vector3 {
    let length = this.length;

    if (length === 1) {
      return this;
    }

    if (length === 0) {
      this.values[0] = 0;
      this.values[1] = 0;
      this.values[2] = 0;

      return this;
    }

    length = 1.0 / length;

    this.values[0] *= length;
    this.values[1] *= length;
    this.values[2] *= length;

    return this;
  }

  public normalized(dest: Vector3) {
    return new Vector3().copy(dest).normalize();
  }

  public distanceTo(vector: Vector3): number {
    return Math.sqrt(this.distanceToSquared(vector));
  }

  public distanceToSquared(vector: Vector3): number {
    const x = this.values[0] - vector.values[0],
          y = this.values[1] - vector.values[1],
          z = this.values[2] - vector.values[2];

    return (x * x + y * y + z * z);
  }

  public angleTo(v: Vector3) {
    if (
      this.values[0] === v.values[0] &&
      this.values[1] === v.values[1] &&
      this.values[2] === v.values[2]
    ) {
      return 0;
    }

    const d = this.dot(v) / (this.length * v.length);

    return Math.acos(clamp(d, -1, 1));
  }

  public cross(vector: Vector3): Vector3 {
    const x = vector.values[0],
          y = vector.values[1],
          z = vector.values[2];

    const x2 = this.values[0],
          y2 = this.values[1],
          z2 = this.values[2];

    this.values[0] = y * z2 - z * y2;
    this.values[1] = z * x2 - x * z2;
    this.values[2] = x * y2 - y * x2;

    return this;
  }

  public crossInto(vector: Vector3, out: Vector3): Vector3 {
    const x = vector.values[0],
          y = vector.values[1],
          z = vector.values[2];

    const x2 = this.values[0],
          y2 = this.values[1],
          z2 = this.values[2];

    out.values[0] = y * z2 - z * y2;
    out.values[1] = z * x2 - x * z2;
    out.values[2] = x * y2 - y * x2;

    return out;
  }

  public clone() {
    return this.copy(new Vector3());
  }

}

export interface Vector3 {
  sub(vector: Vector3): Vector3;

  mul(vector: Vector3): Vector3;

  div(vector: Vector3): Vector3;
}

// tslint:disable-next-line
Vector3.prototype.sub = Vector3.prototype.subtract;
// tslint:disable-next-line
Vector3.prototype.mul = Vector3.prototype.multiply;
// tslint:disable-next-line
Vector3.prototype.div = Vector3.prototype.divide;