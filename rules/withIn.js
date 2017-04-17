'use strict';

const {includes} = require('lodash');

/**
 * "In set" rule (require the field to have a value that is included in the given set of values)
 *
 * @param {String[]} values
 * @param {Function} error
 */
module.exports = ({
                      values,
                      error = (values => `Must be one of: ${values.join(', ')}.`)
                  } = {}) =>
    value => includes(values, value) ? null : error(values);