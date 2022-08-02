

/**
 * An interface implemented by all Angular type decorators, which allows them to be used as
 * decorators as well as Angular syntax.
 *
 * ```
 * @ng.Component({...})
 * class MyClass {...}
 * ```
 *
 * @publicApi
 */
export interface TypeDecorator {
  /**
   * Invoke as decorator.
   */
  <T>(type: T): T;

  (target: Object, propertyKey?: string|symbol, parameterIndex?: number): void;
}

export const ANNOTATIONS = '__annotations__';
export const PARAMETERS = '__parameters__';
export const PROP_METADATA = '__prop__metadata__';

/**
 * @suppress {globalThis}
 */
export function makeDecorator<T>(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (type: any, decorator: Readonly<any>) => void,
    typeFn?: (type: any, ...args: any[]) => void): {
      new (...args: any[]): any;
      (...args: any[]): any;
      (...args: any[]): (cls: any) => any;
      isTypeOf: (obj: any) => obj is T;
      metadataName: string
    } {
    const metaCtor = makeMetadataCtor(props);

    function DecoratorFactory(
        this: unknown|typeof DecoratorFactory, ...args: any[]): (cls: any) => any {
      if (this instanceof DecoratorFactory) {
        metaCtor.call(this, ...args);
        return this as typeof DecoratorFactory;
      }

      const annotationInstance = new (DecoratorFactory as any)(...args);
      // tslint:disable-next-line:no-shadowed-variable
      return function TypeDecorator(cls: any) {
        if (typeFn) {
          const rtn = typeFn(cls, ...args);
          if(rtn !== undefined) {
            cls = rtn;
          }
        }
        // Use of Object.defineProperty is important since it creates non-enumerable property which
        // prevents the property is copied during subclassing.
        const annotations = cls.hasOwnProperty(ANNOTATIONS) ?
            (cls as any)[ANNOTATIONS] :
            Object.defineProperty(cls, ANNOTATIONS, {value: []})[ANNOTATIONS];
        annotations.push(annotationInstance);


        if (additionalProcessing) {
          additionalProcessing(cls, annotationInstance);
        }

        return cls;
      };
    }

    if (parentClass) {
      DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

  DecoratorFactory.isTypeOf = (obj: any) => obj && obj.__metadataName === name  || obj instanceof DecoratorFactory;
    DecoratorFactory.prototype.__metadataName = name;
    (DecoratorFactory as any).annotationCls = DecoratorFactory;
    return DecoratorFactory as any;
}

function makeMetadataCtor(props?: (...args: any[]) => any): any {
  return function ctor(this: any, ...args: any[]) {
    if (props) {
      const values = props(...args);
      for (const propName in values) {
        this[propName] = values[propName];
      }
    }
  };
}

export function makeParamDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any): any {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(
        this: unknown|typeof ParamDecoratorFactory, ...args: any[]): any {
      if (this instanceof ParamDecoratorFactory) {
        metaCtor.apply(this, args);
        return this;
      }
      const annotationInstance = new (<any>ParamDecoratorFactory)(...args);

      (<any>ParamDecorator).annotation = annotationInstance;
      return ParamDecorator;

      function ParamDecorator(cls: any, unusedKey: any, index: number): any {
        // Use of Object.defineProperty is important since it creates non-enumerable property which
        // prevents the property is copied during subclassing.
        const parameters = cls.hasOwnProperty(PARAMETERS) ?
            (cls as any)[PARAMETERS] :
            Object.defineProperty(cls, PARAMETERS, {value: []})[PARAMETERS];

        // there might be gaps if some in between parameters do not have annotations.
        // we pad with nulls.
        while (parameters.length <= index) {
          parameters.push(null);
        }

        (parameters[index] = parameters[index] || []).push(annotationInstance);
        return cls;
      }
    }
    if (parentClass) {
      ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    ParamDecoratorFactory.isTypeOf = (obj: any) => obj && obj.__metadataName === name;
    ParamDecoratorFactory.prototype.__metadataName = name;
    (<any>ParamDecoratorFactory).annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}

export function makePropDecorator(
    name: string, props?: (...args: any[]) => any, parentClass?: any,
    additionalProcessing?: (target: any, name: string, decorator: Readonly<any>) => void): any {
    const metaCtor = makeMetadataCtor(props);

    function PropDecoratorFactory(this: unknown|typeof PropDecoratorFactory, ...args: any[]): any {
      if (this instanceof PropDecoratorFactory) {
        metaCtor.apply(this, args);
        return this;
      }

      const decoratorInstance = new (<any>PropDecoratorFactory)(...args);

      function PropDecorator(target: any, propName: string) {
        const constructor = target.constructor;
        // Use of Object.defineProperty is important because it creates a non-enumerable property
        // which prevents the property from being copied during subclassing.
        const meta = constructor.hasOwnProperty(PROP_METADATA) ?
            (constructor as any)[PROP_METADATA] :
            Object.defineProperty(constructor, PROP_METADATA, {value: {}})[PROP_METADATA];
        meta[propName] = meta.hasOwnProperty(propName) && meta[propName] || [];
        meta[propName].unshift(decoratorInstance);

        if (additionalProcessing) {
          additionalProcessing(target, propName, decoratorInstance);
        }
      }

      return PropDecorator;
    }

    if (parentClass) {
      PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }

    PropDecoratorFactory.isTypeOf = (obj: any) => obj && (obj.__metadataName === name || obj instanceof PropDecoratorFactory);

    PropDecoratorFactory.prototype.__metadataName = name;
    (<any>PropDecoratorFactory).annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
