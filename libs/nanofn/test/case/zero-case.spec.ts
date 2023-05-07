/**
 *
 */

import { constantCase, lowerCase, snakeCase } from '@gradii/nanofn';

describe('case', () => {

  const zeroChar = '\0';
  it('test zero char', () => {

    expect(zeroChar).toBe('\0');
    expect(zeroChar.length).toBe(1);

    expect(zeroChar.toLowerCase()).toBe('\0');

    expect(zeroChar.toUpperCase()).toBe('\0');
  });

  it('test zero char snake case', () => {
    expect(snakeCase(zeroChar)).toBe('');

    expect(snakeCase('foo' + zeroChar + 'bar')).toBe('foo_bar');

    expect(snakeCase(zeroChar + zeroChar + 'bar' + zeroChar + 'baz')).toBe('bar_baz');

    expect(snakeCase(zeroChar + 'bar' + zeroChar + 'baz' + zeroChar)).toBe('bar_baz');
  });

  it('test zero char constant case', () => {
    expect(constantCase(zeroChar)).toBe('');

    expect(constantCase('foo' + zeroChar + 'bar')).toBe('FOO_BAR');

    expect(constantCase(zeroChar + zeroChar + 'bar' + zeroChar + 'baz')).toBe('BAR_BAZ');

    expect(constantCase(zeroChar + 'bar' + zeroChar + 'baz' + zeroChar)).toBe('BAR_BAZ');
  });

  it('test zero char lower case', () => {
    expect(lowerCase(zeroChar)).toBe('');

    expect(lowerCase('foo' + zeroChar + 'bar')).toBe('foo bar');

    expect(lowerCase(zeroChar + zeroChar + 'bar' + zeroChar + 'baz')).toBe('bar baz');

    expect(lowerCase(zeroChar + 'bar' + zeroChar + 'baz' + zeroChar)).toBe('bar baz');
  });
});