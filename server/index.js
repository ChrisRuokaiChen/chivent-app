// chivent-app/server/index.js

require('dotenv').config();           

const express  = require('express');  
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

// Routers and models
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const Event      = require('./models/Event');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount authentication & cart APIs
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

// Event endpoints
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch {
    res.status(500).json({ error: 'Failed to load events' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
  } catch {
    res.status(500).json({ error: 'Failed to load event' });
  }
});

// Serve React build (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  );
}

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
