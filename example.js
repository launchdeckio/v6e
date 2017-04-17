const {validate, all, rules: {required, length, format}} = require('.');

const userSchema = {

    username: required(),

    password: all([
        required(),
        length({min: 8}),
        all([
            format({pattern: /\d/}),
            format({pattern: /[a-z]/}),
            format({pattern: /[A-Z]/}),
        ], {error: 'Should contain at least one digit, one lowercase letter and one uppercase letter.'}),
    ]),
};

validate(userSchema, {username: 'sgtlambda', password: 'hunter2'}).then(console.log);