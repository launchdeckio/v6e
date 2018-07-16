'use strict';

const cond = require('./../../lib/logic/cond');
const test = require('./../support/testValidation')();

it('marks the field as "illegal" if the condition is not met', () => {

    return test({
        field: cond(() => false, null)
    }, {
        field: 'value',
    }, {
        field: 'Illegal attribute.',
    });
});

it('marks the field as "illegal" if the condition is not met (2)', () => {

    return test({
        field: cond(() => false, null)
    }, {}, null);
});