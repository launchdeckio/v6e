const validate = require('../lib');

const testStrict = require('./support/testValidation')(true);

const {rules: {required}} = validate;

it('shows "Illegal attribute" as an error for unspecified fields in strict mode', () => {

    const userSchema = {
        username: required(),
    };

    return testStrict(userSchema, {
        username:    'johndoe',
        sneakyField: 'get hacked',
    }, {sneakyField: 'Illegal attribute.'});
});