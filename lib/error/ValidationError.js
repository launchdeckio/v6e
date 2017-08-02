'use strict';

class ValidationError {
    constructor(data) {
        this.name    = 'ValidationError';
        this.message = `Validation error: ${data}`;
        this.data    = data;
        this.stack   = (new Error()).stack;
    }
}

ValidationError.prototype = new Error;

module.exports = ValidationError;