/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */
import { Vector3 } from './vector3';


export class BezierCurve3 {
  point0: Vector3;
  point1: Vector3;
  point2: Vector3;
  point3: Vector3;

  getPoints() {
    return [
      this.point0,
      this.point1,
      this.point2,
      this.point3,
    ];
  }

  getSource(): Vector3 {
    return this.point0;
  }

  getSourceControl(): Vector3 {
    return this.point1;
  }

  getTargetControl(): Vector3 {
    return this.point2;
  }

  getTarget(): Vector3 {
    return this.point3;
  }

  setSource(point: Vector3) {
    this.point0 = point;
  }

  setSourceControl(point: Vector3) {
    this.point1 = point;
  }

  setTargetControl(point: Vector3) {
    this.point2 = point;
  }

  setTarget(point: Vector3) {
    this.point3 = point;
  }
}
