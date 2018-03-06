'use strict';

const pTry              = require('./pTry');
const isValidationError = require('./isValidationError');

/**
 * Given the promise-returning function
 * runRule, return a function that catches ValidationErrors and
 * instead returns the error data. If no ValidationError occurs,
 * null is returned from the function. (The opposite of "throwing")
 * @param {Function} runRule
 * @returns {*}
 */
module.exports = runRule => pTry(runRule).then(() => null, e => {
    if (isValidationError(e)) return e.data;
    throw e;
});

