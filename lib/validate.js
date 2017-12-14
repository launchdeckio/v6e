'use strict';

const {props} = require('bluebird');

const {isFunction, isObject, mapValues, isArray, size, get, assign, fromPairs, keys, map, difference} = require('lodash');

const pTry        = require('./util/pTry');
const parseResult = require('./util/parseResult');
const isEndResult = require('./util/isEndResult');

/**
 * Given the fields and the rules, get the names of the fields that are illegal
 * @param fields
 * @param rules
 * @returns string[]
 */
const getIllegalFieldNames = (fields, rules) => difference(keys(fields), keys(rules));

/**
 * Given the fields and the rules, get the errors object for the illegal fields
 * @param fields
 * @param rules
 * @returns {*}
 */
const evaluateIllegal = (fields, rules) => {
    return fromPairs(map(getIllegalFieldNames(fields, rules), field => [field, 'Illegal attribute.']));
};

/**
 * Validate each field in the object using the given rule
 * @param fields
 * @param rules
 * @param options
 * @returns {Promise}
 */
const validateObject = (fields, rules, options) => {

    const errors = options.strict ? evaluateIllegal(fields, rules) : {};

    return props(mapValues(rules, (rule, key) => {

        return validate(rule, get(fields, key), fields, options);

    })).then(assign.bind(this, errors));
};

/**
 * Validate each item in the array using the given rule
 * @param rule
 * @param array
 * @param attributes
 * @param options
 * @returns {Promise}
 */
const validateArray = (rule, array, attributes, options) => {

    return props(mapValues(array, value => validate(rule, value, attributes, options)));
};

/**
 * Interpret the return value from a validation rule
 * @param {boolean|undefined|null|string|*} result
 * @param {*} args
 * @returns {*}
 */
const evaluateResult = (result, ...args) => {

    result = parseResult(result);

    // If the resulting value is a string or null, return that as the validation result
    if (isEndResult(result)) return result;

    // Else loop the result back into the "validate" method with the return value as the new rule
    return validate(result, ...args);
};

/**
 * "Entrypoint" validator
 * @param rule
 * @param value
 * @param attributes
 * @param options
 * @returns {*}
 */
const validate = (rule, value, attributes = null, options = {}) => {

    if (isFunction(rule)) {

        // If the provided rule is a function, invoke that function with the value and the rest of the attributes
        const args = options.args ? options.args : [];

        return pTry(() => rule(value, attributes, ...args)).then(result => {

            return evaluateResult(result, value, attributes, options);

        }).catch(e => {

            // Rules that wish to return an object of errors may do so by throwing
            // a ValidationError Containing the object. This is a necessary "step",
            // since if they were to just resolve to an object, that would be
            // interpreted as a subsequent rule.
            if (e._v6eError) return e.data;
            // since both `e.constructor.name === 'ValidationError'` and
            // `e instanceof ValidationError` weren't consistent in all environments,
            // we're using this "hack" to work around the limitation of extending the
            // builtin Error class

            throw e;
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