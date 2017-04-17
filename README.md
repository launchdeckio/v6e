# v6e

> Isomorphic functional validation

```js

const {
          validate, all, cond, shake, flatten,
          rules: {required, length, withIn, format}
      } = require('v6e');

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

    photos: all([
        length({
            min:      1,
            minError: n => `Please upload at least ${n} photo(s).`,
        }),
        [photoSchema]
    ]),
};

const input = {
    username: 'sgtlambda',
    password: 'hunter2',
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

validate(userSchema, input).then(shake).then(flatten).then(console.log);

// { 
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

#### Why no field names in the validation errors?

- The errors object is a collection of `field: error` mappings, this is actually more useful for APIs.
- The absence of field names within the messages themselves encourages UI design such that the error messages are placed above or underneath the actual field, as it should be anyways.

### Todo

- Add "strict" mode where errors will also be raised for fields that aren't explicitly specified in the ruleset.