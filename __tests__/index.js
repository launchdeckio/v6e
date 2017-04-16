const validate = require('./../lib');

const {rules: {required}, factory} = validate;

it('returns an object of errors for values that did not pass validation', () => {

    let rules = {
        username: [required()],
        password: [
            [p => !!p, 'Must provide a password'],
            [p => p.length >= 8, 'Password must be at least 8 characters long']
        ]
    };

    expect(validate(rules, {})).toEqual({username: 'This field is required.', password: 'Must provide a password'});

    expect(validate(rules, {username: 'joopbarrie', password: 'hunter222'})).toEqual({});

    expect(validate(rules, {username: 'joopbarrie'})).toEqual({password: 'Must provide a password'});

    expect(validate(rules, {
        username: 'joopbarrie',
        password: '2short'
    })).toEqual({password: 'Password must be at least 8 characters long'});
});

it('should also accept a function that returns a set of rules based on the given input values', () => {

    let rules = values => {

        let rules    = {};
        rules.iHaveA = [[v => v === 'cat' || v === 'dog', 'Must have either a cat or a dog']];

        if (values.iHaveA && values.iHaveA === 'cat')
            rules.catName = [[v => !!v, 'Must provide a cat name']];

        if (values.iHaveA && values.iHaveA === 'dog')
            rules.dogName = [[v => !!v, 'Must provide a dog name']];

        return rules;
    };

    expect(validate(rules, {iHaveA: 'snake'})).toEqual({iHaveA: 'Must have either a cat or a dog'});

    expect(validate(rules, {iHaveA: 'cat'})).toEqual({catName: 'Must provide a cat name'});

    expect(validate(rules, {iHaveA: 'cat', catName: 'slinkyDog'})).toEqual({});
});

it('should pass other args to the validator functions', () => {

    let rules = {
        username: [[
            (value, values, existingUsername) => {
                return value !== existingUsername;
            }, 'The given username already exists'
        ]]
    };

    expect(validate(rules, {username: 'barry'})).toEqual({});

    expect(validate(rules, {username: 'barry'}, 'barry')).toEqual({username: 'The given username already exists'});
});

it('should allow nested validators', () => {

    let rules = {
        username: [[u => !!u, 'Must provide a username']],
        name:     factory({
            first: [[n => !!n, 'Must provide a first name']],
        }),
    };

    expect(validate(rules, {
        username: 'barry', name: {first: 'Barry'}
    })).toEqual({});

    expect(validate(rules, {
        username: 'barry', name: {}
    })).toEqual({
        name: {
            first: 'Must provide a first name'
        }
    });
});