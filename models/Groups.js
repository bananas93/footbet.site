const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  teams: [{
    type: Schema.ObjectId, 
    ref: 'Teams'
  }],
  tournament: {
    type: Schema.ObjectId, 
    ref: 'Tournament'
  }
});

module.exports = model('Groups', schema);