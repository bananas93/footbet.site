const { Schema, model } = require('mongoose');

const schema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  tournament: {
    type: Schema.ObjectId,
    ref: 'Tournament',
  },
  matches: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  result: {
    type: Number,
    default: 0,
  },
  difference: {
    type: Number,
    default: 0,
  },
  goals5: {
    type: Number,
    default: 0,
  },
  all: {
    type: Number,
    default: 0,
  },
});

module.exports = model('Results', schema);
