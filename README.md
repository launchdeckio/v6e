# v6e

> Isomorphic functional validation

```js

const {factory, rules: {required}} = require('v6e');

const validate = factory({
    username: [
        required()
    ],
    password: [
        [pwd => pwd === 'hunter2', 'Your password must be "hunter2".']
    ],
});

validate({password: 'hunter2'});

// => {username: "This field is required"}

```

### Why?

- "Custom validators" that have to be registered on some singleton are awkward.
- Schemas should be declarative, readable and flexibly embeddable. 
- Asynchronous rules should be supported by default and fully intermixable with synchronous rules.

### Todo

- Fluent async support
- Implement more built-in rules
- Add "strict" mode where errors will also be raised for fields that aren't explicitly specified in the ruleset.