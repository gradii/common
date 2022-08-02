/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { EPSILON } from './common';

export class Vector4 {
  public static zero = new Vector4([0, 0, 0, 1]);

  private values = new Float32Array(4);

  constructor(values?: number[]);

  constructor(x: number, y: number, z: number, w: number);

  constructor(x?: number | number[], y?: number, z?: number, w?: number) {
    if (arguments.length === 1) {
      if (x) {
        this.xyzw = x as number[];
      }
    } else if (arguments.length === 4) {
      this.values[0] = x as number;
      this.values[1] = y as number;
      this.values[2] = z as number;
      this.values[3] = w as number;
    } else {
      this.values[0] = 0;
      this.values[1] = 0;
      this.values[2] = 0;
      this.values[3] = 0;
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

  get w(): number {
    return this.values[3];
  }

  set w(value: number) {
    this.values[3] = value;
  }

  get xy(): number[] {
    return [
      this.values[0],
      this.values[1],
    ];
  }

  set xy(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
  }

  get xyz(): number[] {
    return [
      this.values[0],
      this.values[1],
      this.values[2],
    ];
  }

  set xyz(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
    this.values[2] = values[2];
  }

  get xyzw(): number[] {
    return [
      this.values[0],
      this.values[1],
      this.values[2],
      this.values[3],
    ];
  }

  set xyzw(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
    this.values[2] = values[2];
    this.values[3] = values[3];
  }

  get r(): number {
    return this.values[0];
  }

  set r(value: number) {
    this.values[0] = value;
  }

  get g(): number {
    return this.values[1];
  }

  set g(value: number) {
    this.values[1] = value;
  }

  get b(): number {
    return this.values[2];
  }

  set b(value: number) {
    this.values[2] = value;
  }

  get a(): number {
    return this.values[3];
  }

  set a(value: number) {
    this.values[3] = value;
  }

  get rg(): number[] {
    return [
      this.values[0],
      this.values[1],
    ];
  }

  set rg(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
  }

  get rgb(): number[] {
    return [
      this.values[0],
      this.values[1],
      this.values[2],
    ];
  }

  set rgb(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
    this.values[2] = values[2];
  }

  get rgba(): number[] {
    return [
      this.values[0],
      this.values[1],
      this.values[2],
      this.values[3],
    ];
  }

  set rgba(values: number[]) {
    this.values[0] = values[0];
    this.values[1] = values[1];
    this.values[2] = values[2];
    this.values[3] = values[3];
  }

  public static mix(vector: Vector4, vector2: Vector4, time: number,
                    dest: Vector4 = null): Vector4 {
    if (!dest) {
      dest = new Vector4();
    }

    dest.x = vector.x + time * (vector2.x - vector.x);
    dest.y = vector.y + time * (vector2.y - vector.y);
    dest.z = vector.z + time * (vector2.z - vector.z);
    dest.w = vector.w + time * (vector2.w - vector.w);

    return dest;
  }

  public static sum(vector: Vector4, vector2: Vector4, dest: Vector4 = null): Vector4 {
    if (!dest) {
      dest = new Vector4();
    }

    dest.x = vector.x + vector2.x;
    dest.y = vector.y + vector2.y;
    dest.z = vector.z + vector2.z;
    dest.w = vector.w + vector2.w;

    return dest;
  }

  public static difference(vector: Vector4, vector2: Vector4, dest: Vector4 = null): Vector4 {
    if (!dest) {
      dest = new Vector4();
    }

    dest.x = vector.x - vector2.x;
    dest.y = vector.y - vector2.y;
    dest.z = vector.z - vector2.z;
    dest.w = vector.w - vector2.w;

    return dest;
  }

  public static product(vector: Vector4, vector2: Vector4, dest: Vector4 = null): Vector4 {
    if (!dest) {
      dest = new Vector4();
    }

    dest.x = vector.x * vector2.x;
    dest.y = vector.y * vector2.y;
    dest.z = vector.z * vector2.z;
    dest.w = vector.w * vector2.w;

    return dest;
  }

  public static quotient(vector: Vector4, vector2: Vector4, dest?: Vector4): Vector4 {
    if (!dest) {
      dest = new Vector4();
    }

    dest.x = vector.x / vector2.x;
    dest.y = vector.y / vector2.y;
    dest.z = vector.z / vector2.z;
    dest.w = vector.w / vector2.w;

    return dest;
  }

  public at(index: number): number {
    return this.values[index];
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  }

  public copy(dest: Vector4 = null): Vector4 {
    if (!dest) {
      return new Vector4(
        this.values[0], this.values[1], this.values[2], this.values[3]
      );
    }

    dest.values[0] = this.values[0];
    dest.values[1] = this.values[1];
    dest.values[2] = this.values[2];
    dest.values[3] = this.values[3];

    return dest;
  }

  public setValues(x: number, y: number, z: number, w: number) {
    this.values[0] = x;
    this.values[1] = y;
    this.values[2] = z;
    this.values[3] = w;

    return this;
  }

  public setIdentity() {
    this.values[0] = 0.0;
    this.values[1] = 0.0;
    this.values[2] = 0.0;
    this.values[3] = 1.0;

    return this;
  }

  public setFrom(other: Vector4) {
    this.values[0] = other.values[0];
    this.values[1] = other.values[1];
    this.values[2] = other.values[2];
    this.values[3] = other.values[3];

    return this;
  }

  public splat(arg: number) {
    this.values[0] = arg;
    this.values[1] = arg;
    this.values[2] = arg;
    this.values[3] = arg;

    return this;
  }

  public negate(dest: Vector4 = null): Vector4 {
    if (!dest) {
      dest = this;
    }

    dest.x = -this.x;
    dest.y = -this.y;
    dest.z = -this.z;
    dest.w = -this.w;

    return dest;
  }

  public exactEquals(vector: Vector4): boolean {
    return this.x === vector.x &&
      this.y === vector.y &&
      this.z === vector.z &&
      this.w === vector.w;
  }

  public equals(vector: Vector4, threshold = EPSILON): boolean {
    if (Math.abs(this.x - vector.x) > threshold) {
      return false;
    }

    if (Math.abs(this.y - vector.y) > threshold) {
      return false;
    }

    if (Math.abs(this.z - vector.z) > threshold) {
      return false;
    }

    if (Math.abs(this.w - vector.w) > threshold) {
      return false;
    }

    return true;
  }

  public length(): number {
    return Math.sqrt(this.squaredLength());
  }

  public squaredLength(): number {
    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    return (x * x + y * y + z * z + w * w);
  }

  public add(vector: Vector4): Vector4 {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    this.w += vector.w;

    return this;
  }

  public subtract(vector: Vector4): Vector4 {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    this.w -= vector.w;

    return this;
  }

  public multiply(vector: Vector4): Vector4 {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    this.w *= vector.w;

    return this;
  }

  public divide(vector: Vector4): Vector4 {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
    this.w /= vector.w;

    return this;
  }

  public ceil(): Vector4 {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);

    return this;
  }

  public floor(): Vector4 {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);

    return this;
  }

  public scale(value: number): Vector4 {
    this.x *= value;
    this.y *= value;
    this.z *= value;
    this.w *= value;

    return this;
  }

  public normalize(): Vector4 {
    let length = this.length();

    if (length === 1) {
      return this;
    }

    if (length === 0) {
      this.values[0] *= 0;
      this.values[1] *= 0;
      this.values[2] *= 0;
      this.values[3] *= 0;

      return this;
    }

    length = 1.0 / length;

    this.values[0] *= length;
    this.values[1] *= length;
    this.values[2] *= length;
    this.values[3] *= length;

    return this;
  }

  [Symbol.toPrimitive]() {
    return [
      this.values[0],
      this.values[1],
      this.values[2],
      this.values[3],
    ];
  }

  toArray() {
    return this[Symbol.toPrimitive]();
  }

  toString() {
    return `Vector4(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
  }
}

export interface Vector4 {
  sub(vector: Vector4): Vector4;

  mul(vector: Vector4): Vector4;

  div(vector: Vector4): Vector4;
}

Vector4.prototype.sub = Vector4.prototype.subtract;
Vector4.prototype.mul = Vector4.prototype.multiply;
Vector4.prototype.div = Vector4.prototype.divide;
