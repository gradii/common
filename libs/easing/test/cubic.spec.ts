/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingCubic } from '..';
import { genericInOut, genericOut } from './generic';

describe('easing cubic test suit', () => {

  it('easeCubicIn(t) returns the expected results', () => {
    expect(EasingCubic.easeIn.getRatio(0.0)).toBeCloseTo(0.000, 6);
    expect(EasingCubic.easeIn.getRatio(0.1)).toBeCloseTo(0.001, 6);
    expect(EasingCubic.easeIn.getRatio(0.2)).toBeCloseTo(0.008, 6);
    expect(EasingCubic.easeIn.getRatio(0.3)).toBeCloseTo(0.027, 6);
    expect(EasingCubic.easeIn.getRatio(0.4)).toBeCloseTo(0.064, 6);
    expect(EasingCubic.easeIn.getRatio(0.5)).toBeCloseTo(0.125, 6);
    expect(EasingCubic.easeIn.getRatio(0.6)).toBeCloseTo(0.216, 6);
    expect(EasingCubic.easeIn.getRatio(0.7)).toBeCloseTo(0.343, 6);
    expect(EasingCubic.easeIn.getRatio(0.8)).toBeCloseTo(0.512, 6);
    expect(EasingCubic.easeIn.getRatio(0.9)).toBeCloseTo(0.729, 6);
    expect(EasingCubic.easeIn.getRatio(1.0)).toBeCloseTo(1.000, 6);
  });

  it('easeCubicOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingCubic.easeIn.getRatio(t));
    expect(EasingCubic.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0), 6);
    expect(EasingCubic.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1), 6);
    expect(EasingCubic.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2), 6);
    expect(EasingCubic.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3), 6);
    expect(EasingCubic.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4), 6);
    expect(EasingCubic.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5), 6);
    expect(EasingCubic.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6), 6);
    expect(EasingCubic.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7), 6);
    expect(EasingCubic.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8), 6);
    expect(EasingCubic.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9), 6);
    expect(EasingCubic.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0), 6);
  });

  it('easeCubicInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingCubic.easeIn.getRatio(t));
    expect(EasingCubic.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0), 6);
    expect(EasingCubic.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1), 6);
    expect(EasingCubic.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2), 6);
    expect(EasingCubic.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3), 6);
    expect(EasingCubic.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4), 6);
    expect(EasingCubic.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5), 6);
    expect(EasingCubic.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6), 6);
    expect(EasingCubic.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7), 6);
    expect(EasingCubic.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8), 6);
    expect(EasingCubic.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9), 6);
    expect(EasingCubic.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0), 6);
  });
});
