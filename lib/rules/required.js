'use strict';

/**
 * "Required" rule (require a field to have value)
 *
 * @param {String} [error = "This field is required."] Error message
 */
module.exports = ({error = 'This field is required.'} = {}) => val => !!val ? null : error;