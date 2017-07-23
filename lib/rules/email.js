'use strict';

const {validate} = require('email-validator');

/**
 * Email address validator
 *
 * @param error
 */
module.exports = ({error = 'Must be a valid email address'} = {}) => val => validate(val) ? null : error;