'use strict';

const {map, isArray} = require('lodash');

const {some} = require('bluebird');

const validate          = require('../validate');
const throwing          = require('../util/throwing');
const ValidationError   = require('../error/ValidationError');
const isValidationError = require('../util/isValidationError');

/**
 * Validate that at least 1 (or any other given count) of the given rules passes.
 *
 * @param rules
 * @param atLeast
 * @param error
 *
 * @returns {function}
 */
module.exports = (rules, {atLeast = 1, error = null} = {}) => {

    if (!isArray(rules))
        throw new TypeError(`Rules should be an array, ${typeof rules} given.`);

    return (...args) => some(map(rules, rule => throwing(() => {
        return validate(rule, ...args);
    })), atLeast).then(() => null, e => {
        throw (isValidationError(e) && error) ? new ValidationError(error) : e;
    });
};