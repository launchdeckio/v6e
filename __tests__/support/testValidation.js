'use strict';

const validate = require('./../../lib');

const defaultCmp = (result, expected) => expect(result).toEqual(expected);

module.exports = (strict = false, cmp = defaultCmp) =>
    (schema, fields, expected) => validate(schema, fields, null, {strict})
        .then(validate.util.shake)
        .then(result => cmp(result, expected));