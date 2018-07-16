'use strict';

const pTry = require('./../util/pTry');

/**
 * Conditional rule modifier:
 * The given rule only applies if the assertion evaluates to true. If the assertion evaluates to false,
 * the field will be "illegal" by default. Setting "elseRule" to "null" will instead allow any value
 * when the assertion evaluates to false. The assertion will be invoked with (value, fields).
 *
 * @param {Function} assertion
 * @param {*} rule The rule that applies if the assertion evaluates to true.
 * @param {*} [elseRule = function] The rule that applies if the assertion evaluates to false.
 *
 * @returns {function}
 */
module.exports = (assertion, rule, elseRule = () => "Illegal attribute.") => {
    return (...args) => {
        return pTry(() => assertion(...args))
            .then(result => result ? rule : elseRule);
    };
};