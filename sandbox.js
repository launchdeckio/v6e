const {
          validate, all, cond, shake, flatten,
          rules: {required, length, withIn, format}
      } = require('.');

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
        [{
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
        }]
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