import {ANNOTATIONS, PARAMETERS, PROP_METADATA} from '../decorators';
import {global} from '../global';
import {stringify} from '../stringify';

import {PlatformReflectionCapabilities} from './platform_reflection_capabilities';
import {GetterFn, MethodFn, SetterFn} from './types';

export class ReflectionCapabilities implements PlatformReflectionCapabilities {
  private _reflect: any;

  constructor(reflect?: any) {
    this._reflect = reflect || global['Reflect'];
  }

  isReflectionEnabled(): boolean {
    return true;
  }

  factory<T>(t: any): (args: any[]) => T {
    return (...args: any[]) => new t(...args);
  }

  /** @internal */
  _zipTypesAndAnnotations(paramTypes: any[], paramAnnotations: any[]): any[][] {
    let result: any[][];

    if (typeof paramTypes === 'undefined') {
      result = new Array(paramAnnotations.length);
    } else {
      result = new Array(paramTypes.length);
    }

    for (let i = 0; i < result.length; i++) {
      // TS outputs Object for parameters without types, while Traceur omits
      // the annotations. For now we preserve the Traceur behavior to aid
      // migration, but this can be revisited.
      if (typeof paramTypes === 'undefined') {
        result[i] = [];
      } else if (paramTypes[i] && paramTypes[i] != Object) {
        result[i] = [paramTypes[i]];
      } else {
        result[i] = [];
      }
      if (paramAnnotations && paramAnnotations[i] != null) {
        result[i] = result[i].concat(paramAnnotations[i]);
      }
    }
    return result;
  }

  private _ownParameters(type: any, parentCtor: any): any[][]|null {

    // Prefer the direct API.
    if ((<any>type).parameters && (<any>type).parameters !== parentCtor.parameters) {
      return (<any>type).parameters;
    }

    // API of tsickle for lowering decorators to properties on the class.
    const tsickleCtorParams = (<any>type).ctorParameters;
    if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
      // Newer tsickle uses a function closure
      // Retain the non-function case for compatibility with older tsickle
      const ctorParameters =
          typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
      const paramTypes = ctorParameters.map((ctorParam: any) => ctorParam && ctorParam.type);
      const paramAnnotations = ctorParameters.map(
          (ctorParam: any) =>
              ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
      return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
    }

    // API for metadata created by invoking the decorators.
    const paramAnnotations = type.hasOwnProperty(PARAMETERS) && (type as any)[PARAMETERS];
    const paramTypes = this._reflect && this._reflect.getOwnMetadata &&
        this._reflect.getOwnMetadata('design:paramtypes', type);
    if (paramTypes || paramAnnotations) {
      return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
    }

    // If a class has no decorators, at least create metadata
    // based on function.length.
    // Note: We know that this is a real constructor as we checked
    // the content of the constructor above.
    return new Array<any[]>(type.length);
  }

  parameters(type: any): any[][] {
    // Note: only report metadata if we have at least one class decorator
    // to stay in sync with the static reflector.
    if (typeof type !== 'function') {
      return [];
    }
    const parentCtor = getParentCtor(type);
    let parameters = this._ownParameters(type, parentCtor);
    if (!parameters && parentCtor !== Object) {
      parameters = this.parameters(parentCtor);
    }
    return parameters || [];
  }

  private _ownAnnotations(typeOrFunc: any, parentCtor: any): any[]|null {
    // Prefer the direct API.
    if ((<any>typeOrFunc).annotations && (<any>typeOrFunc).annotations !== parentCtor.annotations) {
      let annotations = (<any>typeOrFunc).annotations;
      if (typeof annotations === 'function' && annotations.annotations) {
        annotations = annotations.annotations;
      }
      return annotations;
    }

    // API of tsickle for lowering decorators to properties on the class.
    if ((<any>typeOrFunc).decorators && (<any>typeOrFunc).decorators !== parentCtor.decorators) {
      return convertTsickleDecoratorIntoMetadata((<any>typeOrFunc).decorators);
    }

    // API for metadata created by invoking the decorators.
    if (typeOrFunc.hasOwnProperty(ANNOTATIONS)) {
      return (typeOrFunc as any)[ANNOTATIONS];
    }
    return null;
  }

  annotations(typeOrFunc: any): any[] {
    if (typeof typeOrFunc !== 'function') {
      return [];
    }
    const parentCtor = getParentCtor(typeOrFunc);
    const ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
    const parentAnnotations = parentCtor !== Object ? this.annotations(parentCtor) : [];
    return parentAnnotations.concat(ownAnnotations);
  }

  private _ownPropMetadata(typeOrFunc: any, parentCtor: any): {[key: string]: any[]}|null {
    // Prefer the direct API.
    if ((<any>typeOrFunc).propMetadata &&
        (<any>typeOrFunc).propMetadata !== parentCtor.propMetadata) {
      let propMetadata = (<any>typeOrFunc).propMetadata;
      if (typeof propMetadata === 'function' && propMetadata.propMetadata) {
        propMetadata = propMetadata.propMetadata;
      }
      return propMetadata;
    }

    // API of tsickle for lowering decorators to properties on the class.
    if ((<any>typeOrFunc).propDecorators &&
        (<any>typeOrFunc).propDecorators !== parentCtor.propDecorators) {
      const propDecorators = (<any>typeOrFunc).propDecorators;
      const propMetadata = <{[key: string]: any[]}>{};
      Object.keys(propDecorators).forEach(prop => {
        propMetadata[prop] = convertTsickleDecoratorIntoMetadata(propDecorators[prop]);
      });
      return propMetadata;
    }

    // API for metadata created by invoking the decorators.
    if (typeOrFunc.hasOwnProperty(PROP_METADATA)) {
      return (typeOrFunc as any)[PROP_METADATA];
    }
    return null;
  }

  propMetadata(typeOrFunc: any): {[key: string]: any[]} {
    if (typeof typeOrFunc !== 'function') {
      return {};
    }
    const parentCtor = getParentCtor(typeOrFunc);
    const propMetadata: {[key: string]: any[]} = {};
    if (parentCtor !== Object) {
      const parentPropMetadata = this.propMetadata(parentCtor);
      Object.keys(parentPropMetadata).forEach((propName) => {
        propMetadata[propName] = parentPropMetadata[propName];
      });
    }
    const ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
    if (ownPropMetadata) {
      Object.keys(ownPropMetadata).forEach((propName) => {
        const decorators: any[] = [];
        if (propMetadata.hasOwnProperty(propName)) {
          decorators.push(...propMetadata[propName]);
        }
        decorators.push(...ownPropMetadata[propName]);
        propMetadata[propName] = decorators;
      });
    }
    return propMetadata;
  }

  ownPropMetadata(typeOrFunc: any): {[key: string]: any[]} {
    if (typeof typeOrFunc !== 'function') {
      return {};
    }
    return this._ownPropMetadata(typeOrFunc, getParentCtor(typeOrFunc)) || {};
  }

  hasLifecycleHook(type: any, lcProperty: string): boolean {
    return type instanceof Function && lcProperty in type.prototype;
  }

  guards(type: any): {[key: string]: any} {
    return {};
  }

  getter(name: string): GetterFn {
    return <GetterFn>new Function('o', `return o.${name};`);
  }

  setter(name: string): SetterFn {
    return <SetterFn>new Function('o', 'v', `return o.${name} = v;`);
  }

  method(name: string): MethodFn {
    const functionBody = `if (!o.${name}) throw new Error('"${name}" is undefined');
        return o.${name}.apply(o, args);`;
    return <MethodFn>new Function('o', 'args', functionBody);
  }

  // There is not a concept of import uri in Js, but this is useful in developing Dart applications.
  importUri(type: any): string {
    // StaticSymbol
    if (typeof type === 'object' && type['filePath']) {
      return type['filePath'];
    }
    // Runtime type
    return `./${stringify(type)}`;
  }

  resourceUri(type: any): string {
    return `./${stringify(type)}`;
  }

  resolveIdentifier(name: string, moduleUrl: string, members: string[], runtime: any): any {
    return runtime;
  }
  resolveEnum(enumIdentifier: any, name: string): any {
    return enumIdentifier[name];
  }
}

function convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
  if (!decoratorInvocations) {
    return [];
  }
  return decoratorInvocations.map(decoratorInvocation => {
    const decoratorType = decoratorInvocation.type;
    const annotationCls = decoratorType.annotationCls;
    const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
    return new annotationCls(...annotationArgs);
  });
}

function getParentCtor(ctor: Function): any {
  const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
  const parentCtor = parentProto ? parentProto.constructor : null;
  // Note: We always use `Object` as the null value
  // to simplify checking later on.
  return parentCtor || Object;
}
