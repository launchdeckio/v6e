'use strict';

const {includes} = require('lodash');

/**
 * "Not in" rule (require the field to have a value that is not included in the given set of values)
 *
 * @param {String[]} values
 * @param {Function} error
 */
module.exports = ({
                      values,
                      error = (values => `Cannot be one of: ${values.join(', ')}.`)
                  } = {}) =>
    value => !includes(values, value) ? null : error(values);