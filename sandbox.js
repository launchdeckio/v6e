const {
          validator,
          logic: {all, cond},
          util:  {flatten},
          rules: {required, length, count, withIn, format},
      } = require('.');

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