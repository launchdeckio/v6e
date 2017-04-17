const {validate, all, cond, shake, flatten, rules: {required, length, withIn, format}} = require('.');

const userSchema = {

    photos: all([
        length({
            min:      1,
            minError: n => `You must upload at least ${n} photo(s).`,
        }),
        [{
            fileName: required(),
        }]
    ])
};

validate(userSchema, {
    photos:   [{

    }],
})
    .then(shake)
    .then(flatten)
    .then(console.log);