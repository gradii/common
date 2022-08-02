/**
 * @licence
 * Copyright (c) 2018 LinBo Len <linbolen@gradii.com>
 *
 * Use of this source code is governed by an MIT-style license.
 * See LICENSE file in the project root for full license information.
 */
import { EasingElastic } from '..';
import { ElasticIn } from '../src/elastic';
import { genericInOut, genericOut } from './generic';

describe('easing elastic test suit', () => {
  it('easeElasticIn(t) returns the expected results', () => {
    expect(EasingElastic.easingIn.getRatio(0.0)).toBeCloseTo(-0.000488, 6);
    expect(EasingElastic.easingIn.getRatio(0.1)).toBeCloseTo(+0.001953, 6);
    expect(EasingElastic.easingIn.getRatio(0.2)).toBeCloseTo(-0.001953, 6);
    expect(EasingElastic.easingIn.getRatio(0.3)).toBeCloseTo(-0.003906, 6);
    expect(EasingElastic.easingIn.getRatio(0.4)).toBeCloseTo(+0.015625, 6);
    expect(EasingElastic.easingIn.getRatio(0.5)).toBeCloseTo(-0.015625, 6);
    expect(EasingElastic.easingIn.getRatio(0.6)).toBeCloseTo(-0.031250, 6);
    expect(EasingElastic.easingIn.getRatio(0.7)).toBeCloseTo(+0.125000, 6);
    expect(EasingElastic.easingIn.getRatio(0.8)).toBeCloseTo(-0.125000, 6);
    expect(EasingElastic.easingIn.getRatio(0.9)).toBeCloseTo(-0.250000, 6);
    expect(EasingElastic.easingIn.getRatio(1.0)).toBeCloseTo(+1.000000, 6);
  });

  it('easeElasticIn(t) is the same as elasticIn.amplitude(1).period(0.3)(t)', () => {
    const customEaseElasticIn = new ElasticIn(1, .3);
    expect(EasingElastic.easingIn.getRatio(0.1)).toBe(customEaseElasticIn.getRatio(0.1));
    expect(EasingElastic.easingIn.getRatio(0.2)).toBe(customEaseElasticIn.getRatio(0.2));
    expect(EasingElastic.easingIn.getRatio(0.3)).toBe(customEaseElasticIn.getRatio(0.3));
  });

  it('easeElasticIn.amplitude(a)(t) is the same as elasticIn(t) if a <= 1', () => {
    expect(new ElasticIn(-1).getRatio(0.1)).toBeCloseTo(EasingElastic.easingIn.getRatio(0.1));
    expect(new ElasticIn(+0.4).getRatio(0.2)).toBeCloseTo(EasingElastic.easingIn.getRatio(0.2));
    expect(new ElasticIn(+0.8).getRatio(0.3)).toBeCloseTo(EasingElastic.easingIn.getRatio(0.3));
  });

  it('easeElasticIn.amplitude(1.3)(t) returns the expected results', () => {
    expect(new ElasticIn(1.3).getRatio(0.0)).toBeCloseTo(+0.000214, 6);
    expect(new ElasticIn(1.3).getRatio(0.1)).toBeCloseTo(+0.001953, 6);
    expect(new ElasticIn(1.3).getRatio(0.2)).toBeCloseTo(-0.004763, 6);
    expect(new ElasticIn(1.3).getRatio(0.3)).toBeCloseTo(+0.001714, 6);
    expect(new ElasticIn(1.3).getRatio(0.4)).toBeCloseTo(+0.015625, 6);
    expect(new ElasticIn(1.3).getRatio(0.5)).toBeCloseTo(-0.038105, 6);
    expect(new ElasticIn(1.3).getRatio(0.6)).toBeCloseTo(+0.013711, 6);
    expect(new ElasticIn(1.3).getRatio(0.7)).toBeCloseTo(+0.125000, 6);
    expect(new ElasticIn(1.3).getRatio(0.8)).toBeCloseTo(-0.304844, 6);
    expect(new ElasticIn(1.3).getRatio(0.9)).toBeCloseTo(+0.109687, 6);
    expect(new ElasticIn(1.3).getRatio(1.0)).toBeCloseTo(+1.000000, 6);
  });

  it('easeElasticIn.amplitude(1.5).period(1)(t) returns the expected results', () => {
    expect(new ElasticIn(1.5, 1).getRatio(0.0)).toBeCloseTo(+0.000977, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.1)).toBeCloseTo(+0.000297, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.2)).toBeCloseTo(-0.002946, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.3)).toBeCloseTo(-0.010721, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.4)).toBeCloseTo(-0.022909, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.5)).toBeCloseTo(-0.031250, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.6)).toBeCloseTo(-0.009491, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.7)).toBeCloseTo(+0.094287, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.8)).toBeCloseTo(+0.343083, 6);
    expect(new ElasticIn(1.5, 1).getRatio(0.9)).toBeCloseTo(+0.733090, 6);
    expect(new ElasticIn(1.5, 1).getRatio(1.0)).toBeCloseTo(+1.000000, 6);
  });

  it('easeElasticOut(t) returns the expected results', () => {
    const genericEaseOut = genericOut(t => EasingElastic.easingIn.getRatio(t));
    expect(EasingElastic.easingOut.getRatio(0.0)).toBeCloseTo(genericEaseOut(0.0));
    expect(EasingElastic.easingOut.getRatio(0.1)).toBeCloseTo(genericEaseOut(0.1));
    expect(EasingElastic.easingOut.getRatio(0.2)).toBeCloseTo(genericEaseOut(0.2));
    expect(EasingElastic.easingOut.getRatio(0.3)).toBeCloseTo(genericEaseOut(0.3));
    expect(EasingElastic.easingOut.getRatio(0.4)).toBeCloseTo(genericEaseOut(0.4));
    expect(EasingElastic.easingOut.getRatio(0.5)).toBeCloseTo(genericEaseOut(0.5));
    expect(EasingElastic.easingOut.getRatio(0.6)).toBeCloseTo(genericEaseOut(0.6));
    expect(EasingElastic.easingOut.getRatio(0.7)).toBeCloseTo(genericEaseOut(0.7));
    expect(EasingElastic.easingOut.getRatio(0.8)).toBeCloseTo(genericEaseOut(0.8));
    expect(EasingElastic.easingOut.getRatio(0.9)).toBeCloseTo(genericEaseOut(0.9));
    expect(EasingElastic.easingOut.getRatio(1.0)).toBeCloseTo(genericEaseOut(1.0));
  });

  it('easeElasticInOut(t) returns the expected results', () => {
    const genericEaseInOut = genericInOut(t => EasingElastic.easingIn.getRatio(t));
    expect(EasingElastic.easingInOut.getRatio(0.0)).toBeCloseTo(genericEaseInOut(0.0));
    expect(EasingElastic.easingInOut.getRatio(0.1)).toBeCloseTo(genericEaseInOut(0.1));
    expect(EasingElastic.easingInOut.getRatio(0.2)).toBeCloseTo(genericEaseInOut(0.2));
    expect(EasingElastic.easingInOut.getRatio(0.3)).toBeCloseTo(genericEaseInOut(0.3));
    expect(EasingElastic.easingInOut.getRatio(0.4)).toBeCloseTo(genericEaseInOut(0.4));
    expect(EasingElastic.easingInOut.getRatio(0.5)).toBeCloseTo(genericEaseInOut(0.5));
    expect(EasingElastic.easingInOut.getRatio(0.6)).toBeCloseTo(genericEaseInOut(0.6));
    expect(EasingElastic.easingInOut.getRatio(0.7)).toBeCloseTo(genericEaseInOut(0.7));
    expect(EasingElastic.easingInOut.getRatio(0.8)).toBeCloseTo(genericEaseInOut(0.8));
    expect(EasingElastic.easingInOut.getRatio(0.9)).toBeCloseTo(genericEaseInOut(0.9));
    expect(EasingElastic.easingInOut.getRatio(1.0)).toBeCloseTo(genericEaseInOut(1.0));
  });
});
