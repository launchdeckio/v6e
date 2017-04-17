'use strict';

const shake = require('./../lib/util/shake');

it('recursively removes all empty objects and values from the tree', () => {

    expect(shake({
        some:  {
            prop: {
                a: null,
            },
            b:    null,
        },
        other: {
            prop: {
                a: 'hi',
                b: null
            }
        }
    })).toEqual({
        other: {prop: {a: 'hi'}}
    })
});