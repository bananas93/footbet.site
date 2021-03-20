const { Schema, model } = require('mongoose');
const calcultePoints = require('../utils/calcultePoints');

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
  group: {
    type: String, 
    enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  },
  date: {
    type: Date, 
    required: true, 
    default: Date.now
  },
});

const createLog = (originalResponse, request) => {
  calcultePoints(request.payload._id, request.payload['score.home'], request.payload['score.away']);
  return originalResponse;
}
const { ACTIONS } = require('admin-bro')
ACTIONS.edit.after = createLog

module.exports = model('Match', schema);