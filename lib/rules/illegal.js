'use strict';

/**
 * "Illegal" rule (value must be undefined)
 *
 * @param {String} [error = "Illegal attribute."] Error message
 */
module.exports = ({error = 'Illegal attribute.'} = {}) => val => val !== undefined ? error : null;