'use strict';

const pTry = require('./../util/pTry');

/**
 * Conditional rule modifier:
 * The given rule only applies if the assertion evaluates to true.
 * The assertion will be invoked with (value, fields)
 *
 * @param {Function} assertion
 * @param {*} rule The rule that applies if the assertion evaluates to true.
 * @param {*} elseRule The rule that applies if the assertion evaluates to false.
 *
 * @returns {function}
 */
module.exports = (assertion, rule, elseRule = null) => {
    return (...args) => {
        return pTry(() => assertion(...args)).then(result => result ? rule : elseRule);
    };
};