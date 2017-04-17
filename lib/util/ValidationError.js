'use strict';

module.exports = class ValidationError extends Error {
    constructor(data) {
        super(`Validation error: ${data}`);
        this.data = data;
    }
};