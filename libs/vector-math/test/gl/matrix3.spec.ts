describe('empty', () => {
  it('empty', () => {
    expect(true).toBe(true);
  });
});

// /**
//  * @licence
//  * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
//  *
//  * Use of this source code is governed by an MIT-style license.
//  * See LICENSE file in the project root for full license information.
//  */
//
// import { Matrix3 } from '../../src/matrix3';
// import { Matrix4 } from '../../src/matrix4';
// import { Quaternion } from '../../src/quaternion';
// import { Vector3 } from '../../src/vector3';
//
// describe('Matrix3', () => {
//   let out: Matrix3;
//   let matA: Matrix3;
//   let matB: Matrix3;
//   let identity: Matrix3;
//   let result: any;
//
//   beforeEach(() => {
//     matA     = new Matrix3([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//     matB     = new Matrix3([1, 0, 0, 0, 1, 0, 3, 4, 1]);
//     out      = new Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
//     identity = new Matrix3([1, 0, 0, 0, 1, 0, 0, 0, 1]);
//   });
//
//   describe('normalFromMat4', () => {
//     beforeEach(() => {
//       result = Matrix3.fromMatrix4(new Matrix4([1, 0, 0, 0,
//         0, 1, 0, 0,
//         0, 0, 1, 0,
//         0, 0, 0, 1]));
//     });
//
//     it('should return out', () => {
//       expect(result.exactEquals(new Matrix3([1, 0, 0,
//         0, 1, 0,
//         0, 0, 1]))).toBeTruthy();
//     });
//
//     // describe("with translation and rotation", () => {
//     //     beforeEach(() => {
//     //         mat4.translate(matA, matA, [2, 4, 6])
//     //         mat4.rotateX(matA, matA, Math.PI / 2)
//
//     //         result = Matrix3.normalFromMat4(out, matA)
//     //     })
//
//     //     it("should give rotated matrix", () => {
//     //         expect(result).toBeEqualish([1, 0, 0, 0, 0, 1, 0, -1, 0])
//     //     })
//
//     //     describe("and scale", () => {
//     //         beforeEach(() => {
//     //             mat4.scale(matA, matA, [2, 3, 4])
//
//     //             result = Matrix3.normalFromMat4(out, matA)
//     //         })
//
//     //         it("should give rotated matrix", () => {
//     //             expect(result).toBeEqualish([
//     //                 0.5,
//     //                 0,
//     //                 0,
//     //                 0,
//     //                 0,
//     //                 0.333333,
//     //                 0,
//     //                 -0.25,
//     //                 0
//     //             ])
//     //         })
//     //     })
//     // })
//   });
//
//   describe('fromQuat', () => {
//     let q: Quaternion;
//
//     beforeEach(() => {
//       q      = [0, -0.7071067811865475, 0, 0.7071067811865475];
//       result = Matrix3.fromQuat(out, q);
//     });
//
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//
//     it('should rotate a vector the same as the original quat', () => {
//       expect(Vector3.transformMatrix3([], [0, 0, -1], out)).toBeEqualish(
//         Vector3.transformQuat([], [0, 0, -1], q),
//       );
//     });
//
//     it('should rotate a vector by PI/2 radians', () => {
//       expect(Vector3.transformMatrix3([], [0, 0, -1], out)).toBeEqualish([
//         1,
//         0,
//         0,
//       ]);
//     });
//   });
//
//   describe('fromMat4', () => {
//     beforeEach(() => {
//       result = Matrix3.fromMat4(out, [
//         1, 2, 3, 4,
//         5, 6, 7, 8,
//         9, 10, 11, 12,
//         13, 14, 15, 16,
//       ]);
//     });
//
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//
//     it('should calculate proper Matrix3', () => {
//       expect(out).toBeEqualish([1, 2, 3, 5, 6, 7, 9, 10, 11]);
//     });
//   });
//
//   describe('scale', () => {
//     beforeEach(() => {
//       result = Matrix3.scale(out, matA, [2, 2]);
//     });
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//     it('should place proper values in out', () => {
//       expect(out).toBeEqualish([2, 0, 0, 0, 2, 0, 1, 2, 1]);
//     });
//   });
//
//   describe('create', () => {
//     beforeEach(() => {
//       result = Matrix3.create();
//     });
//     it('should return a 9 element array initialized to a 3x3 setIdentity matrix', () => {
//       expect(result).toBeEqualish(identity);
//     });
//   });
//
//   describe('clone', () => {
//     beforeEach(() => {
//       result = Matrix3.clone(matA);
//     });
//     it('should return a 9 element array initialized to the values in matA', () => {
//       expect(result).toBeEqualish(matA);
//     });
//   });
//
//   describe('copy', () => {
//     beforeEach(() => {
//       result = Matrix3.copy(out, matA);
//     });
//     it('should place values into out', () => {
//       expect(out).toBeEqualish(matA);
//     });
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//   });
//
//   describe('identity', () => {
//     beforeEach(() => {
//       result = Matrix3.setIdentity(out);
//     });
//     it('should place values into out', () => {
//       expect(result).toBeEqualish(identity);
//     });
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//   });
//
//   describe('transpose', () => {
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.transpose(out, matA);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([1, 0, 1, 0, 1, 2, 0, 0, 1]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.transpose(matA, matA);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([1, 0, 1, 0, 1, 2, 0, 0, 1]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//     });
//   });
//
//   describe('invert', () => {
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.invert(out, matA);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([1, 0, 0, 0, 1, 0, -1, -2, 1]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.invert(matA, matA);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, -1, -2, 1]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//     });
//   });
//
//   describe('adjoint', () => {
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.adjoint(out, matA);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([1, 0, 0, 0, 1, 0, -1, -2, 1]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.adjoint(matA, matA);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, -1, -2, 1]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//     });
//   });
//
//   describe('determinant', () => {
//     beforeEach(() => {
//       result = Matrix3.determinant(matA);
//     });
//
//     it('should return the determinant', () => {
//       expect(result).toEqual(1);
//     });
//   });
//
//   describe('multiply', () => {
//     it('should have an alias called \'mul\'', () => {
//       expect(Matrix3.mul).toEqual(Matrix3.multiply);
//     });
//
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiply(out, matA, matB);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([1, 0, 0, 0, 1, 0, 4, 6, 1]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([1, 0, 0, 0, 1, 0, 3, 4, 1]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiply(matA, matA, matB);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 4, 6, 1]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([1, 0, 0, 0, 1, 0, 3, 4, 1]);
//       });
//     });
//
//     describe('when matB is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiply(matB, matA, matB);
//       });
//
//       it('should place values into matB', () => {
//         expect(matB).toBeEqualish([1, 0, 0, 0, 1, 0, 4, 6, 1]);
//       });
//       it('should return matB', () => {
//         expect(result).toBe(matB);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 0, 0, 0, 1, 0, 1, 2, 1]);
//       });
//     });
//   });
//
//   describe('str', () => {
//     beforeEach(() => {
//       result = Matrix3.str(matA);
//     });
//
//     it('should return a string representation of the matrix', () => {
//       expect(result).toEqual('Matrix3(1, 0, 0, 0, 1, 0, 1, 2, 1)');
//     });
//   });
//
//   describe('frob', () => {
//     beforeEach(() => {
//       result = Matrix3.frob(matA);
//     });
//     it('should return the Frobenius Norm of the matrix', () => {
//       expect(result).toEqual(
//         Math.sqrt(
//           Math.pow(1, 2) +
//           Math.pow(0, 2) +
//           Math.pow(0, 2) +
//           Math.pow(0, 2) +
//           Math.pow(1, 2) +
//           Math.pow(0, 2) +
//           Math.pow(1, 2) +
//           Math.pow(2, 2) +
//           Math.pow(1, 2),
//         ),
//       );
//     });
//   });
//
//   describe('add', () => {
//     beforeEach(() => {
//       matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//       matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
//     });
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.add(out, matA, matB);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([11, 13, 15, 17, 19, 21, 23, 25, 27]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.add(matA, matA, matB);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([11, 13, 15, 17, 19, 21, 23, 25, 27]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matB is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.add(matB, matA, matB);
//       });
//
//       it('should place values into matB', () => {
//         expect(matB).toBeEqualish([11, 13, 15, 17, 19, 21, 23, 25, 27]);
//       });
//       it('should return matB', () => {
//         expect(result).toBe(matB);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//     });
//   });
//
//   describe('subtract', () => {
//     beforeEach(() => {
//       matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//       matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
//     });
//     it('should have an alias called \'sub\'', () => {
//       expect(Matrix3.sub).toEqual(Matrix3.subtract);
//     });
//
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.subtract(out, matA, matB);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([-9, -9, -9, -9, -9, -9, -9, -9, -9]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.subtract(matA, matA, matB);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([-9, -9, -9, -9, -9, -9, -9, -9, -9]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matB is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.subtract(matB, matA, matB);
//       });
//
//       it('should place values into matB', () => {
//         expect(matB).toBeEqualish([-9, -9, -9, -9, -9, -9, -9, -9, -9]);
//       });
//       it('should return matB', () => {
//         expect(result).toBe(matB);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//     });
//   });
//
//   describe('fromValues', () => {
//     beforeEach(() => {
//       result = Matrix3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
//     });
//     it('should return a 9 element array initialized to the values passed', () => {
//       expect(result).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//     });
//   });
//
//   describe('set', () => {
//     beforeEach(() => {
//       result = Matrix3.set(out, 1, 2, 3, 4, 5, 6, 7, 8, 9);
//     });
//     it('should place values into out', () => {
//       expect(out).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//     });
//     it('should return out', () => {
//       expect(result).toBe(out);
//     });
//   });
//
//   describe('multiplyScalar', () => {
//     beforeEach(() => {
//       matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//     });
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiplyScalar(out, matA, 2);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([2, 4, 6, 8, 10, 12, 14, 16, 18]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiplyScalar(matA, matA, 2);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([2, 4, 6, 8, 10, 12, 14, 16, 18]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//     });
//   });
//
//   describe('multiplyScalarAndAdd', () => {
//     beforeEach(() => {
//       matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//       matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
//     });
//     describe('with a separate output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiplyScalarAndAdd(out, matA, matB, 0.5);
//       });
//
//       it('should place values into out', () => {
//         expect(out).toBeEqualish([
//           6,
//           7.5,
//           9,
//           10.5,
//           12,
//           13.5,
//           15,
//           16.5,
//           18,
//         ]);
//       });
//       it('should return out', () => {
//         expect(result).toBe(out);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matA is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiplyScalarAndAdd(matA, matA, matB, 0.5);
//       });
//
//       it('should place values into matA', () => {
//         expect(matA).toBeEqualish([
//           6,
//           7.5,
//           9,
//           10.5,
//           12,
//           13.5,
//           15,
//           16.5,
//           18,
//         ]);
//       });
//       it('should return matA', () => {
//         expect(result).toBe(matA);
//       });
//       it('should not modify matB', () => {
//         expect(matB).toBeEqualish([10, 11, 12, 13, 14, 15, 16, 17, 18]);
//       });
//     });
//
//     describe('when matB is the output matrix', () => {
//       beforeEach(() => {
//         result = Matrix3.multiplyScalarAndAdd(matB, matA, matB, 0.5);
//       });
//
//       it('should place values into matB', () => {
//         expect(matB).toBeEqualish([
//           6,
//           7.5,
//           9,
//           10.5,
//           12,
//           13.5,
//           15,
//           16.5,
//           18,
//         ]);
//       });
//       it('should return matB', () => {
//         expect(result).toBe(matB);
//       });
//       it('should not modify matA', () => {
//         expect(matA).toBeEqualish([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//       });
//     });
//   });
//
//   describe('exactEquals', () => {
//     let matC: Matrix3type;
//     let r0: boolean;
//     let r1: boolean;
//     beforeEach(() => {
//       matA = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//       matB = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//       matC = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//       r0   = Matrix3.exactEquals(matA, matB);
//       r1   = Matrix3.exactEquals(matA, matC);
//     });
//
//     it('should return true for identical matrices', () => {
//       expect(r0).toBe(true);
//     });
//     it('should return false for different matrices', () => {
//       expect(r1).toBe(false);
//     });
//     it('should not modify matA', () => {
//       expect(matA).toBeEqualish([0, 1, 2, 3, 4, 5, 6, 7, 8]);
//     });
//     it('should not modify matB', () => {
//       expect(matB).toBeEqualish([0, 1, 2, 3, 4, 5, 6, 7, 8]);
//     });
//   });
//
//   describe('equals', () => {
//     let matC: Matrix3type;
//     let matD: Matrix3type;
//     let r0: boolean;
//     let r1: boolean;
//     let r2: boolean;
//     beforeEach(() => {
//       matA = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//       matB = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//       matC = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//       matD = [1e-16, 1, 2, 3, 4, 5, 6, 7, 8];
//       r0   = Matrix3.equals(matA, matB);
//       r1   = Matrix3.equals(matA, matC);
//       r2   = Matrix3.equals(matA, matD);
//     });
//     it('should return true for identical matrices', () => {
//       expect(r0).toBe(true);
//     });
//     it('should return false for different matrices', () => {
//       expect(r1).toBe(false);
//     });
//     it('should return true for close but not identical matrices', () => {
//       expect(r2).toBe(true);
//     });
//     it('should not modify matA', () => {
//       expect(matA).toBeEqualish([0, 1, 2, 3, 4, 5, 6, 7, 8]);
//     });
//     it('should not modify matB', () => {
//       expect(matB).toBeEqualish([0, 1, 2, 3, 4, 5, 6, 7, 8]);
//     });
//   });
// });
