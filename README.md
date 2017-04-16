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

### Todo

- Fluent async support
- Implement more built-in rules