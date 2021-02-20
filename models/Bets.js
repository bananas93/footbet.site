const {Schema, model} = require('mongoose');

const schema = new Schema({
  bet: {
  	score_home: Number,
    score_away: Number
  },
  user: {
  	id: String,
  	name: String
  },
  points: {
  	type: Number,
  	default: null
  },
  date: {
  	type: Date, 
  	required: true, 
  	default: Date.now
  },
  match: {
    type: Schema.ObjectId, 
    ref: 'Match'
  },
});

module.exports = model('Bets', schema);