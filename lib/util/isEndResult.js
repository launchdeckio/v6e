'use strict';

const {isString} = require('lodash');

module.exports = result => isString(result) || result === null;