'use strict';

const all = require('./../../lib/logic/all');

const email  = require('./../../lib/rules/email');
const length = require('./../../lib/rules/length');

const test = require('./../support/testValidation')();

const schema = {
    email: all([
        email(),
        length({max: 16}),
    ]),
};

it('must pass all validation rules (1)', () => {

    return test(schema, {email: 'user@foo.bar'}, null);
});

it('must pass all validation rules (2)', () => {

    return test(schema, {email: 'this is a long string and not an email address'}, {
        email: 'Must be a valid email address',
    });
});