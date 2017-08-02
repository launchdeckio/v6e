'use strict';

const {isNull} = require('lodash');

const ValidationError = require('../error/ValidationError');

const pTry = require('./pTry');

/**
 * Given the function that returns or resolves to a validation result,
 * create a function that will throw a ValidationError if that validation fails
 * @param runRule
 */
module.exports = async runRule => {
    const result = await pTry(runRule);
    if (!isNull(result)) throw new ValidationError(result);
};