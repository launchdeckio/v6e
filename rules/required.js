'use strict';

/**
 * "Required" rule (require a field to have value)
 *
 * @param {String} [error = "Required"] Error message
 */
module.exports = (error = 'This field is required.') => val => !!val ? null : error;