'use strict';

const pTry = require('p-try');

/**
 * Conditional rule modifier:
 * The given rule only applies if the assertion evaluates to true.
 * The assertion will be invoked with (value, fields, .
 *
 * @param {Function} assertion
 * @param rule
 *
 * @returns {function}
 */
module.exports = (assertion, rule) => {
    return (...args) => {
        return pTry(() => assertion(...args)).then(result => result ? rule : null);
    };
};