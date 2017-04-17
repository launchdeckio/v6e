# v6e

> Isomorphic functional validation

```js

const {validate, all, rules: {required, length, format}} = require('v6e');

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

// => {password: 'Must be at least 8 characters long'}

```

### Why?

- "Custom validators" that have to be registered on some singleton are awkward.
- Schemas should be declarative, readable and embeddable. 
- Asynchronous rules should be supported by default and fully intermixable with synchronous rules.
- The purely functional nature encourages use of higher-order validators rather than some vaguely defined convention.

### Todo

- Implement more built-in rules
  - Length
  - Format / regex
- Add "strict" mode where errors will also be raised for fields that aren't explicitly specified in the ruleset.