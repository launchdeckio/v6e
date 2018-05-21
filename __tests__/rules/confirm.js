'use strict';

const confirm = require('../../lib/rules/confirm');

it('checks whether one field matches the value of another field', () => {
    const confirmPasswordRule = confirm({referenceField: 'password'});
    expect(confirmPasswordRule('hoihoi', {
        password: 'hoihoi',
    })).toEqual(null);
    expect(confirmPasswordRule('hoihoi', {
        username: 'pietjebel',
    })).toMatch(/not defined/i);
    expect(confirmPasswordRule('hoihoi', {
        password: 'heyhey',
    })).toMatch(/must be the same/i);
    // return null;
});