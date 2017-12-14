'use strict';

class ValidationError {
    constructor(data) {
        this.name    = 'ValidationError';
        this.message = `Validation error: ${data}`;
        this.data    = data;
        this.stack   = (new Error()).stack;

        this._v6eError = true;
    }
}

ValidationError.prototype = new Error;

module.exports = ValidationError;