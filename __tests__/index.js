const validate = require('../');

const {rules: {required}} = validate;

const test = (schema, fields, expected) => validate(schema, fields).then(result => {
    return expect(result).toEqual(expected);
});

it('returns an object of errors for values that did not pass validation', () => {

    const userSchema = {
        username: required(),
    };

    return test(userSchema, {}, {username: 'This field is required.'});
});