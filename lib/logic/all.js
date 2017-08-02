'use strict';

const {map, isArray} = require('lodash');

const {all} = require('bluebird');

const validate        = require('../validate');
const throwing        = require('../util/throwing');
const ValidationError = require('../error/ValidationError');

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

    return async (...args) => {

        try {

            await all(map(rules, rule => throwing(() => validate(rule, ...args))));
            return null;
        } catch (e) {

            throw (e instanceof ValidationError && error) ? new ValidationError(error) : e;
        }
    };
};