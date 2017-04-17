'use strict';

const {size} = require('lodash');

/**
 * "Length" rule
 * @param min
 * @param max
 * @param is
 * @param minError
 * @param maxError
 * @param isError
 * @returns {function}
 */
module.exports = ({
                      min = null,
                      max = null,
                      is = null,
                      minError = min => `Must be at least ${min} characters long`,
                      maxError = max => `Can't be more than ${max} characters long`,
                      isError = len => `Must be exactly ${len} characters long`,
                  } = {}) => {

    if (is && (min || max))
        throw new TypeError('You cannot use both "is" and either "min" or "max" on the "length" rule');

    if (min && max && min > max)
        throw new TypeError('"min" cannot be higher than "max" on the "length" rule');

    return val => {
        const length = size(val);
        if (is && length !== is) return isError(is);
        if (min && length < min) return minError(min);
        if (max && length > max) return maxError(max);
        return null;
    };
};