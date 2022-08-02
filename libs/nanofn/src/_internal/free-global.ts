/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

/** Detect free variable `global` from Node.js. */
export const freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global;
