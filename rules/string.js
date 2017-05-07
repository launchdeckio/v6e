'use strict';

const {isString} = require('lodash');

/**
 * String type rule
 *
 * @param error
 */
module.exports = ({error = 'Must be a string'} = {}) => val => isString(val) ? null : error;