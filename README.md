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
    util:  {flatten},
    rules: {required, length, withIn, format},
} = require('v6e');

const hobbySchema = {
    name: required(),
};

// Let's define a custom rule!
// This rule will not validate a single field directly but instead look for the attributes "width" and "height"
// On the other fields (second parameter passed to the rule validator)
const resolution = ({minWidth, minHeight, error = 'Image too small.'}) => {
    return (_, {width, height}) => width < minWidth || height < minHeight ? error : null;
};

// Because of the functional way rules are configured, you can make "templates" by using wrapping functions
const highRes = (error = 'Image must be high-res!') => resolution({minWidth: 3200, minHeight: 2400, error});

// Lets define a CONDITION (note conditions are different from rules)
// that checks on the photo if the "subject" equals "cat"
const condCat = (_, {subject}) => subject === 'cat';

const photoSchema = {
    fileName:   format({
        pattern: /\.(jpe?g|png)$/i,
        error:   'Please upload a jpg or png.',
    }),
    subject:    withIn(['cat', 'dog']),
    width:      required(),
    height:     required(),
    resolution: cond(condCat, highRes('Cat photos must be hi-res.')),
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

const minPhotos = min => count({min, minError: n => `Please upload at least ${n} photo(s).`,});

const userSchema = {
    username: required(),
    password: passwordConstraint,
    hobbies:  [hobbySchema],
    photos:   all([
        minPhotos(1),
        [photoSchema]
    ]),
};

const validate = validator(userSchema, {strict: true});

const input = {
    username:  'sgtlambda',
    password:  'hunter2',
    dropTable: true,
    hobbies:   [{
        name: 'nitpicking',
    }],
    photos:    [{
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
- Higher-order validators allow you to write infinitely complex validation logic using declarative and readable abstractions.

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