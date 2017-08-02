'use strict';

const maybe = require('./../../lib/logic/maybe');
const test  = require('./../support/testValidation')();

const law = 'You must either like cats or keep silent about it.';

const schema = {
    likesCats: maybe(val => val !== true ? law : null),
};

it('doesnt validate if the value is not given.', () => {

    return test(schema, {}, null);
});

it('validates if the value is given (1)', () => {

    return test(schema, {likesCats: false}, {
        likesCats: law
    });
});

it('validates if the value is given (2)', () => {

    return test(schema, {likesCats: true}, null);
});