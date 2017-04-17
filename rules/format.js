'use strict';

const {isString} = require('lodash');

/**
 * "Format" rule
 *
 * @param {RegExp} pattern
 * @param error
 */
module.exports = ({
                      pattern,
                      error = 'Incorrectly formatted'
                  } = {}) => {

    if (!(pattern instanceof RegExp))
        throw new TypeError(`Expected "pattern" to be an instance of RegExp, ${typeof pattern} given.`);

    return value => {
        if (!isString(value)) return `${error} (expected a string).`;
        return pattern.test(value) ? null : error;
    };
};