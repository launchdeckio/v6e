# v6e

> Isomorphic functional validation

```js

const {validate, all, rules: {required, length}} = require('v6e');

const schema = {
    username: required(),
    password: all([
        required(),
        length({min: 8}),
    ]),
};

validate({password: 'hunter2'});

// => {username: "This field is required"}

```

### Why?

- "Custom validators" that have to be registered on some singleton are awkward.
- Schemas should be declarative, readable and flexibly embeddable. 
- Asynchronous rules should be supported by default and fully intermixable with synchronous rules.
- The purely functional nature encourages use of higher-order validators rather than some vaguely defined convention.

### Todo

- Implement more built-in rules
  - Length
  - Format / regex
- Add "strict" mode where errors will also be raised for fields that aren't explicitly specified in the ruleset.