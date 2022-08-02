/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

import {
  cubicDerivative, cubicPoint, getCubicArcLength, getQuadraticArcLength, quadraticDerivative,
  quadraticPoint, t2length
} from '../helper/bezier-functions';
import { Point } from '../helper/types';
import { Polygon } from '../polygon/polygon';
import { Vector2 } from '../vector2';

export class BezierCurve {
  protected points: Vector2[];

  constructor() {
    this.points = [new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 0)];
  }

  public getTotalLength() {
    const points = this._getPoints();
    return this._getArcLength(points, 1);
  }

  public getPointAtLength(length: number) {
    const points = this._getPoints();
    const t      = t2length(length, this.getTotalLength(), i => this._getArcLength(points, i));

    return this._getPoint(points, t);
  }

  public getTangentAtLength(length: number) {
    const points = this._getPoints();
    const t      = t2length(length, this.getTotalLength(), i => this._getArcLength(points, i));

    const derivative = this._getDerivative(points, t);
    const mdl        = Math.sqrt(derivative.x * derivative.x + derivative.y * derivative.y);
    let tangent: Point;
    if (mdl > 0) {
      tangent = {x: derivative.x / mdl, y: derivative.y / mdl};
    } else {
      tangent = {x: 0, y: 0};
    }
    return tangent;
  }

  public getPropertiesAtLength(length: number) {
    const points = this._getPoints();
    const t      = t2length(length, this.getTotalLength(), i => this._getArcLength(points, i));

    const derivative = this._getDerivative(points, t);
    const mdl        = Math.sqrt(derivative.x * derivative.x + derivative.y * derivative.y);
    let tangent: Point;
    if (mdl > 0) {
      tangent = {x: derivative.x / mdl, y: derivative.y / mdl};
    } else {
      tangent = {x: 0, y: 0};
    }
    const point = this._getPoint(points, t);
    return {x: point.x, y: point.y, tangentX: tangent.x, tangentY: tangent.y};
  };

  _getPoints() {
    if (this.getSourceControl().equals(this.getTargetControl())) {
      return [this.getSource(), this.getSourceControl(), this.getTarget()];
    } else {
      return [this.getSource(), this.getSourceControl(), this.getTargetControl(), this.getTarget()];
    }
  }

  _getArcLength(points: Vector2[], t: number): number {
    if (points.length === 3) {
      return getQuadraticArcLength(points, t);
    }
    return getCubicArcLength(points, t);
  }

  _getPoint(points: Vector2[], t: number): Vector2 {
    if (points.length === 3) {
      return quadraticPoint(points, t);
    }
    return cubicPoint(points, t);
  }

  _getDerivative(points: Vector2[], t: number): Vector2 {
    if (points.length === 3) {
      return quadraticDerivative(points, t);
    }
    return cubicDerivative(points, t);
  }

  getSVGCurve(): string {
    // tslint:disable-next-line:max-line-length
    const source        = this.getSource();
    const sourceControl = this.getSourceControl();
    const targetControl = this.getTargetControl();
    const target        = this.getTarget();

    // tslint:disable-next-line:max-line-length
    return `M${source.x} ${source.y} C${sourceControl.x} ${sourceControl.y}, ${targetControl.x} ${targetControl.y}, ${target.x} ${target.y}`;
  }

  setPoints(points: Vector2[]) {
    if (points.length !== 4) {
      throw new Error('BezierCurve must have extactly 4 points');
    }
    this.points = points;
  }

  getSource(): Vector2 {
    return this.points[0];
  }

  getSourceControl(): Vector2 {
    return this.points[1];
  }

  getTargetControl(): Vector2 {
    return this.points[2];
  }

  getTarget(): Vector2 {
    return this.points[3];
  }

  setSource(point: Vector2) {
    this.points[0] = point;
  }

  setSourceControl(point: Vector2) {
    this.points[1] = point;
  }

  setTargetControl(point: Vector2) {
    this.points[2] = point;
  }

  setTarget(point: Vector2) {
    this.points[3] = point;
  }

  toPolygon() {
    return new Polygon(this.points);
  }
}
