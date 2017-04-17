'use strict';

const validate = require('./lib/validate');

const rules = require('./rules');
const all   = require('./lib/all');

validate.rules = rules;
validate.all   = all;

module.exports = validate;

