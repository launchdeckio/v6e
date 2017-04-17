'use strict';

const {isString, isNull} = require('lodash');

module.exports = result => isString(result) || isNull(result);