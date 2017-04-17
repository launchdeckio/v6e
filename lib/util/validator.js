'use strict';

const validate = require('../validate');

/**
 * Create a bound validator (a function that validates a set of fields based on a predefined set of rules)
 * @param rules
 * @param options
 * @returns {Function}
 */
module.exports = (rules, options = {}) => fields => {
    return validate(rules, fields, null, options);
};