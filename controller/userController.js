const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.registerNewUser = async (req, res) => {
  try {
    let email = req.body.email;
  	const isUser = await User.findOne({ email });
    if (isUser !== null) {
      return res.status(409).json({
        message: "email already in use"
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    let data = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: `${err}` });
  }
};
exports.changePassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let newpassword = req.body.newpassword;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Невірний старий пароль" });
    }
    newpassword = await bcrypt.hash(newpassword, 8);
    User.updateOne({ _id: user._id, }, { $set: { password: newpassword } })
    .then((response) => res.status(200).json({ response, message: 'Пароль успішно змінено' }))
    .catch((error) => res.status(400).json({message: error}))
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};