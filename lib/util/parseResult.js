'use strict';

const {isUndefined} = require('lodash');

/**
 * Reduce a result of type boolean, undefined, null or string to just null or string
 * @param result
 * @returns {*}
 */
module.exports = result => {

    // "false" means the validation didn't pass but no error message was provided, use default
    if (result === false) return 'Invalid input';

    // both "undefined" and "true" mean the validation passed, return null
    if (isUndefined(result) || result === true) return null;

    return result;
};