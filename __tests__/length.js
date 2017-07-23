const length = require('../lib/rules/length');

it('validates both minimum as well as maximum', () => {

    const rule = length({min: 3, max: 5});
    expect(rule(undefined)).toMatch('string');
    expect(rule('ah')).toMatch('at least 3');
    expect(rule('yah')).toBeNull();
    expect(rule('longstring')).toMatch('more than 5');
});

it('validates only minimum', () => {

    const rule = length({min: 3});
    expect(rule('ah')).toMatch('at least 3');
    expect(rule('longstring')).toBeNull();
});

it('validates only maximum', () => {

    const rule = length({max: 5});
    expect(rule('longstring')).toMatch('more than 5');
    expect(rule('')).toBeNull();
});

it('validates an exact length', () => {

    const rule = length({is: 3});
    expect(rule('ah')).toMatch('exactly 3');
    expect(rule('yah')).toBeNull();
    expect(rule('longstring')).toMatch('exactly 3');
});

it('throws errors for nonsensical options', () => {

    expect(() => rule({min: 4, max: 3})).toThrow();
    expect(() => rule({min: 4, is: 5})).toThrow();
    expect(() => rule({max: 6, is: 5})).toThrow();
    expect(() => rule({min: 5, max: 5, is: 5})).toThrow();
});