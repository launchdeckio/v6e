'use strict';

const validate = require('./validate');

validate.validate = validate;

validate.validator = require('./validator');

validate.util = {
    shake:   require('./util/shake'),
    flatten: require('./util/flatten'),
};

validate.logic = {
    all:   require('./logic/all'),
    or:    require('./logic/or'),
    cond:  require('./logic/cond'),
    maybe: require('./logic/maybe'),
};
validate.rules = require('./rules/index');

module.exports = validate;