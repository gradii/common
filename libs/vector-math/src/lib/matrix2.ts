/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */


import { EPSILON } from './common';
import { Vector2 } from './vector2';

/**
 * use row-major, because such matrix can represent as
 * ```
 *  [[1, 0],
 *   [0, 0]]
 * ```
 */
export class Matrix2 {
  public static readonly dimension = 2;

  private values = new Float32Array(4);

  constructor(values?: number[]);
  constructor(a11: number, a12: number,
              a21: number, a22: number);
  constructor(a11?: number | number[], a12?: number,
              a21?: number, a22?: number) {
    if (arguments.length === 1) {
      if (a11) {
        this.init(a11 as number[]);
      }
    } else if (arguments.length === 4) {
      this.values[0] = a11 as number;
      this.values[1] = a12;
      this.values[2] = a21;
      this.values[3] = a22;
    } else {
      this.values[0] = this.values[1] = this.values[2] = this.values[3] = 0;
    }
  }

  public static zero() {
    return new Matrix2(
      0, 0,
      0, 0
    );
  }

  public static rotation(radians: number): Matrix2 {
    return Matrix2.zero().setRotation(radians);
  }

  public static product(m1: Matrix2, m2: Matrix2, out: Matrix2 = null): Matrix2 {
    const a11 = m1.at(0),
          a12 = m1.at(1),
          a21 = m1.at(2),
          a22 = m1.at(3);

    if (!out) {
      out = new Matrix2();
    }
    out.init([
      a11 * m2.at(0) + a12 * m2.at(2),
      a11 * m2.at(1) + a12 * m2.at(3),
      a21 * m2.at(0) + a22 * m2.at(2),
      a21 * m2.at(1) + a22 * m2.at(3),
    ]);

    return out;
  }

  public static absolute(m: Matrix2, out?: Matrix2) {
    if (!out) {
      out = new Matrix2();
    }

    out.values[0] = Math.abs(m.at(0));
    out.values[1] = Math.abs(m.at(1));
    out.values[2] = Math.abs(m.at(2));
    out.values[3] = Math.abs(m.at(3));

    return out;
  }

  public at(index: number): number {
    return this.values[index];
  }

  public init(values: number[]): Matrix2 {
    for (let i = 0; i < 4; i++) {
      this.values[i] = values[i];
    }

    return this;
  }

  public reset(): void {
    for (let i = 0; i < 4; i++) {
      this.values[i] = 0;
    }
  }

  public copy(dest?: Matrix2): Matrix2 {
    if (!dest) {
      return new Matrix2(
        this.values[0], this.values[1],
        this.values[2], this.values[3]
      );
    }

    for (let i = 0; i < 4; i++) {
      dest.values[i] = this.values[i];
    }

    return dest;
  }

  public all(): number[] {
    const data: number[] = [];
    for (let i = 0; i < 4; i++) {
      data[i] = this.values[i];
    }

    return data;
  }

  public copyInverse(arg: Matrix2) {
    const det = arg.determinant();
    if (det == 0) {
      this.setFrom(arg);
      return 0;
    }

    const invDet   = 1 / det;
    const m2       = arg.values;
    this.values[0] = m2[3] * invDet;
    this.values[1] = -m2[1] * invDet;
    this.values[2] = -m2[2] * invDet;
    this.values[3] = m2[0] * invDet;

    return det;
  }

  public setFrom(arg: Matrix2) {
    this.values[3] = arg.values[3];
    this.values[2] = arg.values[2];
    this.values[1] = arg.values[1];
    this.values[0] = arg.values[0];
  }

  public row(index: number): number[] {
    return [
      this.values[index * 2],
      this.values[index * 2 + 1],
    ];
  }

  public col(index: number): number[] {
    return [
      this.values[index],
      this.values[index + 2],
    ];
  }

  public index(row: number, col: number) {
    return (row * 2) + col;
  }

  public entry(row: number, col: number) {
    // console.assert((row >= 0) && (row < Matrix3.dimension));
    // console.assert((col >= 0) && (col < Matrix3.dimension));

    return this.values[this.index(row, col)];
  }

  public setEntry(row: number, col: number, v: number) {
    this.values[this.index(row, col)] = v;

    return this;
  }

  public setValues(arg0: number, arg1: number, arg2: number, arg3: number) {
    this.values[0] = arg0;
    this.values[1] = arg1;
    this.values[2] = arg2;
    this.values[3] = arg3;

    return this;
  }

  public equals(matrix: Matrix2, threshold = EPSILON): boolean {
    for (let i = 0; i < 4; i++) {
      if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
        return false;
      }
    }

    return true;
  }

  public determinant(): number {
    return this.values[0] * this.values[3] - this.values[2] * this.values[1];
  }

  public dotRow(i: number, v: Vector2) {
    return this.values[2 * i] * v.x + this.values[(2 * i) + 1] * v.y;
  }

  public dotColumn(i: number, v: Vector2) {
    return this.values[i] * v.x + this.values[2 + i] * v.y;
  }

  public setZero() {
    this.values[0] = 0;
    this.values[1] = 0;
    this.values[2] = 0;
    this.values[3] = 0;
  }

  /**
   * 单位矩阵
   *
   * @returns
   */
  public setIdentity(): Matrix2 {
    this.values[0] = 1;
    this.values[1] = 0;
    this.values[2] = 0;
    this.values[3] = 1;

    return this;
  }

  /**
   * 转置当前矩阵
   *
   * @returns
   */
  public transpose(): Matrix2 {
    const temp = this.values[1];

    this.values[1] = this.values[2];
    this.values[2] = temp;

    return this;
  }

  /**
   * 返回一个新的转置矩阵
   *
   * @returns
   */
  public transposed(): Matrix2 {
    return this.clone().transpose();
  }

  public infinityNorm() {
    let norm = 0;
    {
      let row_norm = 0;
      row_norm += Math.abs(this.values[0]);
      row_norm += Math.abs(this.values[2]);
      norm         = row_norm > norm ? row_norm : norm;
    }
    {
      let row_norm = 0;
      row_norm += Math.abs(this.values[1]);
      row_norm += Math.abs(this.values[3]);
      norm         = row_norm > norm ? row_norm : norm;
    }
    return norm;
  }

  public relativeError(correct: Matrix2) {
    const diff         = correct.clone().sub(this);
    const correct_norm = correct.infinityNorm();
    const diff_norm    = diff.infinityNorm();
    return diff_norm / correct_norm;
  }

  public absoluteError(correct: Matrix2) {
    const this_norm    = this.infinityNorm();
    const correct_norm = correct.infinityNorm();
    const diff_norm    = Math.abs(this_norm - correct_norm);
    return diff_norm;
  }

  /**
   * 计算矩阵的逆矩阵
   * @returns
   */
  public inverse(): Matrix2 {
    let det = this.determinant();

    if (!det) {
      return null;
    }

    det = 1.0 / det;

    this.values[0] = det * (this.values[3]);
    this.values[1] = det * (-this.values[1]);
    this.values[2] = det * (-this.values[2]);
    this.values[3] = det * (this.values[0]);

    return this;
  }

  public setRotation(radians: number) {
    const c        = Math.cos(radians);
    const s        = Math.sin(radians);
    this.values[0] = c;
    this.values[1] = -s;
    this.values[2] = s;
    this.values[3] = c;

    return this;
  }

  public scaleAdjoint(scale: number) {
    const temp     = this.values[0];
    this.values[0] = this.values[3] * scale;
    this.values[1] = -this.values[1] * scale;
    this.values[2] = -this.values[2] * scale;
    this.values[3] = temp * scale;

    return this;
  }

  public rotate(radians: number): Matrix2 {
    const a11 = this.values[0],
          a12 = this.values[1],
          a21 = this.values[2],
          a22 = this.values[3];

    const sin = Math.sin(radians),
          cos = Math.cos(radians);

    this.values[0] = a11 * cos + a12 * sin;
    this.values[1] = a11 * -sin + a12 * cos;
    this.values[2] = a21 * cos + a22 * sin;
    this.values[3] = a21 * -sin + a22 * cos;

    return this;
  }

  public scale(scale: number): Matrix2 {
    this.values[0] = this.values[0] * scale;
    this.values[1] = this.values[1] * scale;
    this.values[2] = this.values[2] * scale;
    this.values[3] = this.values[3] * scale;

    return this;
  }

  public scaled(scale: number): Matrix2 {
    return this.clone().scale(scale);
  }

  public add(m: Matrix2) {
    this.values[0] = this.values[0] + m.at(0);
    this.values[1] = this.values[1] + m.at(1);
    this.values[2] = this.values[2] + m.at(2);
    this.values[3] = this.values[3] + m.at(3);

    return this;
  }

  public sub(m: Matrix2) {
    this.values[0] = this.values[0] - m.at(0);
    this.values[1] = this.values[1] - m.at(1);
    this.values[2] = this.values[2] - m.at(2);
    this.values[3] = this.values[3] - m.at(3);

    return this;
  }

  // dot
  public multiply(m: Matrix2): Matrix2 {
    const a11 = this.values[0],
          a12 = this.values[1],
          a21 = this.values[2],
          a22 = this.values[3];

    const b11 = m.at(0),
          b12 = m.at(1),
          b21 = m.at(2),
          b22 = m.at(3);

    this.values[0] = a11 * b11 + a12 * b21;
    this.values[1] = a11 * b12 + a12 * b22;
    this.values[2] = a21 * b11 + a22 * b21;
    this.values[3] = a21 * b12 + a22 * b22;

    return this;
  }

  public multiplied(m: Matrix2): Matrix2 {
    return this.clone().multiply(m);
  }

  public transform(vector: Vector2): Vector2 {
    const x = vector.x,
          y = vector.y;

    vector.setValues(
      x * this.values[0] + y * this.values[1],
      x * this.values[2] + y * this.values[3]
    );

    return vector;
  }

  public transformed(vector: Vector2, out?: Vector2): Vector2 {
    if (!out) {
      out = vector.clone();
    } else {
      vector.copy(out);
    }

    return this.transform(out);
  }

  public clone() {
    return this.copy();
  }

}
