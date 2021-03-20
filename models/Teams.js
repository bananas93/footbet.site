const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  matches: {
    type: Number,
    default: 0
  },
  win: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  },
  lose: {
    type: Number,
    default: 0
  },
  goals: {
    type: Number,
    default: 0
  },
  goals_against: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
});

module.exports = model('Teams', schema);