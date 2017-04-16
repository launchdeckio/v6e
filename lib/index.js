'use strict';

const {pickBy, get, size, isObject, forEach, mapValues, identity, isFunction, includes, isArray} = require('lodash');

/**
 * Will create an object of "field" => "error" mappings for every invalid field
 *
 * @param {Object|Function} rules
 * @param {Object} values
 * @param {*} args Other args (these will be passed to the validator as the 3... etc argument)
 *
 * @returns {Object}
 */
const validate = (rules, values, ...args) => {

    if (isFunction(rules)) rules = rules(values, ...args);

    let errors = mapValues(rules, (rules, fieldName) => {

        const value = get(values, fieldName);
        if (isFunction(rules) && rules.isValidator) {

            if (!isObject(value))
                throw new TypeError(`Nested validator given at ${fieldName} but the field value is a ${typeof value}`);

            const errors = rules(value);
            return size(errors) ? errors : undefined;
        }
        else if (isArray(rules)) {
            let firstError = null;
            forEach(rules, rule => {
                if (!isArray(rule) || rule.length !== 2)
                    throw new TypeError(`Each rule should be formatted as [validate, error], ${typeof rule} given.`);
                const [ruleValidator, ruleError] = rule;
                if (!ruleValidator(value, values, ...args)) {
                    firstError = ruleError;
                    return false;
                }
            });
            return firstError;
        } else {
            throw new TypeError(`Expected either a nested validator or an array of rules, ${typeof rules} given.`);
        }
    });

    return pickBy(errors);
};

/**
 * Generate a validator function
 *
 * @param {Object} rules
 */
const factory = rules => {
    const validator       = validate.bind(null, rules);
    validator.isValidator = true;
    return validator;
};

/**
 * "Required" rule (require a field to have value)
 *
 * @param {String} [error = "Required"] Error message
 */
const required = (error = 'This field is required.') => [identity, error];

/**
 * "In set" rule (require the field to have a value that is included in the given set of values)
 *
 * @param {String[]} values
 * @param {Function} error
 */
const within = (values, error = (values => `Must be one of: ${values.join(', ')}`)) =>
    [value => includes(values, value), error(values)];

/**
 * "Not in" rule (require the field to have a value that is not included in the given set of values)
 *
 * @param {String[]} values
 * @param {Function} error
 */
const notIn = (values, error = (values => `Cannot be one of: ${values.join(', ')}`)) =>
    [value => !includes(values, value), error(values)];

validate.rules = {required, within, notIn};

validate.factory = factory;

module.exports = validate;