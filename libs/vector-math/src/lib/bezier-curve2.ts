/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */
import { Vector2 } from './vector2';


export class BezierCurve2 {
  point0: Vector2;
  point1: Vector2;
  point2: Vector2;
  point3: Vector2;

  constructor() {
  }

  getPoints() {
    return [
      this.point0,
      this.point1,
      this.point2,
      this.point3,
    ];
  }

  getSource(): Vector2 {
    return this.point0;
  }

  getSourceControl(): Vector2 {
    return this.point1;
  }

  getTargetControl(): Vector2 {
    return this.point2;
  }

  getTarget(): Vector2 {
    return this.point3;
  }

  setSource(point: Vector2) {
    this.point0 = point;
  }

  setSourceControl(point: Vector2) {
    this.point1 = point;
  }

  setTargetControl(point: Vector2) {
    this.point2 = point;
  }

  setTarget(point: Vector2) {
    this.point3 = point;
  }
}
