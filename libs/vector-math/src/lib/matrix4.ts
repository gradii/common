/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { EPSILON } from './common';
import { Matrix3 } from './matrix3';
import { Quaternion } from './quaternion';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';

export class Matrix4 {
  public static readonly dimension = 4;
  // tslint:disable-next-line
  public transform                 = this.transformVector4;
  // tslint:disable-next-line
  public transform3                = this.transformVector3;
  // tslint:disable-next-line
  public rotate3                   = this.rotateVector3;
  private values                   = new Float32Array(16);

  constructor(values?: number[]);

  constructor(a11: number, a12: number, a13: number, a14: number,
              a21: number, a22: number, a23: number, a24: number,
              a31: number, a32: number, a33: number, a34: number,
              a41: number, a42: number, a43: number, a44: number);

  constructor(a11?: number | number[], a12?: number, a13?: number, a14?: number,
              a21?: number, a22?: number, a23?: number, a24?: number,
              a31?: number, a32?: number, a33?: number, a34?: number,
              a41?: number, a42?: number, a43?: number, a44?: number) {
    if (arguments.length === 1) {
      if (a11) {
        this.init(a11 as number[]);
      }
    } else if (arguments.length === 16) {
      this.values[0] = a11 as number;
      this.values[1] = a12;
      this.values[2] = a13;
      this.values[3] = a14;

      this.values[4] = a21;
      this.values[5] = a22;
      this.values[6] = a23;
      this.values[7] = a24;

      this.values[8]  = a31;
      this.values[9]  = a32;
      this.values[10] = a33;
      this.values[11] = a34;

      this.values[12] = a41;
      this.values[13] = a42;
      this.values[14] = a43;
      this.values[15] = a44;
    } else {
      this.values[0]  = this.values[1] = this.values[2] = this.values[3] = 0;
      this.values[4]  = this.values[5] = this.values[6] = this.values[7] = 0;
      this.values[8]  = this.values[9] = this.values[10] = this.values[11] = 0;
      this.values[12] = this.values[13] = this.values[14] = this.values[15] = 0;
    }
  }

  public static zero(): Matrix4 {
    return new Matrix4(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    );
  }

  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .translate(vec);
   *
   * @param  v
   * @returns
   */
  public static fromTranslation(v: Vector3) {
    return new Matrix4(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      v.x,
      v.y,
      v.z,
      1,
    );
  }

  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .scale(vec);
   *
   * @param  v
   * @returns
   */
  public static fromScaling(v: Vector3) {
    return new Matrix4(
      v.x,
      0,
      0,
      0,
      0,
      v.y,
      0,
      0,
      0,
      0,
      v.z,
      0,
      0,
      0,
      0,
      1
    );
  }

  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .rotate(rad, axis);
   *
   * @param  rad
   * @param  axis
   * @returns
   */
  public static fromRotation(rad: number, axis: Vector3) {
    const out = new Matrix4();

    let x   = axis.x;
    let y   = axis.y;
    let z   = axis.z;
    let len = Math.sqrt(x * x + y * y + z * z);
    let s;
    let c;
    let t;

    if (Math.abs(len) < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out.values[0]  = x * x * t + c;
    out.values[1]  = y * x * t + z * s;
    out.values[2]  = z * x * t - y * s;
    out.values[3]  = 0;
    out.values[4]  = x * y * t - z * s;
    out.values[5]  = y * y * t + c;
    out.values[6]  = z * y * t + x * s;
    out.values[7]  = 0;
    out.values[8]  = x * z * t + y * s;
    out.values[9]  = y * z * t - x * s;
    out.values[10] = z * z * t + c;
    out.values[11] = 0;
    out.values[12] = 0;
    out.values[13] = 0;
    out.values[14] = 0;
    out.values[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .rotateX(rad);
   *
   * @param  rad
   * @returns
   */
  public static fromXRotation(rad: number) {
    const out = new Matrix4();

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out.values[0]  = 1;
    out.values[1]  = 0;
    out.values[2]  = 0;
    out.values[3]  = 0;
    out.values[4]  = 0;
    out.values[5]  = c;
    out.values[6]  = s;
    out.values[7]  = 0;
    out.values[8]  = 0;
    out.values[9]  = -s;
    out.values[10] = c;
    out.values[11] = 0;
    out.values[12] = 0;
    out.values[13] = 0;
    out.values[14] = 0;
    out.values[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .rotateY(rad);
   *
   * @param  rad the angle to rotate the matrix by
   * @returns   out
   */
  public static fromYRotation(rad: number) {
    const out = new Matrix4();

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out.values[0]  = c;
    out.values[1]  = 0;
    out.values[2]  = -s;
    out.values[3]  = 0;
    out.values[4]  = 0;
    out.values[5]  = 1;
    out.values[6]  = 0;
    out.values[7]  = 0;
    out.values[8]  = s;
    out.values[9]  = 0;
    out.values[10] = c;
    out.values[11] = 0;
    out.values[12] = 0;
    out.values[13] = 0;
    out.values[14] = 0;
    out.values[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .rotateZ(rad);
   *
   * @param  rad the angle to rotate the matrix by
   * @returns   out
   */
  public static fromZRotation(rad: number) {
    const out = new Matrix4();

    const s = Math.sin(rad);
    const c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out.values[0]  = c;
    out.values[1]  = s;
    out.values[2]  = 0;
    out.values[3]  = 0;
    out.values[4]  = -s;
    out.values[5]  = c;
    out.values[6]  = 0;
    out.values[7]  = 0;
    out.values[8]  = 0;
    out.values[9]  = 0;
    out.values[10] = 1;
    out.values[11] = 0;
    out.values[12] = 0;
    out.values[13] = 0;
    out.values[14] = 0;
    out.values[15] = 1;
    return out;
  }

  /**
   * Creates a matrix from a Quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4
   *     .setIdentity()
   *     .translate(vec);
   *
   *     var quatMat = mat4
   *     .create()
   *     .toMat4(quat, quatMat);
   *
   *     mat4.multiply(dest, quatMat);
   *
   * @param  q Rotation Quaternion
   * @param  v Translation vector
   * @returns   out
   */
  public static fromRotationTranslation(
    q: Quaternion,
    v: Vector3
  ) {
    const out = new Matrix4();

    // Quaternion math
    const x  = q.x;
    const y  = q.y;
    const z  = q.z;
    const w  = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    out.values[0]  = 1 - (yy + zz);
    out.values[1]  = xy + wz;
    out.values[2]  = xz - wy;
    out.values[3]  = 0;
    out.values[4]  = xy - wz;
    out.values[5]  = 1 - (xx + zz);
    out.values[6]  = yz + wx;
    out.values[7]  = 0;
    out.values[8]  = xz + wy;
    out.values[9]  = yz - wx;
    out.values[10] = 1 - (xx + yy);
    out.values[11] = 0;
    out.values[12] = v.x;
    out.values[13] = v.y;
    out.values[14] = v.z;
    out.values[15] = 1;

    return out;
  }

  /**
   * Creates a matrix from a Quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.setIdentity(dest);
   *     mat4.translate(dest, vec);
   *     var quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param  q Rotation Quaternion
   * @param  v Translation vector
   * @param  s Scaling vector
   * @returns   out
   */
  public static fromRotationTranslationScale(
    q: Quaternion,
    v: Vector3,
    s: Vector3
  ) {
    const out = new Matrix4();

    // Quaternion math
    const x  = q.x;
    const y  = q.y;
    const z  = q.z;
    const w  = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const sx = s.x;
    const sy = s.y;
    const sz = s.z;

    out.values[0]  = (1 - (yy + zz)) * sx;
    out.values[1]  = (xy + wz) * sx;
    out.values[2]  = (xz - wy) * sx;
    out.values[3]  = 0;
    out.values[4]  = (xy - wz) * sy;
    out.values[5]  = (1 - (xx + zz)) * sy;
    out.values[6]  = (yz + wx) * sy;
    out.values[7]  = 0;
    out.values[8]  = (xz + wy) * sz;
    out.values[9]  = (yz - wx) * sz;
    out.values[10] = (1 - (xx + yy)) * sz;
    out.values[11] = 0;
    out.values[12] = v.x;
    out.values[13] = v.y;
    out.values[14] = v.z;
    out.values[15] = 1;

    return out;
  }

  /**
   * Creates a matrix from a Quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.setIdentity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     var quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param  q Rotation Quaternion
   * @param  v Translation vector
   * @param  s Scaling vector
   * @param  o The origin vector around which to scale and rotate
   * @returns   out
   */
  public static fromRotationTranslationScaleOrigin(
    q: Quaternion,
    v: Vector3,
    s: Vector3,
    o: Vector3
  ) {

    // Quaternion math
    const x  = q.x;
    const y  = q.y;
    const z  = q.z;
    const w  = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const sx = s.x;
    const sy = s.y;
    const sz = s.z;
    const ox = o.x;
    const oy = o.y;
    const oz = o.z;

    const out0  = (1 - (yy + zz)) * sx;
    const out1  = (xy + wz) * sx;
    const out2  = (xz - wy) * sx;
    const out3  = 0;
    const out4  = (xy - wz) * sy;
    const out5  = (1 - (xx + zz)) * sy;
    const out6  = (yz + wx) * sy;
    const out7  = 0;
    const out8  = (xz + wy) * sz;
    const out9  = (yz - wx) * sz;
    const out10 = (1 - (xx + yy)) * sz;
    const out11 = 0;
    const out12 = v.x + ox - (out0 * ox + out4 * oy + out8 * oz);
    const out13 = v.y + oy - (out1 * ox + out5 * oy + out9 * oz);
    const out14 = v.z + oz - (out2 * ox + out6 * oy + out10 * oz);
    const out15 = 1;

    return new Matrix4(
      out0,
      out1,
      out2,
      out3,
      out4,
      out5,
      out6,
      out7,
      out8,
      out9,
      out10,
      out11,
      out12,
      out13,
      out14,
      out15,
    );
  }

  /**
   * Calculates a 4x4 matrix from the given Quaternion
   *
   * @param  q Quaternion to create matrix from
   *
   * @returns   out
   */
  public static fromQuat(q: Quaternion) {
    const out = new Matrix4();

    const x  = q.x;
    const y  = q.y;
    const z  = q.z;
    const w  = q.w;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;

    out.values[0] = 1 - yy - zz;
    out.values[1] = yx + wz;
    out.values[2] = zx - wy;
    out.values[3] = 0;

    out.values[4] = yx - wz;
    out.values[5] = 1 - xx - zz;
    out.values[6] = zy + wx;
    out.values[7] = 0;

    out.values[8]  = zx + wy;
    out.values[9]  = zy - wx;
    out.values[10] = 1 - xx - yy;
    out.values[11] = 0;

    out.values[12] = 0;
    out.values[13] = 0;
    out.values[14] = 0;
    out.values[15] = 1;

    return out;
  }

  public static frustum(left: number, right: number, bottom: number, top: number, near: number,
                        far: number): Matrix4 {
    const rl = (right - left);
    const tb = (top - bottom);
    const fn = (far - near);

    return new Matrix4([
      (near * 2) / rl,
      0,
      0,
      0,

      0,
      (near * 2) / tb,
      0,
      0,

      (right + left) / rl,
      (top + bottom) / tb,
      -(far + near) / fn,
      -1,

      0,
      0,
      -(far * near * 2) / fn,
      0,
    ]);
  }

  public static perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
    const top   = near * Math.tan(fov * Math.PI / 360.0);
    const right = top * aspect;

    return Matrix4.frustum(-right, right, -top, top, near, far);
  }

  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param  fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param  near Near bound of the frustum
   * @param  far Far bound of the frustum
   * @returns   out
   */
  public static perspectiveFromFieldOfView(
    fov: {
      upDegrees: number
      downDegrees: number
      leftDegrees: number
      rightDegrees: number,
    },
    near: number,
    far: number
  ) {
    const upTan    = Math.tan(fov.upDegrees * Math.PI / 180.0);
    const downTan  = Math.tan(fov.downDegrees * Math.PI / 180.0);
    const leftTan  = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    const rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    const xScale   = 2.0 / (leftTan + rightTan);
    const yScale   = 2.0 / (upTan + downTan);

    return new Matrix4(
      [
        xScale,
        0.0,
        0.0,
        0.0,
        0.0,
        yScale,
        0.0,
        0.0,
        -((leftTan - rightTan) * xScale * 0.5),
        (upTan - downTan) * yScale * 0.5,
        far / (near - far),
        -1.0,
        0.0,
        0.0,
        far * near / (near - far),
        0.0,
      ]
    );
  }

  public static orthographic(left: number, right: number, bottom: number, top: number, near: number,
                             far: number): Matrix4 {
    const rl = (right - left);
    const tb = (top - bottom);
    const fn = (far - near);

    return new Matrix4([
      2 / rl,
      0,
      0,
      0,

      0,
      2 / tb,
      0,
      0,

      0,
      0,
      -2 / fn,
      0,

      -(left + right) / rl,
      -(top + bottom) / tb,
      -(far + near) / fn,
      1,
    ]);
  }

  public static lookAt(position: Vector3, target: Vector3, up: Vector3 = Vector3.up): Matrix4 {
    if (position.equals(target)) {
      return new Matrix4().setIdentity();
    }

    const z = Vector3.difference(position, target).normalize();

    const x = up.clone().cross(z).normalize();
    const y = z.clone().cross(x).normalize();

    return new Matrix4([
      x.x,
      y.x,
      z.x,
      0,

      x.y,
      y.y,
      z.y,
      0,

      x.z,
      y.z,
      z.z,
      0,

      -Vector3.dot(x, position),
      -Vector3.dot(y, position),
      -Vector3.dot(z, position),
      1,
    ]);
  }

  public static product(m1: Matrix4, m2: Matrix4, result: Matrix4 = null): Matrix4 {
    const a00 = m1.at(0);
    const a01 = m1.at(1);
    const a02 = m1.at(2);
    const a03 = m1.at(3);
    const a10 = m1.at(4);
    const a11 = m1.at(5);
    const a12 = m1.at(6);
    const a13 = m1.at(7);
    const a20 = m1.at(8);
    const a21 = m1.at(9);
    const a22 = m1.at(10);
    const a23 = m1.at(11);
    const a30 = m1.at(12);
    const a31 = m1.at(13);
    const a32 = m1.at(14);
    const a33 = m1.at(15);

    const b00 = m2.at(0);
    const b01 = m2.at(1);
    const b02 = m2.at(2);
    const b03 = m2.at(3);
    const b10 = m2.at(4);
    const b11 = m2.at(5);
    const b12 = m2.at(6);
    const b13 = m2.at(7);
    const b20 = m2.at(8);
    const b21 = m2.at(9);
    const b22 = m2.at(10);
    const b23 = m2.at(11);
    const b30 = m2.at(12);
    const b31 = m2.at(13);
    const b32 = m2.at(14);
    const b33 = m2.at(15);

    if (result) {
      result.init([
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ]);

      return result;
    } else {
      return new Matrix4([
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,

        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,

        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,

        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ]);
    }
  }

  public at(index: number): number {
    return this.values[index];
  }

  public init(values: number[]): Matrix4 {
    for (let i = 0; i < 16; i++) {
      this.values[i] = values[i];
    }

    return this;
  }

  public reset(): void {
    for (let i = 0; i < 16; i++) {
      this.values[i] = 0;
    }
  }

  public copy(dest: Matrix4 = null): Matrix4 {
    if (!dest) {
      return new Matrix4(
        this.values[0], this.values[1], this.values[2], this.values[3],
        this.values[4], this.values[5], this.values[6], this.values[7],
        this.values[8], this.values[9], this.values[10], this.values[11],
        this.values[12], this.values[13], this.values[14], this.values[15]
      );
    }

    for (let i = 0; i < 16; i++) {
      dest.values[i] = this.values[i];
    }

    return dest;
  }

  public all(): number[] {
    let data: number[] = [];
    for (let i = 0; i < 16; i++) {
      data[i] = this.values[i];
    }

    return data;
  }

  public row(index: number): number[] {
    return [
      this.values[index * 4 + 0],
      this.values[index * 4 + 1],
      this.values[index * 4 + 2],
      this.values[index * 4 + 3],
    ];
  }

  public col(index: number): number[] {
    return [
      this.values[index],
      this.values[index + 4],
      this.values[index + 8],
      this.values[index + 12],
    ];
  }

  public index(row: number, col: number) {
    return (row * 4) + col;
  }

  public entry(row: number, col: number) {
    // console.assert((row >= 0) && (row < Matrix4.dimension));
    // console.assert((col >= 0) && (col < Matrix4.dimension));

    return this.values[this.index(row, col)];
  }

  public setEntry(row: number, col: number, v: number) {
    this.values[this.index(row, col)] = v;

    return this;
  }

  public setValues(
    arg0: number,
    arg1: number,
    arg2: number,
    arg3: number,
    arg4: number,
    arg5: number,
    arg6: number,
    arg7: number,
    arg8: number,
    arg9: number,
    arg10: number,
    arg11: number,
    arg12: number,
    arg13: number,
    arg14: number,
    arg15: number) {
    this.values[0]  = arg0;
    this.values[1]  = arg1;
    this.values[2]  = arg2;
    this.values[3]  = arg3;
    this.values[4]  = arg4;
    this.values[5]  = arg5;
    this.values[6]  = arg6;
    this.values[7]  = arg7;
    this.values[8]  = arg8;
    this.values[9]  = arg9;
    this.values[10] = arg10;
    this.values[11] = arg11;
    this.values[12] = arg12;
    this.values[13] = arg13;
    this.values[14] = arg14;
    this.values[15] = arg15;

    return this;
  }

  public setFrom(arg: Matrix4) {
    this.values[0]  = arg.values[0];
    this.values[1]  = arg.values[1];
    this.values[2]  = arg.values[2];
    this.values[3]  = arg.values[3];
    this.values[4]  = arg.values[4];
    this.values[5]  = arg.values[5];
    this.values[6]  = arg.values[6];
    this.values[7]  = arg.values[7];
    this.values[8]  = arg.values[8];
    this.values[9]  = arg.values[9];
    this.values[10] = arg.values[10];
    this.values[11] = arg.values[11];
    this.values[12] = arg.values[12];
    this.values[13] = arg.values[13];
    this.values[14] = arg.values[14];
    this.values[15] = arg.values[15];

    return this;
  }

  public equals(matrix: Matrix4, threshold = EPSILON): boolean {
    for (let i = 0; i < 16; i++) {
      if (Math.abs(this.values[i] - matrix.at(i)) > threshold) {
        return false;
      }
    }

    return true;
  }

  public determinant(): number {
    const a00 = this.values[0],
          a01 = this.values[1],
          a02 = this.values[2],
          a03 = this.values[3];

    const a10 = this.values[4],
          a11 = this.values[5],
          a12 = this.values[6],
          a13 = this.values[7];

    const a20 = this.values[8],
          a21 = this.values[9],
          a22 = this.values[10],
          a23 = this.values[11];

    const a30 = this.values[12],
          a31 = this.values[13],
          a32 = this.values[14],
          a33 = this.values[15];

    const det00 = a00 * a11 - a01 * a10,
          det01 = a00 * a12 - a02 * a10,
          det02 = a00 * a13 - a03 * a10,
          det03 = a01 * a12 - a02 * a11,
          det04 = a01 * a13 - a03 * a11,
          det05 = a02 * a13 - a03 * a12,
          det06 = a20 * a31 - a21 * a30,
          det07 = a20 * a32 - a22 * a30,
          det08 = a20 * a33 - a23 * a30,
          det09 = a21 * a32 - a22 * a31,
          det10 = a21 * a33 - a23 * a31,
          det11 = a22 * a33 - a23 * a32;

    return (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);
  }

  public setIdentity(): Matrix4 {
    this.values[0]  = 1;
    this.values[1]  = 0;
    this.values[2]  = 0;
    this.values[3]  = 0;
    this.values[4]  = 0;
    this.values[5]  = 1;
    this.values[6]  = 0;
    this.values[7]  = 0;
    this.values[8]  = 0;
    this.values[9]  = 0;
    this.values[10] = 1;
    this.values[11] = 0;
    this.values[12] = 0;
    this.values[13] = 0;
    this.values[14] = 0;
    this.values[15] = 1;

    return this;
  }

  /**
   * 转置矩阵
   * Transpose the values of a {@class Matrix4}
   *
   * @returns
   */
  public transpose(): Matrix4 {
    const temp01 = this.values[1];
    const temp02 = this.values[2];
    const temp03 = this.values[3];
    const temp12 = this.values[6];
    const temp13 = this.values[7];
    const temp23 = this.values[11];

    this.values[1]  = this.values[4];
    this.values[2]  = this.values[8];
    this.values[3]  = this.values[12];
    this.values[4]  = temp01;
    this.values[6]  = this.values[9];
    this.values[7]  = this.values[13];
    this.values[8]  = temp02;
    this.values[9]  = temp12;
    this.values[11] = this.values[14];
    this.values[12] = temp03;
    this.values[13] = temp13;
    this.values[14] = temp23;

    return this;
  }

  public inverse(): Matrix4 {
    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a03 = this.values[3];
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a13 = this.values[7];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];
    const a23 = this.values[11];
    const a30 = this.values[12];
    const a31 = this.values[13];
    const a32 = this.values[14];
    const a33 = this.values[15];

    const det00 = a00 * a11 - a01 * a10;
    const det01 = a00 * a12 - a02 * a10;
    const det02 = a00 * a13 - a03 * a10;
    const det03 = a01 * a12 - a02 * a11;
    const det04 = a01 * a13 - a03 * a11;
    const det05 = a02 * a13 - a03 * a12;
    const det06 = a20 * a31 - a21 * a30;
    const det07 = a20 * a32 - a22 * a30;
    const det08 = a20 * a33 - a23 * a30;
    const det09 = a21 * a32 - a22 * a31;
    const det10 = a21 * a33 - a23 * a31;
    const det11 = a22 * a33 - a23 * a32;

    let det = (det00 * det11 - det01 * det10 + det02 * det09 + det03 * det08 - det04 * det07 + det05 * det06);

    if (!det) {
      return null;
    }

    det = 1.0 / det;

    this.values[0]  = (a11 * det11 - a12 * det10 + a13 * det09) * det;
    this.values[1]  = (-a01 * det11 + a02 * det10 - a03 * det09) * det;
    this.values[2]  = (a31 * det05 - a32 * det04 + a33 * det03) * det;
    this.values[3]  = (-a21 * det05 + a22 * det04 - a23 * det03) * det;
    this.values[4]  = (-a10 * det11 + a12 * det08 - a13 * det07) * det;
    this.values[5]  = (a00 * det11 - a02 * det08 + a03 * det07) * det;
    this.values[6]  = (-a30 * det05 + a32 * det02 - a33 * det01) * det;
    this.values[7]  = (a20 * det05 - a22 * det02 + a23 * det01) * det;
    this.values[8]  = (a10 * det10 - a11 * det08 + a13 * det06) * det;
    this.values[9]  = (-a00 * det10 + a01 * det08 - a03 * det06) * det;
    this.values[10] = (a30 * det04 - a31 * det02 + a33 * det00) * det;
    this.values[11] = (-a20 * det04 + a21 * det02 - a23 * det00) * det;
    this.values[12] = (-a10 * det09 + a11 * det07 - a12 * det06) * det;
    this.values[13] = (a00 * det09 - a01 * det07 + a02 * det06) * det;
    this.values[14] = (-a30 * det03 + a31 * det01 - a32 * det00) * det;
    this.values[15] = (a20 * det03 - a21 * det01 + a22 * det00) * det;

    return this;
  }

  /**
   * Calculates the adjugate of a {@class Matrix4}
   */
  public adjoint() {
    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a03 = this.values[3];
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a13 = this.values[7];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];
    const a23 = this.values[11];
    const a30 = this.values[12];
    const a31 = this.values[13];
    const a32 = this.values[14];
    const a33 = this.values[15];

    this.values[0]  =
      a11 * (a22 * a33 - a23 * a32) -
      a21 * (a12 * a33 - a13 * a32) +
      a31 * (a12 * a23 - a13 * a22);
    this.values[1]  = -(
      a01 * (a22 * a33 - a23 * a32) -
      a21 * (a02 * a33 - a03 * a32) +
      a31 * (a02 * a23 - a03 * a22)
    );
    this.values[2]  =
      a01 * (a12 * a33 - a13 * a32) -
      a11 * (a02 * a33 - a03 * a32) +
      a31 * (a02 * a13 - a03 * a12);
    this.values[3]  = -(
      a01 * (a12 * a23 - a13 * a22) -
      a11 * (a02 * a23 - a03 * a22) +
      a21 * (a02 * a13 - a03 * a12)
    );
    this.values[4]  = -(
      a10 * (a22 * a33 - a23 * a32) -
      a20 * (a12 * a33 - a13 * a32) +
      a30 * (a12 * a23 - a13 * a22)
    );
    this.values[5]  =
      a00 * (a22 * a33 - a23 * a32) -
      a20 * (a02 * a33 - a03 * a32) +
      a30 * (a02 * a23 - a03 * a22);
    this.values[6]  = -(
      a00 * (a12 * a33 - a13 * a32) -
      a10 * (a02 * a33 - a03 * a32) +
      a30 * (a02 * a13 - a03 * a12)
    );
    this.values[7]  =
      a00 * (a12 * a23 - a13 * a22) -
      a10 * (a02 * a23 - a03 * a22) +
      a20 * (a02 * a13 - a03 * a12);
    this.values[8]  =
      a10 * (a21 * a33 - a23 * a31) -
      a20 * (a11 * a33 - a13 * a31) +
      a30 * (a11 * a23 - a13 * a21);
    this.values[9]  = -(
      a00 * (a21 * a33 - a23 * a31) -
      a20 * (a01 * a33 - a03 * a31) +
      a30 * (a01 * a23 - a03 * a21)
    );
    this.values[10] =
      a00 * (a11 * a33 - a13 * a31) -
      a10 * (a01 * a33 - a03 * a31) +
      a30 * (a01 * a13 - a03 * a11);
    this.values[11] = -(
      a00 * (a11 * a23 - a13 * a21) -
      a10 * (a01 * a23 - a03 * a21) +
      a20 * (a01 * a13 - a03 * a11)
    );
    this.values[12] = -(
      a10 * (a21 * a32 - a22 * a31) -
      a20 * (a11 * a32 - a12 * a31) +
      a30 * (a11 * a22 - a12 * a21)
    );
    this.values[13] =
      a00 * (a21 * a32 - a22 * a31) -
      a20 * (a01 * a32 - a02 * a31) +
      a30 * (a01 * a22 - a02 * a21);
    this.values[14] = -(
      a00 * (a11 * a32 - a12 * a31) -
      a10 * (a01 * a32 - a02 * a31) +
      a30 * (a01 * a12 - a02 * a11)
    );
    this.values[15] =
      a00 * (a11 * a22 - a12 * a21) -
      a10 * (a01 * a22 - a02 * a21) +
      a20 * (a01 * a12 - a02 * a11);
    return this;
  }

  public multiply(matrix: Matrix4): Matrix4 {
    // @formatter:off

    const a00 =  this.values[0], a01 =  this.values[1], a02 =  this.values[2], a03 =  this.values[3];
    const a10 =  this.values[4], a11 =  this.values[5], a12 =  this.values[6], a13 =  this.values[7];
    const a20 =  this.values[8], a21 =  this.values[9], a22 = this.values[10], a23 = this.values[11];
    const a30 = this.values[12], a31 = this.values[13], a32 = this.values[14], a33 = this.values[15];

    // @formatter:on

    let b0 = matrix.at(0),
        b1 = matrix.at(1),
        b2 = matrix.at(2),
        b3 = matrix.at(3);

    this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = matrix.at(4);
    b1 = matrix.at(5);
    b2 = matrix.at(6);
    b3 = matrix.at(7);

    this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = matrix.at(8);
    b1 = matrix.at(9);
    b2 = matrix.at(10);
    b3 = matrix.at(11);

    this.values[8]  = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.values[9]  = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = matrix.at(12);
    b1 = matrix.at(13);
    b2 = matrix.at(14);
    b3 = matrix.at(15);

    this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    return this;
  }

  public multiplied(m: Matrix4) {
    return this.clone().multiply(m);
  }

  public transformVector4(v: Vector4) {
    const x  = v.x,
          y  = v.y,
          z  = v.z,
          w  = v.w;
    const _x = this.values[0] * x + this.values[1] * y + this.values[2] * z + this.values[3] * w;
    const _y = this.values[4] * x + this.values[5] * y + this.values[6] * z + this.values[7] * w;
    const _z = this.values[8] * x + this.values[9] * y + this.values[10] * z + this.values[11] * w;
    const _w = this.values[12] * x + this.values[13] * y + this.values[14] * z + this.values[15] * w;

    v.setValues(_x, _y, _z, _w);
    return v;
  }

  /// Rotates [arg] by the absolute rotation of [this]
  /// Returns [arg].

  public transformVector3(v: Vector3) {
    const x  = v.x,
          y  = v.y,
          z  = v.z;
    const _x = this.values[0] * x + this.values[1] * y + this.values[2] * z + this.values[3];
    const _y = this.values[4] * x + this.values[5] * y + this.values[6] * z + this.values[7];
    const _z = this.values[8] * x + this.values[9] * y + this.values[10] * z + this.values[11];

    v.setValues(_x, _y, _z);
    return v;
  }

  public toMatrix3(): Matrix3 {
    return new Matrix3([
      this.values[0],
      this.values[1],
      this.values[2],
      this.values[4],
      this.values[5],
      this.values[6],
      this.values[8],
      this.values[9],
      this.values[10],
    ]);
  }

  public toInverseMatrix3(): Matrix3 {
    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];

    const det01 = a22 * a11 - a12 * a21;
    const det11 = -a22 * a10 + a12 * a20;
    const det21 = a21 * a10 - a11 * a20;

    let det = a00 * det01 + a01 * det11 + a02 * det21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;

    return new Matrix3([
      det01 * det,
      (-a22 * a01 + a02 * a21) * det,
      (a12 * a01 - a02 * a11) * det,
      det11 * det,
      (a22 * a00 - a02 * a20) * det,
      (-a12 * a00 + a02 * a10) * det,
      det21 * det,
      (-a21 * a00 + a01 * a20) * det,
      (a11 * a00 - a01 * a10) * det,
    ]);
  }

  public translate(vector: Vector3): Matrix4 {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;

    this.values[12] += this.values[0] * x + this.values[4] * y + this.values[8] * z;
    this.values[13] += this.values[1] * x + this.values[5] * y + this.values[9] * z;
    this.values[14] += this.values[2] * x + this.values[6] * y + this.values[10] * z;
    this.values[15] += this.values[3] * x + this.values[7] * y + this.values[11] * z;

    return this;
  }

  public scale(vector: Vector3): Matrix4 {
    const x = vector.x;
    const y = vector.y;
    const z = vector.z;

    this.values[0] *= x;
    this.values[1] *= x;
    this.values[2] *= x;
    this.values[3] *= x;

    this.values[4] *= y;
    this.values[5] *= y;
    this.values[6] *= y;
    this.values[7] *= y;

    this.values[8] *= z;
    this.values[9] *= z;
    this.values[10] *= z;
    this.values[11] *= z;

    return this;
  }

  public rotate(radians: number, axis: Vector3): Matrix4 {
    let x = axis.x;
    let y = axis.y;
    let z = axis.z;

    let length = Math.sqrt(x * x + y * y + z * z);

    if (!length) {
      return null;
    }

    if (length !== 1) {
      length = 1 / length;
      x *= length;
      y *= length;
      z *= length;
    }

    const s = Math.sin(radians);
    const c = Math.cos(radians);

    const t = 1.0 - c;

    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a03 = this.values[3];
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a13 = this.values[7];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];
    const a23 = this.values[11];

    const b00 = x * x * t + c;
    const b01 = y * x * t + z * s;
    const b02 = z * x * t - y * s;
    const b10 = x * y * t - z * s;
    const b11 = y * y * t + c;
    const b12 = z * y * t + x * s;
    const b20 = x * z * t + y * s;
    const b21 = y * z * t - x * s;
    const b22 = z * z * t + c;

    this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
    this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
    this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
    this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;

    this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
    this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
    this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
    this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;

    this.values[8]  = a00 * b20 + a10 * b21 + a20 * b22;
    this.values[9]  = a01 * b20 + a11 * b21 + a21 * b22;
    this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
    this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;

    return this;
  }

  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param  rad
   * @returns
   */
  public rotateX(rad: number): Matrix4 {
    const s   = Math.sin(rad);
    const c   = Math.cos(rad);
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a13 = this.values[7];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];
    const a23 = this.values[11];

    // Perform axis-specific matrix multiplication
    this.values[4]  = a10 * c + a20 * s;
    this.values[5]  = a11 * c + a21 * s;
    this.values[6]  = a12 * c + a22 * s;
    this.values[7]  = a13 * c + a23 * s;
    this.values[8]  = a20 * c - a10 * s;
    this.values[9]  = a21 * c - a11 * s;
    this.values[10] = a22 * c - a12 * s;
    this.values[11] = a23 * c - a13 * s;
    return this;
  }

  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param  rad the angle to rotate the matrix by
   * @returns
   */
  public rotateY(rad: number) {
    const s   = Math.sin(rad);
    const c   = Math.cos(rad);
    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a03 = this.values[3];
    const a20 = this.values[8];
    const a21 = this.values[9];
    const a22 = this.values[10];
    const a23 = this.values[11];

    // Perform axis-specific matrix multiplication
    this.values[0]  = a00 * c - a20 * s;
    this.values[1]  = a01 * c - a21 * s;
    this.values[2]  = a02 * c - a22 * s;
    this.values[3]  = a03 * c - a23 * s;
    this.values[8]  = a00 * s + a20 * c;
    this.values[9]  = a01 * s + a21 * c;
    this.values[10] = a02 * s + a22 * c;
    this.values[11] = a03 * s + a23 * c;
    return this;
  }

  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param  rad the angle to rotate the matrix by
   * @returns
   */
  public rotateZ(rad: number) {
    const s   = Math.sin(rad);
    const c   = Math.cos(rad);
    const a00 = this.values[0];
    const a01 = this.values[1];
    const a02 = this.values[2];
    const a03 = this.values[3];
    const a10 = this.values[4];
    const a11 = this.values[5];
    const a12 = this.values[6];
    const a13 = this.values[7];

    // Perform axis-specific matrix multiplication
    this.values[0] = a00 * c + a10 * s;
    this.values[1] = a01 * c + a11 * s;
    this.values[2] = a02 * c + a12 * s;
    this.values[3] = a03 * c + a13 * s;
    this.values[4] = a10 * c - a00 * s;
    this.values[5] = a11 * c - a01 * s;
    this.values[6] = a12 * c - a02 * s;
    this.values[7] = a13 * c - a03 * s;
    return this;
  }

  /**
   * TODO
   * @param radians
   */
  public setRotationX(radians: number) {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    this.values[0] = 1;
    this.values[1] = 0;
    this.values[2] = 0;

    this.values[4] = 0;
    this.values[5] = c;
    this.values[6] = -s;

    this.values[8]  = 0;
    this.values[9]  = s;
    this.values[10] = c;

    this.values[12] = 0;
    this.values[13] = 0;
    this.values[14] = 0;

    return this;
  }

  /**
   * TODO
   * @param radians
   */
  public setRotationY(radians: number) {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    this.values[0] = c;
    this.values[1] = 0;
    this.values[2] = s;
    this.values[3] = 0;

    this.values[4] = 0;
    this.values[5] = 1;
    this.values[6] = 0;
    this.values[7] = 0;

    this.values[8]  = -s;
    this.values[9]  = 0;
    this.values[10] = c;
    this.values[11] = 0;

    return this;
  }

  /**
   * TODO
   * @param radians
   */
  public setRotationZ(radians: number) {
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    this.values[0] = c;
    this.values[1] = -s;
    this.values[2] = 0;

    this.values[4] = s;
    this.values[5] = c;
    this.values[6] = 0;

    this.values[8]  = 0;
    this.values[9]  = 0;
    this.values[10] = 1;

    this.values[12] = 0;
    this.values[13] = 0;
    this.values[14] = 0;
  }

  public rotateVector3(v: Vector3) {
    v.setValues(
      this.values[0] * v.x + this.values[1] * v.y + this.values[2] * v.z,
      this.values[4] * v.x + this.values[5] * v.y + this.values[6] * v.z,
      this.values[8] * v.x + this.values[9] * v.y + this.values[10] * v.z
    );

    return v;
  }

  public rotated3(v: Vector3, out?: Vector3) {
    if (!out) {
      out = v.clone();
    } else {
      out.setFrom(v);
    }
    return this.rotateVector3(out);
  }

  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @return
   */
  public getTranslation() {
    return new Vector3(
      this.values[12],
      this.values[13],
      this.values[14]
    );
  }

  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @return
   */
  public getScaling() {
    const m11 = this.values[0];
    const m12 = this.values[1];
    const m13 = this.values[2];
    const m21 = this.values[4];
    const m22 = this.values[5];
    const m23 = this.values[6];
    const m31 = this.values[8];
    const m32 = this.values[9];
    const m33 = this.values[10];

    return new Vector3(
      Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13),
      Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23),
      Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33)
    );
  }

  /**
   * Returns a Quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned Quaternion will be the
   *  same as the Quaternion originally supplied.
   * @return
   */
  public getRotation() {
    const out = [];

    // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    const trace = this.values[0] + this.values[5] + this.values[10];
    let S       = 0;

    if (trace > 0) {
      S      = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (this.values[6] - this.values[9]) / S;
      out[1] = (this.values[8] - this.values[2]) / S;
      out[2] = (this.values[1] - this.values[4]) / S;
    } else if (this.values[0] > this.values[5] && this.values[0] > this.values[10]) {
      S      = Math.sqrt(1.0 + this.values[0] - this.values[5] - this.values[10]) * 2;
      out[3] = (this.values[6] - this.values[9]) / S;
      out[0] = 0.25 * S;
      out[1] = (this.values[1] + this.values[4]) / S;
      out[2] = (this.values[8] + this.values[2]) / S;
    } else if (this.values[5] > this.values[10]) {
      S      = Math.sqrt(1.0 + this.values[5] - this.values[0] - this.values[10]) * 2;
      out[3] = (this.values[8] - this.values[2]) / S;
      out[0] = (this.values[1] + this.values[4]) / S;
      out[1] = 0.25 * S;
      out[2] = (this.values[6] + this.values[9]) / S;
    } else {
      S      = Math.sqrt(1.0 + this.values[10] - this.values[0] - this.values[5]) * 2;
      out[3] = (this.values[1] - this.values[4]) / S;
      out[0] = (this.values[8] + this.values[2]) / S;
      out[1] = (this.values[6] + this.values[9]) / S;
      out[2] = 0.25 * S;
    }

    return new Quaternion(out);
  }

  /// Primarily used by AABB transformation code.
  public absoluteRotate(v: Vector3): Vector3 {
    const m00 = Math.abs(this.values[0]);
    const m01 = Math.abs(this.values[1]);
    const m02 = Math.abs(this.values[2]);
    const m10 = Math.abs(this.values[4]);
    const m11 = Math.abs(this.values[5]);
    const m12 = Math.abs(this.values[6]);
    const m20 = Math.abs(this.values[8]);
    const m21 = Math.abs(this.values[9]);
    const m22 = Math.abs(this.values[10]);

    const x = v.x;
    const y = v.y;
    const z = v.z;
    v.setValues(
      x * m00 + y * m01 + z * m02,
      x * m10 + y * m11 + z * m12,
      x * m20 + y * m21 + z * m22
    );
    return v;
  }

  /**
   * Adds two mat4's
   *
   * @param  matrix the second operand
   * @returns   out
   */
  public add(matrix: Matrix4) {
    this.values[0]  = this.values[0] + matrix.at(0);
    this.values[1]  = this.values[1] + matrix.at(1);
    this.values[2]  = this.values[2] + matrix.at(2);
    this.values[3]  = this.values[3] + matrix.at(3);
    this.values[4]  = this.values[4] + matrix.at(4);
    this.values[5]  = this.values[5] + matrix.at(5);
    this.values[6]  = this.values[6] + matrix.at(6);
    this.values[7]  = this.values[7] + matrix.at(7);
    this.values[8]  = this.values[8] + matrix.at(8);
    this.values[9]  = this.values[9] + matrix.at(9);
    this.values[10] = this.values[10] + matrix.at(10);
    this.values[11] = this.values[11] + matrix.at(11);
    this.values[12] = this.values[12] + matrix.at(12);
    this.values[13] = this.values[13] + matrix.at(13);
    this.values[14] = this.values[14] + matrix.at(14);
    this.values[15] = this.values[15] + matrix.at(15);
    return this;
  }

  /**
   * Subtracts matrix b from matrix a
   *
   * @param  matrix the second operand
   * @returns
   */
  public subtract(matrix: Matrix4) {
    this.values[0]  = this.values[0] - matrix.at(0);
    this.values[1]  = this.values[1] - matrix.at(1);
    this.values[2]  = this.values[2] - matrix.at(2);
    this.values[3]  = this.values[3] - matrix.at(3);
    this.values[4]  = this.values[4] - matrix.at(4);
    this.values[5]  = this.values[5] - matrix.at(5);
    this.values[6]  = this.values[6] - matrix.at(6);
    this.values[7]  = this.values[7] - matrix.at(7);
    this.values[8]  = this.values[8] - matrix.at(8);
    this.values[9]  = this.values[9] - matrix.at(9);
    this.values[10] = this.values[10] - matrix.at(10);
    this.values[11] = this.values[11] - matrix.at(11);
    this.values[12] = this.values[12] - matrix.at(12);
    this.values[13] = this.values[13] - matrix.at(13);
    this.values[14] = this.values[14] - matrix.at(14);
    this.values[15] = this.values[15] - matrix.at(15);
    return this;
  }

  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param  scalar amount to scale the matrix's elements by
   * @returns   out
   */
  public multiplyScalar(scalar: number) {
    this.values[0]  = this.values[0] * scalar;
    this.values[1]  = this.values[1] * scalar;
    this.values[2]  = this.values[2] * scalar;
    this.values[3]  = this.values[3] * scalar;
    this.values[4]  = this.values[4] * scalar;
    this.values[5]  = this.values[5] * scalar;
    this.values[6]  = this.values[6] * scalar;
    this.values[7]  = this.values[7] * scalar;
    this.values[8]  = this.values[8] * scalar;
    this.values[9]  = this.values[9] * scalar;
    this.values[10] = this.values[10] * scalar;
    this.values[11] = this.values[11] * scalar;
    this.values[12] = this.values[12] * scalar;
    this.values[13] = this.values[13] * scalar;
    this.values[14] = this.values[14] * scalar;
    this.values[15] = this.values[15] * scalar;
    return this;
  }

  /**
   * Clone
   *
   * @returns   A new {@class Matrix3}
   */
  public clone() {
    return this.copy();
  }

}
