/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingExp } from '../src/exp';
import { genericInOut, genericOut } from './generic';

describe('easing exp test suit', () => {
  it('easeExpIn(t) returns the expected results', () => {
    expect(EasingExp.easeIn.getRatio(0.0)).toBeCloseTo(0.000000, 6);
    expect(EasingExp.easeIn.getRatio(0.1)).toBeCloseTo(0.001953, 6);
    expect(EasingExp.easeIn.getRatio(0.2)).toBeCloseTo(0.003906, 6);
    expect(EasingExp.easeIn.getRatio(0.3)).toBeCloseTo(0.007813, 6);
    expect(EasingExp.easeIn.getRatio(0.4)).toBeCloseTo(0.015625, 6);
    expect(EasingExp.easeIn.getRatio(0.5)).toBeCloseTo(0.031250, 6);
    expect(EasingExp.easeIn.getRatio(0.6)).toBeCloseTo(0.062500, 6);
    expect(EasingExp.easeIn.getRatio(0.7)).toBeCloseTo(0.125000, 6);
    expect(EasingExp.easeIn.getRatio(0.8)).toBeCloseTo(0.250000, 6);
    expect(EasingExp.easeIn.getRatio(0.9)).toBeCloseTo(0.500000, 6);
    expect(EasingExp.easeIn.getRatio(1.0)).toBeCloseTo(1.000000, 6);
  });

  it('easeExpOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingExp.easeIn.getRatio(t));
    expect(EasingExp.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0));
    expect(EasingExp.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1));
    expect(EasingExp.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2));
    expect(EasingExp.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3));
    expect(EasingExp.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4));
    expect(EasingExp.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5));
    expect(EasingExp.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6));
    expect(EasingExp.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7));
    expect(EasingExp.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8));
    expect(EasingExp.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9));
    expect(EasingExp.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0));
  });

  it('easeExpInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingExp.easeIn.getRatio(t));
    expect(EasingExp.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0));
    expect(EasingExp.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1));
    expect(EasingExp.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2));
    expect(EasingExp.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3));
    expect(EasingExp.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4));
    expect(EasingExp.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5));
    expect(EasingExp.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6));
    expect(EasingExp.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7));
    expect(EasingExp.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8));
    expect(EasingExp.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9));
    expect(EasingExp.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0));
  });
});
