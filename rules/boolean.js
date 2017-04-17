'use strict';

module.exports = (error = 'Must be a boolean') => {
    return val => (val === true || val === false) ? null : error;
};