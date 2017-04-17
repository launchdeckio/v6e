'use strict';

const validate = require('./lib/validate');

validate.validate = validate;

validate.validator = require('./lib/util/validator');
validate.shake     = require('./lib/util/shake');
validate.flatten   = require('./lib/util/flatten');
validate.all       = require('./lib/all');
validate.or        = require('./lib/or');
validate.cond      = require('./lib/cond');
validate.rules     = require('./rules');

module.exports = validate;