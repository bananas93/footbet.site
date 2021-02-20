const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {
        type: String, 
        enum: ['Ліга Чемпіонів', 'Євро 2020'],
    },
    season: {
        type: String,
        enum: ['2021', '2020/2021', '2021/2022', '2022/2023']
    },
  
});

module.exports = model('Tournament', schema);