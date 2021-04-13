const { Schema, model } = require('mongoose');

const UploadedFile = new Schema({
  path: String,
  type: String,
  size: Number,
  folder: String,
  filename: String,
});

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tournament: {
    type: Schema.ObjectId,
    ref: 'Tournament',
  },
  uploadedFile: UploadedFile,
});

module.exports = model('Teams', schema);
