'use strict';

const {isNull} = require('lodash');

const pTry = cb => new Promise(resolve => {
    resolve(cb());
});

const ValidationError = require('./ValidationError');

/**
 * Given the function that returns or resolves to a validation result,
 * create a function that will throw a ValidationError if that validation fails
 * @param runRule
 */
module.exports = runRule => pTry(runRule).then(result => {
    if (!isNull(result)) throw new ValidationError(result);
});