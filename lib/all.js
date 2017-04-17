'use strict';

const {map, isString, isArray} = require('lodash');

const {all} = require('bluebird');

const validate = require('./validate');

class ValidationError extends Error {
}

/**
 * Given the function that returns or resolves to a validation result,
 * create a function that will throw a ValidationError if that validation fails
 * @param runRule
 */
const throwing = runRule => runRule().then(result => {
    if (isString(result)) throw new ValidationError(result);
});

module.exports = (rules, {error = null} = {}) => {

    if (!isArray(rules))
        throw new TypeError(`Rules should be an array, ${typeof rules} given.`);

    return (...args) => all(map(rules, rule => throwing(() => validate(rule, ...args))))
        .then(() => null, e => {
            if (e instanceof ValidationError)
                return error ? error : e.message;
            throw e;
        });
};