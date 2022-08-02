/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


import { clamp, EPSILON } from './common';
import { Matrix2 } from './matrix2';
import { Matrix3 } from './matrix3';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';

export class Vector2 {

  private values = new Float32Array(2);

  constructor(values?: number[]);

  constructor(x: number, y: number);

  constructor(x?: number | number[], y?: number) {
    if (arguments.length === 1) {
      if (x) {
        this.x = (x as number[])[0];
        this.y = (x as number[])[1];
      }
    } else if (arguments.length === 2) {
      this.values[0] = x as number;
      this.values[1] = y as number;
    } else {
      this.values[0] = 0;
      this.values[1] = 0;
    }
  }

  get xx(): Vector2 {
    return new Vector2(this.values[0], this.values[0]);
  }

  get xy(): Vector2 {
    return new Vector2(this.values[0], this.values[1]);
  }

  set xy(v: Vector2) {
    this.values[0] = v.x;
    this.values[1] = v.y;
  }

  get yx(): Vector2 {
    return new Vector2(this.values[1], this.values[0]);
  }

  set yx(v: Vector2) {
    this.values[1] = v.x;
    this.values[0] = v.y;
  }

  get yy(): Vector2 {
    return new Vector2(this.values[1], this.values[1]);
  }

  get xxx(): Vector3 {
    return new Vector3(this.values[0], this.values[0], this.values[0]);
  }

  get xxy(): Vector3 {
    return new Vector3(this.values[0], this.values[0], this.values[1]);
  }

  get xyx(): Vector3 {
    return new Vector3(this.values[0], this.values[1], this.values[0]);
  }

  get xyy(): Vector3 {
    return new Vector3(this.values[0], this.values[1], this.values[1]);
  }

  get yxx(): Vector3 {
    return new Vector3(this.values[1], this.values[0], this.values[0]);
  }

  get yxy(): Vector3 {
    return new Vector3(this.values[1], this.values[0], this.values[1]);
  }

  get yyx(): Vector3 {
    return new Vector3(this.values[1], this.values[1], this.values[0]);
  }

  get yyy(): Vector3 {
    return new Vector3(this.values[1], this.values[1], this.values[1]);
  }

  get xxxx(): Vector4 {
    return new Vector4(this.values[0], this.values[0], this.values[0], this.values[0]);
  }

  get xxxy(): Vector4 {
    return new Vector4(this.values[0], this.values[0], this.values[0], this.values[1]);
  }

  get xxyx(): Vector4 {
    return new Vector4(this.values[0], this.values[0], this.values[1], this.values[0]);
  }

  get xxyy(): Vector4 {
    return new Vector4(this.values[0], this.values[0], this.values[1], this.values[1]);
  }

  get xyxx(): Vector4 {
    return new Vector4(this.values[0], this.values[1], this.values[0], this.values[0]);
  }

  get xyxy(): Vector4 {
    return new Vector4(this.values[0], this.values[1], this.values[0], this.values[1]);
  }

  get xyyx(): Vector4 {
    return new Vector4(this.values[0], this.values[1], this.values[1], this.values[0]);
  }

  get xyyy(): Vector4 {
    return new Vector4(this.values[0], this.values[1], this.values[1], this.values[1]);
  }

  get yxxx(): Vector4 {
    return new Vector4(this.values[1], this.values[0], this.values[0], this.values[0]);
  }

  get yxxy(): Vector4 {
    return new Vector4(this.values[1], this.values[0], this.values[0], this.values[1]);
  }

  get yxyx(): Vector4 {
    return new Vector4(this.values[1], this.values[0], this.values[1], this.values[0]);
  }

  get yxyy(): Vector4 {
    return new Vector4(this.values[1], this.values[0], this.values[1], this.values[1]);
  }

  get yyxx(): Vector4 {
    return new Vector4(this.values[1], this.values[1], this.values[0], this.values[0]);
  }

  get yyxy(): Vector4 {
    return new Vector4(this.values[1], this.values[1], this.values[0], this.values[1]);
  }

  get yyyx(): Vector4 {
    return new Vector4(this.values[1], this.values[1], this.values[1], this.values[0]);
  }

  get yyyy(): Vector4 {
    return new Vector4(this.values[1], this.values[1], this.values[1], this.values[1]);
  }

  get r(): number {
    return this.x;
  }

  // region getter setter
  set r(arg: number) {
    this.values[0] = arg;
  }

  get g(): number {
    return this.y;
  }

  set g(arg: number) {
    this.values[1] = arg;
  }

  get s(): number {
    return this.x;
  }

  set s(arg: number) {
    this.values[0] = arg;
  }

  get t(): number {
    return this.y;
  }

  set t(arg: number) {
    this.values[1] = arg;
  }

  get x(): number {
    return this.values[0];
  }

  set x(arg: number) {
    this.values[0] = arg;
  }

  get y(): number {
    return this.values[1];
  }

  set y(arg: number) {
    this.values[1] = arg;
  }

  get rr(): Vector2 {
    return this.xx;
  }

  get rg(): Vector2 {
    return this.xy;
  }

  set rg(arg: Vector2) {
    this.xy = arg;
  }

  get gr(): Vector2 {
    return this.yx;
  }

  set gr(arg: Vector2) {
    this.yx = arg;
  }

  get gg(): Vector2 {
    return this.yy;
  }

  get rrr(): Vector3 {
    return this.xxx;
  }

  get rrg(): Vector3 {
    return this.xxy;
  }

  get rgr(): Vector3 {
    return this.xyx;
  }

  get rgg(): Vector3 {
    return this.xyy;
  }

  get grr(): Vector3 {
    return this.yxx;
  }

  get grg(): Vector3 {
    return this.yxy;
  }

  get ggr(): Vector3 {
    return this.yyx;
  }

  get ggg(): Vector3 {
    return this.yyy;
  }

  get rrrr(): Vector4 {
    return this.xxxx;
  }

  get rrrg(): Vector4 {
    return this.xxxy;
  }

  get rrgr(): Vector4 {
    return this.xxyx;
  }

  get rrgg(): Vector4 {
    return this.xxyy;
  }

  get rgrr(): Vector4 {
    return this.xyxx;
  }

  get rgrg(): Vector4 {
    return this.xyxy;
  }

  get rggr(): Vector4 {
    return this.xyyx;
  }

  get rggg(): Vector4 {
    return this.xyyy;
  }

  get grrr(): Vector4 {
    return this.yxxx;
  }

  get grrg(): Vector4 {
    return this.yxxy;
  }

  get grgr(): Vector4 {
    return this.yxyx;
  }

  get grgg(): Vector4 {
    return this.yxyy;
  }

  get ggrr(): Vector4 {
    return this.yyxx;
  }

  get ggrg(): Vector4 {
    return this.yyxy;
  }

  get gggr(): Vector4 {
    return this.yyyx;
  }

  get gggg(): Vector4 {
    return this.yyyy;
  }

  get ss(): Vector2 {
    return this.xx;
  }

  get st(): Vector2 {
    return this.xy;
  }

  set st(arg: Vector2) {
    this.xy = arg;
  }

  get ts(): Vector2 {
    return this.yx;
  }

  set ts(arg: Vector2) {
    this.yx = arg;
  }

  get tt(): Vector2 {
    return this.yy;
  }

  get sss(): Vector3 {
    return this.xxx;
  }

  get sst(): Vector3 {
    return this.xxy;
  }

  get sts(): Vector3 {
    return this.xyx;
  }

  get stt(): Vector3 {
    return this.xyy;
  }

  get tss(): Vector3 {
    return this.yxx;
  }

  get tst(): Vector3 {
    return this.yxy;
  }

  get tts(): Vector3 {
    return this.yyx;
  }

  get ttt(): Vector3 {
    return this.yyy;
  }

  get ssss(): Vector4 {
    return this.xxxx;
  }

  get ssst(): Vector4 {
    return this.xxxy;
  }

  get ssts(): Vector4 {
    return this.xxyx;
  }

  get sstt(): Vector4 {
    return this.xxyy;
  }

  get stss(): Vector4 {
    return this.xyxx;
  }

  get stst(): Vector4 {
    return this.xyxy;
  }

  get stts(): Vector4 {
    return this.xyyx;
  }

  get sttt(): Vector4 {
    return this.xyyy;
  }

  get tsss(): Vector4 {
    return this.yxxx;
  }

  get tsst(): Vector4 {
    return this.yxxy;
  }

  // endregion

  get tsts(): Vector4 {
    return this.yxyx;
  }

  get tstt(): Vector4 {
    return this.yxyy;
  }

  get ttss(): Vector4 {
    return this.yyxx;
  }

  get ttst(): Vector4 {
    return this.yyxy;
  }

  get ttts(): Vector4 {
    return this.yyyx;
  }

  get tttt(): Vector4 {
    return this.yyyy;
  }

  public get length(): number {
    return Math.sqrt(this.squaredLength);
  }

  public get squaredLength(): number {
    let x = this.x,
        y = this.y;

    return (x * x + y * y);
  }

  public static cross(vector: Vector2, vector2: Vector2): number {
    return vector.x * vector2.y - vector.y * vector2.x;
  }

  public static dot(vector: Vector2, vector2: Vector2): number {
    return vector.x * vector2.x + vector.y * vector2.y;
  }

  public static distance(vector: Vector2, vector2: Vector2): number {
    return Math.sqrt(this.squaredDistance(vector, vector2));
  }

  public static squaredDistance(vector: Vector2, vector2: Vector2): number {
    let x = vector2.x - vector.x,
        y = vector2.y - vector.y;

    return (x * x + y * y);
  }

  public static direction(vector: Vector2, vector2: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    let x = vector.x - vector2.x,
        y = vector.y - vector2.y;

    let length = Math.sqrt(x * x + y * y);

    if (length === 0) {
      out.x = 0;
      out.y = 0;

      return out;
    }

    length = 1 / length;

    out.x = x * length;
    out.y = y * length;

    return out;
  }

  public static mix(vector: Vector2, vector2: Vector2, time: number, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    let x = vector.x,
        y = vector.y;

    let x2 = vector2.x,
        y2 = vector2.y;

    out.x = x + time * (x2 - x);
    out.y = y + time * (y2 - y);

    return out;
  }

  public static sum(vector: Vector2, vector2: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    out.x = vector.x + vector2.x;
    out.y = vector.y + vector2.y;

    return out;
  }

  public static difference(vector: Vector2, vector2: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    out.x = vector.x - vector2.x;
    out.y = vector.y - vector2.y;

    return out;
  }

  public static product(vector: Vector2, vector2: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    out.x = vector.x * vector2.x;
    out.y = vector.y * vector2.y;

    return out;
  }

  public static quotient(vector: Vector2, vector2: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = new Vector2();
    }

    out.x = vector.x / vector2.x;
    out.y = vector.y / vector2.y;

    return out;
  }

  /**
   * Returns the minimum of two vec2's
   *
   * @param  a the first operand
   * @param  b the second operand
   * @param  out the receiving vector
   * @returns   out
   */
  public static min(a: Vector2, b: Vector2, out?: Vector2) {
    if (!out) {
      out = new Vector2();
    }
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    return out;
  }

  /**
   * Returns the maximum of two vec2's
   *
   * @param  a the first operand
   * @param  b the second operand
   * @param  out the receiving vector
   * @returns   out
   */
  public static max(a: Vector2, b: Vector2, out?: Vector2) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    return out;
  }

  public static lerp(a: Vector2, b: Vector2, t: number, out?: Vector2) {
    if (!out) {
      out = new Vector2();
    }

    const ax = a.x;
    const ay = a.y;
    out.x    = ax + t * (b.x - ax);
    out.y    = ay + t * (b.y - ay);
    return out;
  }

  public static angle(v1: Vector2, v2: Vector2) {
    if (v1.values[0] === v2.values[0] && v1.values[1] === v2.values[1]) {
      return 0;
    }
    const theta = Vector2.dot(v1, v2) / (v1.length * v2.length);
    return Math.acos(Math.max(Math.min(theta, -1), 1));
  }

  public static angleSigned(v1: Vector2, v2: Vector2) {
    if (v1.values[0] === v2.values[0] && v1.values[1] === v2.values[1]) {
      return 0;
    }
    const s = Vector2.cross(v1, v2);
    const c = Vector2.dot(v1, v2);
    return Math.atan2(s, c);
  }

  public static zero() {
    return new Vector2(0, 0);
  }

  public static createScaleOriginMatrix3(vector: Vector2, origin: Vector2) {
    return Matrix3.fromTranslate(origin)
      .multiply(Matrix3.fromScaling(vector))
      .multiply(Matrix3.fromTranslate(origin.clone().negate()));
  }

  public static createRotateOriginMatrix3(deg: number, origin: Vector2) {
    return Matrix3.fromTranslate(origin)
      .multiply(new Matrix3().setRotationZ(deg))
      .multiply(Matrix3.fromTranslate(origin.clone().negate()));
  }

  public at(index: number): number {
    return this.values[index];
  }

  public reset(): void {
    this.x = 0;
    this.y = 0;
  }

  public copy(out?: Vector2): Vector2 {
    if (!out) {
      return new Vector2(
        this.values[0], this.values[1]
      );
    }

    out.x = this.x;
    out.y = this.y;

    return out;
  }

  public setValues(x: number, y: number) {
    this.values[0] = x;
    this.values[1] = y;
    return this;
  }

  public setFrom(v: Vector2) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  public splat(arg: number) {
    this.values[0] = arg;
    this.values[1] = arg;
    return this;
  }

  public negate(): Vector2 {
    this.values[0] = -this.values[0];
    this.values[1] = -this.values[1];
    return this;
  }

  public absolute() {
    this.values[0] = Math.abs(this.values[0]);
    this.values[1] = Math.abs(this.values[1]);
  }

  public equals(vector: Vector2, threshold = EPSILON): boolean {
    if (Math.abs(this.x - vector.x) > threshold) {
      return false;
    }

    if (Math.abs(this.y - vector.y) > threshold) {
      return false;
    }

    return true;
  }

  public add(vector: Vector2): Vector2 {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  public subtract(vector: Vector2): Vector2 {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  public multiply(vector: Vector2): Vector2 {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  public divide(vector: Vector2): Vector2 {
    this.x /= vector.x;
    this.y /= vector.y;

    return this;
  }

  /**
   * Math.ceil the components of a vec2
   *
   * @param  out the receiving vector
   * @returns   out
   */
  public ceil(out?: Vector2) {
    if (!out) {
      out = this;
    }
    out.x = Math.ceil(this.x);
    out.y = Math.ceil(this.y);
    return out;
  }

  /**
   * Math.floor the components of a vec2
   *
   * @param  out the receiving vector
   * @returns   out
   */
  public floor(out?: Vector2) {
    if (!out) {
      out = this;
    }
    out.x = Math.floor(this.x);
    out.y = Math.floor(this.y);
    return out;
  }

  /**
   * Math.round the components of a vec2
   *
   * @param  out the receiving vector
   * @returns   out
   */
  public round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  public roundToZero() {
    this.values[0] = this.values[0] < 0 ? Math.ceil(this.values[0]) : Math.floor(this.values[0]);
    this.values[1] = this.values[1] < 0 ? Math.ceil(this.values[1]) : Math.floor(this.values[1]);
  }

  public clamp(min: Vector2, max: Vector2) {
    this.values[0] = clamp(this.values[0], min.values[0], max.values[0]);
    this.values[1] = clamp(this.values[1], min.values[1], max.values[1]);
    return this;
  }

  public clampScalar(min: number, max: number) {
    this.values[0] = clamp(this.values[0], min, max);
    this.values[1] = clamp(this.values[1], min, max);
    return this;
  }

  public scale(value: number, out?: Vector2): Vector2 {
    if (!out) {
      out = this;
    }

    out.x *= value;
    out.y *= value;

    return out;
  }

  public scaled(value: number) {
    return this.clone().scale(value);
  }

  public normalize(out?: Vector2): Vector2 {
    if (!out) {
      out = this;
    }

    let length = this.length;
    if (length === 1) {
      return this;
    } else if (length === 0) {
      out.x = 0;
      out.y = 0;
      return out;
    } else {
      length = 1.0 / length;
      out.x *= length;
      out.y *= length;
      return out;
    }
  }

  public normalized() {
    return this.clone().normalize();
  }

  public distanceTo(arg: Vector2) {
    return Math.sqrt(this.distanceToSquared(arg));
  }

  public distanceToSquared(arg: Vector2) {
    const dx = this.x - arg.x;
    const dy = this.y - arg.y;

    return dx * dx + dy * dy;
  }

  public angleTo(other: Vector2): number {
    return Vector2.angle(this, other);
  }

  public angleToSigned(other: Vector2) {
    return Vector2.angleSigned(this, other);
  }

  public dot(other: Vector2) {
    return Vector2.dot(this, other);
  }

  public multiplyMatrix2(matrix: Matrix2, out?: Vector2): Vector2 {
    if (!out) {
      this.copy(out);
    }

    return matrix.transform(out);
  }

  public reflect(normal: Vector2) {
    return this.sub(normal.scaled(2 * normal.dot(this)));
  }

  public refleted(normal: Vector2) {
    return this.clone().reflect(normal);
  }

  /**
   * 相对误差
   */
  public relativeError(correct: Vector2) {
    const correctNorm = correct.length;
    const diffNorm    = (this.clone().sub(correct)).length;
    return diffNorm / correctNorm;
  }

  /**
   * 绝对误差
   */
  public absoluteError(correct: Vector2) {
    return (this.clone().sub(correct)).length;
  }

  public vertical(flag: boolean, out?: Vector2) {
    if (!out) {
      out = this;
    }

    const x = this.x;
    const y = this.y;

    if (flag) {
      out.x = y;
      out.y = -1 * x;
    } else {
      out.x = -1 * y;
      out.y = x;
    }

    return out;
  }

  public clone() {
    return this.copy();
  }

}

export interface Vector2 {
  sub(vector: Vector2): Vector2;

  mul(vector: Vector2): Vector2;

  div(vector: Vector2): Vector2;
}

// tslint:disable-next-line
Vector2.prototype.sub = Vector2.prototype.subtract;
// tslint:disable-next-line
Vector2.prototype.mul = Vector2.prototype.multiply;
// tslint:disable-next-line
Vector2.prototype.div = Vector2.prototype.divide;