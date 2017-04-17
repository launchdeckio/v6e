'use strict';

const validate = require('./lib/validate');

const rules = require('./rules');
const all   = require('./lib/all');

validate.rules = rules;
validate.all   = all;

module.exports = validate;

// /**
//  * Will create an object of "field" => "error" mappings for every invalid field
//  *
//  * @param {Object|Function} rules
//  * @param {Object} values
//  * @param {*} args Other args (these will be passed to the validator as the 3... etc argument)
//  *
//  * @returns {Object}
//  */
// const validate = (rules, values, ...args) => {
//
//     if (isFunction(rules)) rules = rules(values, ...args);
//
//     let errors = mapValues(rules, (rules, fieldName) => {
//
//         const value = get(values, fieldName);
//         if (isFunction(rules) && rules.isValidator) {
//
//             if (!isObject(value))
//                 throw new TypeError(`Nested validator given at ${fieldName} but the field value is a ${typeof value}`);
//
//             const errors = rules(value);
//             return size(errors) ? errors : undefined;
//         }
//         else if (isArray(rules)) {
//             let firstError = null;
//             forEach(rules, rule => {
//                 if (!isArray(rule) || rule.length !== 2)
//                     throw new TypeError(`Each rule should be formatted as [validate, error], ${typeof rule} given.`);
//                 const [ruleValidator, ruleError] = rule;
//                 if (!ruleValidator(value, values, ...args)) {
//                     firstError = ruleError;
//                     return false;
//                 }
//             });
//             return firstError;
//         } else {
//             throw new TypeError(`Expected either a nested validator or an array of rules, ${typeof rules} given.`);
//         }
//     });
//
//     return pickBy(errors);
// };