const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


// register
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter all fields.' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ user: { id: savedUser._id, username: savedUser.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    res.status(200).json({
      user: { id: user._id, username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};