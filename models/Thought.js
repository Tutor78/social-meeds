const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: string,
            required: true,
            len: [1, 128]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: 'string',
            required: true
        }, 
        reactions: []
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;