'use strict';

const validate = require('./lib/validate');

validate.validate = validate;

validate.validator = require('./lib/validator');

validate.util = {
    shake:   require('./lib/util/shake'),
    flatten: require('./lib/util/flatten'),
};

validate.logic = {
    all:  require('./lib/logic/all'),
    or:   require('./lib/logic/or'),
    cond: require('./lib/logic/cond'),
};
validate.rules = require('./rules');

module.exports = validate;