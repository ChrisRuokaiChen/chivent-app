// chivent-app/server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const data     = require('./data/events.json');
const Event    = require('./models/Event');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');

  await Event.deleteMany();
  console.log('Cleared events collection');

  await Event.insertMany(data);
  console.log(`Inserted ${data.length} events`);

  mongoose.connection.close();
  console.log('Seeding complete, connection closed');
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
