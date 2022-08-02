/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license
 */

export * from './src/metadata';

export { forwardRef, resolveForwardRef, ForwardRefFn } from './src/forward-ref';

export { Injector } from './src/injector';
export { ReflectiveInjector } from './src/reflective-injector';
export {
  Provider, TypeProvider, ValueProvider, ClassProvider, ExistingProvider, FactoryProvider
} from './src/provider';
export { ResolvedReflectiveFactory, ResolvedReflectiveProvider } from './src/reflective-provider';
export { ReflectiveKey } from './src/reflective-key';
export { InjectionToken } from './src/injection-token';
export { resolveDependencies } from './src/util/resolve-dependencies';
export { Type, isType } from './src/facade/type';
