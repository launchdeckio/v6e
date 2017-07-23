'use strict';

/**
 * Boolean type rule
 *
 * @param error
 */
module.exports = ({error = 'Must be a boolean'} = {}) => val => (val === true || val === false) ? null : error;