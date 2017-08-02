const validate = require('../lib');

const test = require('./support/testValidation')();

const {rules: {required}} = validate;

it('returns an object of errors for values that did not pass validation', () => {

    const userSchema = {
        username: required(),
    };

    return test(userSchema, {}, {username: 'This field is required.'});
});