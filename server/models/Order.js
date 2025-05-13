// server/models/Order.js
const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    qty:   { type: Number, default: 1 }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Order', OrderSchema);
