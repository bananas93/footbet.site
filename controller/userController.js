/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerNewUser = async (req, res) => {
  try {
    const { email } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser !== null) {
      res.status(409).json({
        message: 'email already in use',
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).json({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: `${err}` });
  }
};
const changePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    let { newpassword } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      res.status(401).json({ error: 'Невірний старий пароль' });
    }
    newpassword = await bcrypt.hash(newpassword, 8);
    User.updateOne({ _id: user._id }, { $set: { password: newpassword } })
      .then((response) => res.status(200).json({ response, message: 'Пароль успішно змінено' }))
      .catch((error) => res.status(400).json({ message: error }));
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};
const getUserDetails = async (req, res) => {
  await res.json(req.userData);
};

module.exports = {
  registerNewUser, loginUser, changePassword, getUserDetails,
};
