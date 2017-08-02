'use strict';

const pTry = require('./../util/pTry');

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
    return async (...args) => {
        const result = await pTry(() => assertion(...args));
        return result ? rule : null;
    };
};