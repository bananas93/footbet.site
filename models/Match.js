const { Schema, model } = require('mongoose');

const schema = new Schema({
  home_team: {
    type: Schema.ObjectId, 
    ref: 'Teams'
  },
  away_team: {
    type: Schema.ObjectId, 
    ref: 'Teams'
  },
  score: {
    home: {
      type: Number,
      default: 0
    },
    away: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'finished'],
    default: 'scheduled'
  },
  stage: {
    type: String,
    enum: ['Груповий етап', '1/8', '1/4', '1/2', 'Фінал']
  },
  tournament: {
    type: String, 
    enum: ['Ліга Чемпіонів', 'Євро 2020'],
  },
  date: {
    type: Date, 
    required: true, 
    default: Date.now
  },
});

module.exports = model('Match', schema);