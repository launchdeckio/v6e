'use strict';

const validate  = require('./lib/validate');
const validator = require('./lib/validator');
const all       = require('./lib/all');
const rules     = require('./rules');

validate.rules     = rules;
validate.all       = all;
validate.validator = validator;
validate.validate  = validate;

module.exports = validate;