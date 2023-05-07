/**
 *
 */
import { lowerCase, upperCase, camelCase } from '@gradii/nanofn';

describe('test case', () => {
  it('test case', () => {
    expect(true).toBe(true);
  });

  it('test lower case', () => {
    //test lower case
    expect(lowerCase('\0\0Foo\0\0Bar\0\0')).toBe('foo bar');
    expect(lowerCase('Foo Bar')).toBe('foo bar');
    expect(lowerCase('--Foo-Bar--')).toBe('foo bar');
    expect(lowerCase('__FOO_BAR__')).toBe('foo bar');
  });

  it('test upper case', () => {
    //test upper case
    expect(upperCase('\0\0Foo\0\0Bar\0\0')).toBe('FOO BAR');
    expect(upperCase('Foo Bar')).toBe('FOO BAR');
    expect(upperCase('Foo  Bar')).toBe('FOO BAR');
    expect(upperCase('--Foo-Bar--')).toBe('FOO BAR');
    expect(upperCase('__FOO_BAR__')).toBe('FOO BAR');
    expect(upperCase('__FOO__BAR__')).toBe('FOO BAR');
  });

  it('test non unicode', ()=>{
    expect(upperCase('Foo\'bar')).toBe('FOO BAR');
    expect(upperCase('Foo\u2019bar')).toBe('FOO BAR');
  });

  it('test camel case', ()=>{
    expect(camelCase('Foo Bar')).toBe('fooBar');
    expect(camelCase('Foo-Bar')).toBe('fooBar');
    expect(camelCase('--foo-bar--')).toBe('fooBar');
    expect(camelCase('__FOO_BAR__')).toBe('fooBar');
    expect(camelCase('fooBar')).toBe('fooBar');
    expect(camelCase('_FooBar')).toBe('fooBar');
  })

});