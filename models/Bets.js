const {Schema, model} = require('mongoose');

const schema = new Schema({
  bet: {
  	home: {
      type: Number,
      required: true,
    },
    away: {
      type: Number,
      required: true,
    }
  },
  user: {
  	type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
  	type: Date,
  	required: true,
  	default: Date.now
  },
  match: {
    type: Schema.ObjectId, 
    ref: 'Match',
    required: true,
  },
});

module.exports = model('Bets', schema);