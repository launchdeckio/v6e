'use strict';

const {isArray, size} = require('lodash');

/**
 * Array "count" rule
 *
 * @param min
 * @param max
 * @param is
 * @param minError
 * @param maxError
 * @param isError
 */
module.exports = ({
                      min = null,
                      max = null,
                      is = null,
                      minError = min => `Must contain at least ${min} items.`,
                      maxError = max => `Can't contain more than ${max} items.`,
                      isError = len => `Must contain exactly ${len} items.`,
                  } = {}) => {

    if (is && (min || max))
        throw new TypeError('You cannot use both "is" and either "min" or "max" on the "count" rule');

    if (min && max && min > max)
        throw new TypeError('"min" cannot be higher than "max" on the "count" rule');

    return val => {
        if (!isArray(val)) return 'Expected an array.';
        const length = size(val);
        if (is && length !== is) return isError(is);
        if (min && length < min) return minError(min);
        if (max && length > max) return maxError(max);
        return null;
    };
};