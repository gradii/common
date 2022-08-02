
import {GetterFn, MethodFn, SetterFn} from './types';

export interface PlatformReflectionCapabilities {
  isReflectionEnabled(): boolean;
  factory(type: any): Function;
  hasLifecycleHook(type: any, lcProperty: string): boolean;
  guards(type: any): {[key: string]: any};

  /**
   * Return a list of annotations/types for constructor parameters
   */
  parameters(type: any): any[][];

  /**
   * Return a list of annotations declared on the class
   */
  annotations(type: any): any[];

  /**
   * Return a object literal which describes the annotations on Class fields/properties.
   */
  propMetadata(typeOrFunc: any): {[key: string]: any[]};
  getter(name: string): GetterFn;
  setter(name: string): SetterFn;
  method(name: string): MethodFn;
  importUri(type: any): string;
  resourceUri(type: any): string;
  resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any;
  resolveEnum(enumIdentifier: any, name: string): any;
}
