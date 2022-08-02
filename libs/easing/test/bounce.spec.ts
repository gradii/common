/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingBounce } from '..';
import { genericInOut, genericOut } from './generic';

describe('easing bounce test suit', () => {
  it('easeBounceIn(t) returns the expected results', () => {
    expect(EasingBounce.easeIn.getRatio(0.0)).toBeCloseTo(0.000000, 6);
    expect(EasingBounce.easeIn.getRatio(0.1)).toBeCloseTo(0.011875, 6);
    expect(EasingBounce.easeIn.getRatio(0.2)).toBeCloseTo(0.060000, 6);
    expect(EasingBounce.easeIn.getRatio(0.3)).toBeCloseTo(0.069375, 6);
    expect(EasingBounce.easeIn.getRatio(0.4)).toBeCloseTo(0.227500, 6);
    expect(EasingBounce.easeIn.getRatio(0.5)).toBeCloseTo(0.234375, 6);
    expect(EasingBounce.easeIn.getRatio(0.6)).toBeCloseTo(0.090000, 6);
    expect(EasingBounce.easeIn.getRatio(0.7)).toBeCloseTo(0.319375, 6);
    expect(EasingBounce.easeIn.getRatio(0.8)).toBeCloseTo(0.697500, 6);
    expect(EasingBounce.easeIn.getRatio(0.9)).toBeCloseTo(0.924375, 6);
    expect(EasingBounce.easeIn.getRatio(1.0)).toBeCloseTo(1.000000, 6);
  });

  it('easeBounceOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingBounce.easeIn.getRatio(t));
    expect(EasingBounce.easeOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0));
    expect(EasingBounce.easeOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1));
    expect(EasingBounce.easeOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2));
    expect(EasingBounce.easeOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3));
    expect(EasingBounce.easeOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4));
    expect(EasingBounce.easeOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5));
    expect(EasingBounce.easeOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6));
    expect(EasingBounce.easeOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7));
    expect(EasingBounce.easeOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8));
    expect(EasingBounce.easeOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9));
    expect(EasingBounce.easeOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0));
  });

  it('easeBounceInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingBounce.easeIn.getRatio(t));
    expect(EasingBounce.easeInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0), 6);
    expect(EasingBounce.easeInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1), 6);
    expect(EasingBounce.easeInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2), 6);
    expect(EasingBounce.easeInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3), 6);
    expect(EasingBounce.easeInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4), 6);
    expect(EasingBounce.easeInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5), 6);
    expect(EasingBounce.easeInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6), 6);
    expect(EasingBounce.easeInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7), 6);
    expect(EasingBounce.easeInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8), 6);
    expect(EasingBounce.easeInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9), 6);
    expect(EasingBounce.easeInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0), 6);
  });
});
