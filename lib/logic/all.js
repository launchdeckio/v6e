'use strict';

const {map, isArray} = require('lodash');

const {all} = require('bluebird');

const validate        = require('../validate');
const throwing        = require('../util/throwing');
const ValidationError = require('../util/ValidationError');

/**
 * Validate that all the given rules pass
 *
 * @param rules
 * @param error
 *
 * @returns {function}
 */
module.exports = (rules, {error = null} = {}) => {

    if (!isArray(rules))
        throw new TypeError(`Rules should be an array, ${typeof rules} given.`);

    return (...args) => all(map(rules, rule => throwing(() => {
        return validate(rule, ...args);
    }))).then(() => null, e => {
        if (e instanceof ValidationError && error)
            throw new ValidationError(error);
        throw e;
    });
};