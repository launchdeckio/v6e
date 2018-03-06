'use strict';

const {map, isArray} = require('lodash');

const validate          = require('../validate');
const throwing          = require('../util/throwing');
const ValidationError   = require('../error/ValidationError');
const isValidationError = require('../util/isValidationError');

/**
 * Validate that all the given rules pass
 *
 * @param rules
 * @param {string|null} [error = null] Optionally "override" the ValidationError message
 *
 * @returns {function}
 */
module.exports = (rules, {error = null} = {}) => {

    if (!isArray(rules))
        throw new TypeError(`Rules should be an array, ${typeof rules} given.`);

    return (...args) => Promise.all(map(rules, rule => throwing(() => {
        return validate(rule, ...args);
    }))).then(() => null, e => {
        throw (isValidationError(e) && error) ? new ValidationError(error) : e;
    });
};