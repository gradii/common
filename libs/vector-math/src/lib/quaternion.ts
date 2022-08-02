/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import { EPSILON } from './common';
import { Matrix3 } from './matrix3';
import { Matrix4 } from './matrix4';
import { Vector3 } from './vector3';
import { Vector4 } from './vector4';

export class Quaternion {
  private values = new Float32Array(4);

  constructor(values: number[] = null) {
    if (values) {
      this.xyzw = values;
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

  public static sum(q1: Quaternion, q2: Quaternion, out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    out.x = q1.x + q2.x;
    out.y = q1.y + q2.y;
    out.z = q1.z + q2.z;
    out.w = q1.w + q2.w;

    return out;
  }

  public static product(q1: Quaternion, q2: Quaternion, out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    const q1x = q1.x,
          q1y = q1.y,
          q1z = q1.z,
          q1w = q1.w,

          q2x = q2.x,
          q2y = q2.y,
          q2z = q2.z,
          q2w = q2.w;

    out.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
    out.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
    out.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
    out.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

    return out;
  }

  public static cross(q1: Quaternion, q2: Quaternion, out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    const q1x = q1.x,
          q1y = q1.y,
          q1z = q1.z,
          q1w = q1.w,

          q2x = q2.x,
          q2y = q2.y,
          q2z = q2.z,
          q2w = q2.w;

    out.x = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
    out.y = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
    out.z = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
    out.w = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;

    return out;
  }

  public static shortMix(q1: Quaternion, q2: Quaternion, time: number,
                         out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    if (time <= 0.0) {
      out.xyzw = q1.xyzw;

      return out;
    } else if (time >= 1.0) {
      out.xyzw = q2.xyzw;

      return out;
    }

    let cos = Quaternion.dot(q1, q2),
        q2a = q2.copy();

    if (cos < 0.0) {
      q2a.inverse();
      cos = -cos;
    }

    let k0: number,
        k1: number;

    if (cos > 0.9999) {
      k0 = 1 - time;
      k1 = 0 + time;
    } else {
      const sin: number   = Math.sqrt(1 - cos * cos);
      const angle: number = Math.atan2(sin, cos);

      const oneOverSin: number = 1 / sin;

      k0 = Math.sin((1 - time) * angle) * oneOverSin;
      k1 = Math.sin((0 + time) * angle) * oneOverSin;
    }

    out.x = k0 * q1.x + k1 * q2a.x;
    out.y = k0 * q1.y + k1 * q2a.y;
    out.z = k0 * q1.z + k1 * q2a.z;
    out.w = k0 * q1.w + k1 * q2a.w;

    return out;
  }

  public static mix(q1: Quaternion, q2: Quaternion, time: number,
                    out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    const cosHalfTheta = q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;

    if (Math.abs(cosHalfTheta) >= 1.0) {
      out.xyzw = q1.xyzw;

      return out;
    }

    const halfTheta    = Math.acos(cosHalfTheta),
          sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      out.x = q1.x * 0.5 + q2.x * 0.5;
      out.y = q1.y * 0.5 + q2.y * 0.5;
      out.z = q1.z * 0.5 + q2.z * 0.5;
      out.w = q1.w * 0.5 + q2.w * 0.5;

      return out;
    }

    const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta,
          ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

    out.x = q1.x * ratioA + q2.x * ratioB;
    out.y = q1.y * ratioA + q2.y * ratioB;
    out.z = q1.z * ratioA + q2.z * ratioB;
    out.w = q1.w * ratioA + q2.w * ratioB;

    return out;
  }

  public static fromAxis(axis: Vector3, angle: number, out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    angle *= 0.5;
    const sin = Math.sin(angle);

    out.x = axis.x * sin;
    out.y = axis.y * sin;
    out.z = axis.z * sin;
    out.w = Math.cos(angle);

    return out;
  }

  public static dot(q1: Quaternion, q2: Quaternion): number {
    return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
  }

  public static lerp(a: Quaternion, b: Quaternion, t: number, result?: Quaternion) {
    if (!result) {
      result = new Quaternion();
    }

    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const aw = a.w;

    result.values[0] = ax + t * (b.x - ax);
    result.values[1] = ay + t * (b.y - ay);
    result.values[2] = az + t * (b.z - az);
    result.values[3] = aw + t * (b.w - aw);
    return result;
  }

  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param  a the first operand
   * @param  b the second operand
   * @param  t interpolation amount between the two inputs
   * @param  out the receiving Quaternion
   * @returns   out
   */
  public static slerp(a: Quaternion, b: Quaternion, t: number, out: Quaternion = null) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    if (!out) {
      out = new Quaternion();
    }

    const ax = a.x;
    const ay = a.y;
    const az = a.z;
    const aw = a.w;
    let bx   = b.x;
    let by   = b.y;
    let bz   = b.z;
    let bw   = b.w;

    let omega;
    let cosom;
    let sinom;
    let scale0;
    let scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
      cosom = -cosom;
      bx    = -bx;
      by    = -by;
      bz    = -bz;
      bw    = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > 0.000001) {
      // standard case (slerp)
      omega  = Math.acos(cosom);
      sinom  = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    }
    // calculate final values
    out.values[0] = scale0 * ax + scale1 * bx;
    out.values[1] = scale0 * ay + scale1 * by;
    out.values[2] = scale0 * az + scale1 * bz;
    out.values[3] = scale0 * aw + scale1 * bw;

    return out;
  }

  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param  out the receiving Quaternion
   * @param  a the first operand
   * @param  b the second operand
   * @param  c the third operand
   * @param  d the fourth operand
   * @param  t interpolation amount
   * @returns   out
   */
  public static sqlerp(
    a: Quaternion,
    b: Quaternion,
    c: Quaternion,
    d: Quaternion,
    t: number,
    out: Quaternion = null
  ) {
    if (!out) {
      out = new Quaternion();
    }

    const temp1 = new Quaternion();
    const temp2 = new Quaternion();

    Quaternion.slerp(a, d, t, temp1);
    Quaternion.slerp(b, c, t, temp2);
    Quaternion.slerp(temp1, temp2, 2 * t * (1 - t), out);

    return out;
  }

  /**
   * Creates a Quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant Quaternion is not normalized, so you should be sure
   * to renormalize the Quaternion yourself where necessary.
   *
   * @param  out the receiving Quaternion
   * @param  m rotation matrix
   * @returns   out
   */
  public static fromMatrix3(m: Matrix3, out?: Quaternion) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    if (!out) {
      out = new Quaternion();
    }

    const fTrace = m.at(0) + m.at(4) + m.at(8);
    let fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot         = Math.sqrt(fTrace + 1.0); // 2w
      out.values[3] = 0.5 * fRoot;
      fRoot         = 0.5 / fRoot; // 1/(4w)
      out.values[0] = (m.at(5) - m.at(7)) * fRoot;
      out.values[1] = (m.at(6) - m.at(2)) * fRoot;
      out.values[2] = (m.at(1) - m.at(3)) * fRoot;
    } else {
      // |w| <= 1/2
      let i = 0;
      if (m.at(4) > m.at(0)) {
        i = 1;
      }
      if (m.at(8) > m.at(i * 3 + i)) {
        i = 2;
      }
      const j = (i + 1) % 3;
      const k = (i + 2) % 3;

      fRoot         = Math.sqrt(m.at(i * 3 + i) - m.at(j * 3 + j) - m.at(k * 3 + k) + 1.0);
      out.values[i] = 0.5 * fRoot;
      fRoot         = 0.5 / fRoot;
      out.values[3] = (m.at(j * 3 + k) - m.at(k * 3 + j)) * fRoot;
      out.values[j] = (m.at(j * 3 + i) + m.at(i * 3 + j)) * fRoot;
      out.values[k] = (m.at(k * 3 + i) + m.at(i * 3 + k)) * fRoot;
    }

    return out;
  }

  public at(index: number): number {
    return this.values[index];
  }

  public reset(): void {
    for (let i = 0; i < 4; i++) {
      this.values[i] = 0;
    }
  }

  public copy(out: Quaternion = null): Quaternion {
    if (!out) {
      out = new Quaternion();
    }

    for (let i = 0; i < 4; i++) {
      out.values[i] = this.values[i];
    }

    return out;
  }

  public roll(): number {
    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    return Math.atan2(2.0 * (x * y + w * z), w * w + x * x - y * y - z * z);
  }

  public pitch(): number {
    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    return Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z);
  }

  public yaw(): number {
    return Math.asin(2.0 * (this.x * this.z - this.w * this.y));
  }

  public equals(vector: Quaternion, threshold = EPSILON): boolean {
    for (let i = 0; i < 4; i++) {
      if (Math.abs(this.values[i] - vector.at(i)) > threshold) {
        return false;
      }
    }

    return true;
  }

  public identity(): Quaternion {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 1;

    return this;
  }

  public inverse(): Quaternion {
    const dot = Quaternion.dot(this, this);

    if (!dot) {
      this.xyzw = [0, 0, 0, 0];

      return this;
    }

    const invDot = dot ? 1.0 / dot : 0;

    this.x *= -invDot;
    this.y *= -invDot;
    this.z *= -invDot;
    this.w *= invDot;

    return this;
  }

  public conjugate(): Quaternion {
    this.values[0] *= -1;
    this.values[1] *= -1;
    this.values[2] *= -1;

    return this;
  }

  public length(): number {
    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    return Math.sqrt(x * x + y * y + z * z + w * w);
  }

  public normalize(out: Quaternion = null): Quaternion {
    if (!out) {
      out = this;
    }

    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    let length = Math.sqrt(x * x + y * y + z * z + w * w);

    if (!length) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 0;

      return out;
    }

    length = 1 / length;

    out.x = x * length;
    out.y = y * length;
    out.z = z * length;
    out.w = w * length;

    return out;
  }

  public add(other: Quaternion): Quaternion {
    for (let i = 0; i < 4; i++) {
      this.values[i] += other.at(i);
    }

    return this;
  }

  /**
   * Multiplies with another {@class Quaternion}
   *
   * @param  other
   * @returns
   */
  public multiply(other: Quaternion): Quaternion {
    const q1x = this.x,
          q1y = this.y,
          q1z = this.z,
          q1w = this.w;

    const q2x = other.x,
          q2y = other.y,
          q2z = other.z,
          q2w = other.w;

    this.x = q1x * q2w + q1w * q2x + q1y * q2z - q1z * q2y;
    this.y = q1y * q2w + q1w * q2y + q1z * q2x - q1x * q2z;
    this.z = q1z * q2w + q1w * q2z + q1x * q2y - q1y * q2x;
    this.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;

    return this;
  }

  // /**
  //  * Sets a Quaternion to represent the shortest rotation from one
  //  * vector to another.
  //  *
  //  * Both vectors are assumed to be unit length.
  //  *
  //  * @param  out the receiving Quaternion.
  //  * @param  a the initial vector
  //  * @param  b the outination vector
  //  * @returns   out
  //  */
  // public static rotationTo(a: Vector3, b: Vector3, out: Quaternion = null) {
  //   if (!out) {
  //     out = new Quaternion();
  //   }
  //
  //   const tmpvec3   = new Vector3();
  //   const xUnitVec3 = new Vector3([1, 0, 0]);
  //   const yUnitVec3 = new Vector3([0, 1, 0]);
  //
  //   const d = Vector3.dot(a, b);
  //   if (d < -0.999999) {
  //     Vector3.cross(xUnitVec3, a, tmpvec3);
  //     if (tmpvec3.length < 0.000001) {
  //       Vector3.cross(yUnitVec3, a, tmpvec3);
  //     }
  //     tmpvec3.normalize();
  //     out.setAxisAngle(tmpvec3, Math.PI);
  //     return out;
  //   } else if (d > 0.999999) {
  //     out[0] = 0;
  //     out[1] = 0;
  //     out[2] = 0;
  //     out[3] = 1;
  //     return out;
  //   } else {
  //     Vector3.cross(a, b, tmpvec3);
  //     out[0] = tmpvec3[0];
  //     out[1] = tmpvec3[1];
  //     out[2] = tmpvec3[2];
  //     out[3] = 1 + d;
  //     return out.normalize();
  //   }
  // }

  public multiplyVector3(vector: Vector3, out: Vector3 = null): Vector3 {
    if (!out) {
      out = new Vector3();
    }

    const x = vector.x,
          y = vector.y,
          z = vector.z;

    const qx = this.x,
          qy = this.y,
          qz = this.z,
          qw = this.w;

    const ix = qw * x + qy * z - qz * y,
          iy = qw * y + qz * x - qx * z,
          iz = qw * z + qx * y - qy * x,
          iw = -qx * x - qy * y - qz * z;

    out.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return out;
  }

  /**
   * Rotates a Quaternion by the given angle about the X axis
   *
   * @param  rad
   */
  public rotateX(rad: number) {
    rad *= 0.5;

    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const aw = this.w;
    const bx = Math.sin(rad);
    const bw = Math.cos(rad);

    this.x = ax * bw + aw * bx;
    this.y = ay * bw + az * bx;
    this.z = az * bw - ay * bx;
    this.w = aw * bw - ax * bx;
    return this;
  }

  /**
   * Rotates a Quaternion by the given angle about the Y axis
   *
   * @param  rad angle (in radians) to rotate
   * @returns   out
   */
  public rotateY(rad: number) {
    rad *= 0.5;

    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const aw = this.w;
    const by = Math.sin(rad);
    const bw = Math.cos(rad);

    this.x = ax * bw - az * by;
    this.y = ay * bw + aw * by;
    this.z = az * bw + ax * by;
    this.w = aw * bw - ay * by;
    return this;
  }

  /**
   * Rotates a Quaternion by the given angle about the Z axis
   *
   * @param  rad angle (in radians) to rotate
   * @returns
   */
  public rotateZ(rad: number) {
    rad *= 0.5;

    const ax = this.x;
    const ay = this.y;
    const az = this.z;
    const aw = this.w;
    const bz = Math.sin(rad);
    const bw = Math.cos(rad);

    this.x = ax * bw + ay * bz;
    this.y = ay * bw - ax * bz;
    this.z = az * bw + aw * bz;
    this.w = aw * bw - az * bz;
    return this;
  }

  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that Quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @returns
   */
  public calculateW(a: Quaternion) {
    const x = this.x;
    const y = this.y;
    const z = this.z;

    this.w = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return this;
  }

  public toMatrix3(out: Matrix3 = null): Matrix3 {
    if (!out) {
      out = new Matrix3();
    }

    const x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;

    const x2 = x + x,
          y2 = y + y,
          z2 = z + z;

    const xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;

    out.init([
      1 - (yy + zz),
      xy + wz,
      xz - wy,

      xy - wz,
      1 - (xx + zz),
      yz + wx,

      xz + wy,
      yz - wx,
      1 - (xx + yy),
    ]);

    return out;
  }

  public toMatrix4(out: Matrix4 = null): Matrix4 {
    if (!out) {
      out = new Matrix4();
    }

    const x  = this.x,
          y  = this.y,
          z  = this.z,
          w  = this.w,

          x2 = x + x,
          y2 = y + y,
          z2 = z + z,

          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;

    out.init([
      1 - (yy + zz),
      xy + wz,
      xz - wy,
      0,

      xy - wz,
      1 - (xx + zz),
      yz + wx,
      0,

      xz + wy,
      yz - wx,
      1 - (xx + yy),
      0,

      0,
      0,
      0,
      1,
    ]);

    return out;
  }

  /**
   * Sets the specified Quaternion with values corresponding to the given
   * axes. Each axis is a Vector3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param  view  the vector representing the viewing direction
   * @param  right the vector representing the local "right" direction
   * @param  up    the vector representing the local "up" direction
   * @returns   out
   */
  public setAxes(
    view: Vector3,
    right: Vector3,
    up: Vector3
  ): Quaternion {
    const out = new Matrix3(
      right.x, up.x, -view.x,
      right.y, up.y, -view.y,
      right.z, up.z, -view.z
    );

    return Quaternion.fromMatrix3(out, this).normalize();
  }

  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param  axis the axis around which to rotate
   * @param  rad the angle in radians
   * @returns
   */
  public setAxisAngle(axis: Vector3, rad: number) {
    rad            = rad * 0.5;
    const s        = Math.sin(rad);
    this.values[0] = s * axis.x;
    this.values[1] = s * axis.y;
    this.values[2] = s * axis.z;
    this.values[3] = Math.cos(rad);
    return this;
  }

  /**
   * Gets the rotation axis and angle for a given
   *  Quaternion. If a Quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The Quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the Quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @return
   */
  public getAxisAngle() {
    const rad = Math.acos(this.w) * 2.0;
    const s   = Math.sin(rad / 2.0);
    if (s !== 0.0) {
      return new Vector4([
        this.x / s,
        this.y / s,
        this.z / s,
        rad,
      ]);
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      return new Vector4([
        1, 0, 0, rad,
      ]);
    }
  }

  public clone() {
    return this.copy();
  }
}
