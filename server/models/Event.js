const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
  title:         { type: String, required: true },
  description:   { type: String, required: true },
  imageUrl:      { type: String, required: true },
  location:      { type: String, required: true },
  startDateTime: { type: Date,   required: true },
  endDateTime:   { type: Date,   required: true },
  price:         { type: Number, required: true }
});

module.exports = model('Event', EventSchema);
