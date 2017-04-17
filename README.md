# v6e

> Isomorphic functional validation

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]

### Install

```bash
$ npm install v6e
```

### Example

```js

const {
    validator,
    logic: {all, cond},
    util:  {shake, flatten},
    rules: {required, length, withIn, format},
} = require('v6e');

const hobbySchema = {
    name: required(),
};

const photoSchema = {
    fileName:   format({
        pattern: /\.(jpe?g|png)$/i,
        error:   'Please upload a jpg or png.',
    }),
    subject:    withIn(['cat', 'dog']),
    width:      required(),
    height:     required(),
    resolution: cond((_, {subject}) => subject === 'cat', (_, {width, height}) => {
        return width < 800 || height < 600 ? 'Cat photos must be hi-res.' : null;
    }),
};

const passwordConstraint = all([
    required(),
    length({min: 8}),
    all([
        format({pattern: /\d/}),
        format({pattern: /[a-z]/}),
        format({pattern: /[A-Z]/}),
    ], {error: 'Should contain at least one digit, one lowercase letter and one uppercase letter.'}),
]);

const userSchema = {

    username: required(),

    password: passwordConstraint,

    hobbies: [hobbySchema],

    photos: all([
        length({
            min:      1,
            minError: n => `Please upload at least ${n} photo(s).`,
        }),
        [photoSchema]
    ]),
};

const validate = validator(userSchema, {strict: true});

const input = {
    username: 'sgtlambda',
    password: 'hunter2',
    dropTable: true,
    hobbies:  [{
        name: 'nitpicking',
    }],
    photos:   [{
        fileName: 'funny.jpg',
        subject:  'cat',
        width:    400,
        height:   300,
    }, {
        fileName: 'dangerous.pdf',
        subject:  'dog',
        width:    400,
        height:   300,
    }]
};

validate(input).then(flatten).then(console.log);

// { 
//   'dropTable': 'Illegal attribute.',
//   'password': 'Must be at least 8 characters long',
//   'photos.0.resolution': 'Cat photos must be hi-res.',
//   'photos.1.fileName': 'Please upload a jpg or png.' 
// }

```

### Why?

- "Custom validators" that have to be registered on some singleton are awkward.
- Schemas should be declarative, readable and embeddable. 
- Asynchronous rules should be supported by default and fully intermixable with synchronous rules.
- The purely functional nature encourages use of higher-order validators rather than some vaguely defined convention.
- Higher-order validators allow you to write infinitely complex validation logic

#### Why no field names in the validation errors?

- The errors object is a collection of `field: error` mappings, this is actually more useful for APIs.
- The absence of field names within the messages themselves encourages UI design such that the error messages are placed above or underneath the actual field, as it should be anyways.

## License

MIT © [sgtlambda](http://github.com/sgtlambda)

[![dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[travis-image]: https://img.shields.io/travis/launchdeckio/v6e.svg?style=flat-square
[travis-url]: https://travis-ci.org/launchdeckio/v6e

[david-image]: https://img.shields.io/david/launchdeckio/v6e.svg?style=flat-square
[david-url]: https://david-dm.org/launchdeckio/v6e

[david-dev-image]: https://img.shields.io/david/dev/launchdeckio/v6e.svg?style=flat-square
[david-dev-url]: https://david-dm.org/launchdeckio/v6e#info=devDependencies

[npm-image]: https://img.shields.io/npm/v/v6e.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/v6e