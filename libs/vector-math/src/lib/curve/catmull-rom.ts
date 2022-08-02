// export class CatmullRom {
//   _alpha   = alpha;
//   private _line: number;
//   private _x0: number;
//   private _x1: number;
//   private _x2: number;
//   private _y0: number;
//   private _y1: number;
//   private _y2: number;
//   private _l01_a: number;
//   private _l12_a: number;
//   private _l23_a: number;
//   private _l01_2a: number;
//   private _l12_2a: number;
//   private _l23_2a: number;
//   private _point: number;
//
//   constructor(alpha) {
//     this._alpha = alpha
//   }
//
//   areaStart() {
//     this._line = 0;
//   }
//
//   areaEnd() {
//     this._line = NaN;
//   }
//
//   lineStart() {
//     this._x0    = this._x1 = this._x2 =
//       this._y0 = this._y1 = this._y2 = NaN;
//     this._l01_a = this._l12_a = this._l23_a =
//       this._l01_2a = this._l12_2a = this._l23_2a =
//         this._point = 0;
//   }
//
//   lineEnd() {
//     switch (this._point) {
//       case 2:
//         this._context.lineTo(this._x2, this._y2);
//         break;
//       case 3:
//         this.point(this._x2, this._y2);
//         break;
//     }
//     if (this._line || (this._line !== 0 && this._point === 1)) {
//       this._context.closePath();
//     }
//     this._line = 1 - this._line;
//   }
//
//   point(x, y) {
//     x = +x, y = +y;
//
//     if (this._point) {
//       var x23     = this._x2 - x,
//           y23     = this._y2 - y;
//       this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
//     }
//
//     switch (this._point) {
//       case 0:
//         this._point = 1;
//         this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
//         break;
//       case 1:
//         this._point = 2;
//         break;
//       case 2:
//         this._point = 3; // falls through
//       default:
//         point(this, x, y);
//         break;
//     }
//
//     this._l01_a = this._l12_a, this._l12_a = this._l23_a;
//     this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
//     this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
//     this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
//   }
//
//   static customAlpha(alpha: number) {
//     if (alpha) {
//       return (context) => {
//         return new CatmullRom(context, alpha);
//       }
//     }else{
//       return (context)=>{
//         new Cardinal(context, 0);
//       }
//     }
//   }
// }