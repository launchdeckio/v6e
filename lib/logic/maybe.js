'use strict';

const cond = require('cond');

/**
 * "Maybe" rule modifier:
 * Only validate the value using the given rule if the value is not null.
 *
 * @param rule
 *
 * @returns {function}
 */
module.exports = rule => cond(val => val !== null, rule);