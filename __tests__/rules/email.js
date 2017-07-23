'use strict';

const email = require('../../lib/rules/email');

it('checks whether the value is a valid email address', () => {
    expect(email()('john@example.com')).toBe(null);
    expect(email()('invalid')).toMatch(/email/);
});