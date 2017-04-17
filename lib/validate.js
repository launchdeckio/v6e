'use strict';

const pTry    = require('p-try');
const {props} = require('bluebird');

const {isFunction, isObject, isString, isUndefined, mapValues, isArray, pickBy, negate, isEmpty, isNull, size, get} = require('lodash');

const pickByNonEmpty = result => pickBy(result, negate(isEmpty));

const validateObject = (fields, rules, options) => {

    return props(mapValues(rules, (rule, key) => {

        const value = get(fields, key);

        return validate(rule, value, fields, options);

    })).then(options.showAll ? null : pickByNonEmpty);

    // @TODO check for unspecified attributes in strict mode
};

const validateArray = (rule, array, attributes, options) => {

    const validateAll = mapValues(array, value => validate(rule, value, attributes, options));

    return props(validateAll).then(options.showAll ? null : pickByNonEmpty);
};

/**
 * Interpret the return value from a validation rule
 * @param {boolean|undefined|null|string|*} result
 * @param {*[]} args
 * @returns {*}
 */
const evaluateResult = (result, ...args) => {

    // "false" means the validation didn't pass but no error message was provided, use default
    if (result === false) return 'Invalid input';

    // both "undefined" and "true" mean the validation passed, return null
    if (isUndefined(result) || result === true) return null;

    // If the resulting value is a string or null, return that as the validation result
    if (isString(result) || isNull(result)) return result;

    // Else loop the result back into the "validate" method with the return value as the new rule
    return validate(result, ...args);
};

const validate = (rule, value, attributes = null, options = {}) => {

    if (isFunction(rule)) {

        // If the provided rule is a function, invoke that function with the value and the rest of the attributes
        const args = options.args ? options.args : [];

        return pTry(() => rule(value, attributes, ...args)).then(result => {

            return evaluateResult(result, value, attributes, options);
        });
    }
    if (isArray(rule)) {

        if (size(rule) !== 1)
            throw new TypeError(`Expected the array-type rule to have a length of 1, got ${size(rule)}`);

        // The given rule is an array so the value should be an array, too
        if (!isArray(value)) return 'Expected an array';

        return validateArray(rule[0], value, attributes, options);
    }
    if (isObject(rule)) {

        // The given rule is an object and thus represents a data structure, so the value should be an object, too
        if (!isObject(value)) return 'Expected an object';

        return validateObject(value, rule, options);
    }
    throw new TypeError(`Expected the validation rule to be a function, Schema, object or array, got ${typeof rule}`);
};

module.exports = validate;