const {
          validator,
          logic: {all, cond},
          util:  {flatten},
          rules: {required, length, withIn, format},
      } = require('.');

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