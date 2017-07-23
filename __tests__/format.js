const format = require('../lib/rules/format');

it('should check whether the given value matches the pattern', () => {

    const rule = format({pattern: /^foo(bar)?$/i});

    expect(rule('foo')).toBeNull();
    expect(rule(undefined)).toMatch('Incorrectly formatted');
    expect(rule('foobaz')).toMatch('Incorrectly formatted');
});

it('should not accept other types of values', () => {

    const rule = format({pattern: /^foo(bar)?$/i});

    expect(rule(1)).toMatch('expected a string');
    expect(rule({foo: 'bar'})).toMatch('expected a string');
});

it('should throw errors for nonsensical options', () => {

    expect(() => format({})).toThrow();
    expect(() => format({pattern: 'foobar'})).toThrow();
});