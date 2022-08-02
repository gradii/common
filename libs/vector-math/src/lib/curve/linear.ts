import { Point, PointProperties } from '../helper/types';
import { Vector2 } from '../vector2';

export class Linear {
  private readonly x0: number;
  private readonly x1: number;
  private readonly y0: number;
  private readonly y1: number;

  constructor(pointX: Vector2, pointY: Vector2) {
    this.x0 = pointX.x;
    this.y0 = pointX.y;
    this.x1 = pointY.x;
    this.y1 = pointY.y;
  }

  public getTotalLength() {
    return Math.sqrt(Math.pow(this.x0 - this.x1, 2) + Math.pow(this.y0 - this.y1, 2));
  }

  public getPointAtLength(pos: number): Point {
    let fraction = pos / Math.sqrt(Math.pow(this.x0 - this.x1, 2) + Math.pow(this.y0 - this.y1, 2));

    fraction        = Number.isNaN(fraction) ? 1 : fraction;
    const newDeltaX = (this.x1 - this.x0) * fraction;
    const newDeltaY = (this.y1 - this.y0) * fraction;

    return {x: this.x0 + newDeltaX, y: this.y0 + newDeltaY};
  }

  public getTangentAtLength(_: number): Point {
    const module = Math.sqrt(
      (this.x1 - this.x0) * (this.x1 - this.x0) + (this.y1 - this.y0) * (this.y1 - this.y0)
    );
    return {x: (this.x1 - this.x0) / module, y: (this.y1 - this.y0) / module};
  }

  public getPropertiesAtLength(pos: number): PointProperties {
    const point   = this.getPointAtLength(pos);
    const tangent = this.getTangentAtLength(pos);
    return {x: point.x, y: point.y, tangentX: tangent.x, tangentY: tangent.y};
  }
}
