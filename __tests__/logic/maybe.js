'use strict';

const validate = require('./../..');
const maybe    = require('./../../lib/logic/maybe');

const test = (schema, fields, expected) => validate(schema, fields).then(validate.util.shake).then(result => {
    return expect(result).toEqual(expected);
});

const schema = {
    likesCats: maybe(val => val !== true ? 'You must like cats or keep silent about it.' : null),
};

it('doesnt validate if the value is not given.', () => {

    return test(schema, {}, null);
});

it('validates if the value is given', () => {

    return test(schema, {likesCats: false}, {
        likesCats: 'You must like cats or keep silent about it.'
    });
});

it('validates if the value is given', () => {

    return test(schema, {likesCats: true}, null);
});