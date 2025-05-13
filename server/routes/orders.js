const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const Order   = require('../models/Order');
const User    = require('../models/User');

router.use(auth);

// GET /api/orders — list this user’s orders
router.get('/', async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .populate('items.event')
    .sort({ createdAt: -1 });
  res.json(orders);
});

// POST /api/orders — create a new order
router.post('/', async (req, res) => {
  const { items } = req.body; // [{ event, qty }]
  const ord = await Order.create({
    user: req.userId,
    items
  });
  // clear the user’s cart
  const u = await User.findById(req.userId);
  u.cart = [];
  await u.save();

  const populated = await ord.populate('items.event');
  res.status(201).json(populated);
});

module.exports = router;
