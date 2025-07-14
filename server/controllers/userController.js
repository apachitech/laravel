const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;

      const newUser = {
        username,
        email,
        password: hash
      };

      User.create(newUser, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.status(201).json({ msg: 'User registered' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const user = results[0];

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET, // Use environment variable for secret
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
    });
  });
};
