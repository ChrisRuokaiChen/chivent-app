const { Schema, model } = require('mongoose');

const CartItemSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  qty:   { type: Number, default: 1 }
});

const UserSchema = new Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },   // bcrypt hash
  cart:     [CartItemSchema]
});

module.exports = model('User', UserSchema);
