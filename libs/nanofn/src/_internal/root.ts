/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/* global globalThis, self */
import { freeGlobal } from './free-global';

/** Detect free variable `globalThis` */
const freeGlobalThis = typeof globalThis === 'object' && globalThis !== null && globalThis.Object == Object && globalThis;

/** Detect free variable `self`. */
const freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;

/** Used as a reference to the global object. */
export const root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();
