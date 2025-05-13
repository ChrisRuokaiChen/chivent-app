// chivent-app/server/routes/auth.js

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const auth   = require('../middleware/auth');

// Sign Up
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    const u = await User.create({ email, password: hash });
    const token = jwt.sign(
      { id: u._id, email: u.email },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Log In
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await bcrypt.compare(password, u.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { id: u._id, email: u.email },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

// Who am I?
router.get('/me', auth, async (req, res) => {
  const u = await User.findById(req.userId).select('email');
  res.json({ id: u._id, email: u.email });
});

module.exports = router;
