'use strict';

const ValidationError = require('../error/ValidationError');

const pTry = require('./pTry');

/**
 * Given the function that returns or resolves to a validation result,
 * create a function that will throw a ValidationError if that validation fails
 * @param runRule
 */
module.exports = runRule => pTry(runRule).then(result => {
    if (result !== null) throw new ValidationError(result);
});