'use strict';

const {isObject, isEmpty, size, mapValues, pickBy} = require('lodash');

const shake = obj => {

    if (!isObject(obj)) return isEmpty(obj) ? null : obj;

    const shaken = pickBy(mapValues(obj, shake));

    if (!size(shaken)) return null;

    return shaken;
};

module.exports = shake;