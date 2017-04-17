'use strict';

const {isEmpty} = require('lodash');

// based on https://gist.github.com/kirbysayshi/2ea881ebe643458311f4

const flatten = (obj, opt_out, opt_paths) => {

    if (isEmpty(obj)) return null;

    const out = opt_out || {};

    const paths = opt_paths || [];

    return Object.getOwnPropertyNames(obj).reduce(function (out, key) {
        paths.push(key);
        if (typeof obj[key] === 'object') {
            flatten(obj[key], out, paths);
        } else {
            out[paths.join('.')] = obj[key];
        }
        paths.pop();
        return out;
    }, out)
};

module.exports = flatten;