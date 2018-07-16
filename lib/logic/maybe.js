'use strict';

const cond = require('./cond');

/**
 * "Maybe" rule modifier:
 * Only validate the value using the given rule if the value is not null or undefined.
 *
 * @param rule
 *
 * @returns {function}
 */
module.exports = rule => args => {
    return cond(val => val !== null && val !== undefined, rule, null)(args);
};