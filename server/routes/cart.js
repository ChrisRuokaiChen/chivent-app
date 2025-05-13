// server/routes/cart.js
const express = require('express');
const router  = express.Router();          // <‑‑ create the router first
const auth    = require('../middleware/auth');
const User    = require('../models/User');

/* ---------- all cart routes require JWT ---------- */
router.use(auth);

/* GET current cart */
router.get('/', async (req, res) => {
  const u = await User.findById(req.userId).populate('cart.event');
  res.json(u.cart);
});

/* ADD item { eventId, qty } */
router.post('/', async (req, res) => {
  const { eventId, qty = 1 } = req.body;
  const u = await User.findById(req.userId);
  const item = u.cart.find(i => i.event.equals(eventId));
  if (item) item.qty += qty;
  else       u.cart.push({ event: eventId, qty });
  await u.save();
  await u.populate('cart.event');
  res.json(u.cart);
});

/* UPDATE qty { qty } */
router.patch('/:eventId', async (req, res) => {
  const { qty } = req.body;
  const u = await User.findById(req.userId);
  const item = u.cart.find(i => i.event.equals(req.params.eventId));
  if (item) item.qty = qty;
  await u.save();
  await u.populate('cart.event');
  res.json(u.cart);
});

/* REMOVE item */
router.delete('/:eventId', async (req, res) => {
  const u = await User.findById(req.userId);
  u.cart = u.cart.filter(i => !i.event.equals(req.params.eventId));
  await u.save();
  await u.populate('cart.event');
  res.json(u.cart);
});

module.exports = router;
