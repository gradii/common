import { makePropDecorator } from '../src/decorators';
import { reflector } from '../src/reflection/reflection';

describe('test annotation', () => {
  it('test reflect', () => {
    expect(true).toBe(true);
  });

  it('child should be parent base type', () => {
    const meta       = reflector.propMetadata(AnnotationTestStub);
    const base       = meta['base'][0];
    const child      = meta['child'][0];
    const childClazz = meta['childClazz'][0];

    expect(base).toBeDefined();
    expect(child).toBeDefined();

    expect(base instanceof Base).toBeTruthy();
    expect(base instanceof Child).toBeFalsy();
    expect(child instanceof Base).toBeTruthy();
    expect(child instanceof Child).toBeTruthy();

    expect(Base.isTypeOf(base)).toBeTruthy();
    expect(Child.isTypeOf(base)).toBeFalsy();
    expect(Child.isTypeOf(child)).toBeTruthy();

    expect(Base.isTypeOf(child)).toBeTruthy();

    expect(childClazz instanceof BaseClazz).toBeTruthy();
  });

});

class BaseClazz {
}

const Base = makePropDecorator('base', (...args) => ({...args}));

const Child = makePropDecorator('child', (...args) => ({...args}), Base);

const ChildExtendClazz = makePropDecorator('child', (...args) => ({...args}), BaseClazz);


export class AnnotationTestStub {
  @Base() base: any;
  @Child() child: any;
  @ChildExtendClazz() childClazz: any;
}
