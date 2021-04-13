/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Будь ласка, вкажіть ваше ім'я"],
  },
  email: {
    type: String,
    required: [true, 'Будь ласка, напишіть ваш email'],
  },
  password: {
    type: String,
    required: [true, 'Будь ласка, створіть ваш пароль'],
  },
});

// this method will hash the password before saving the user model
userSchema.pre('save', async (next) => {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// this method generates an auth token for the user
userSchema.methods.generateAuthToken = async () => {
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, 'secret');
  return token;
};

// this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`Користувача з email ${email} не знайдено`);
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Невірний пароль');
  }
  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
