const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- Import All Routes ---
const authRoutes = require('./routes/auth');
const donationRoutes = require('./routes/donations');
const requestRoutes = require('./routes/requests');
const pledgeRoutes = require('./routes/pledges');

const app = express();
const port = process.env.PORT || 5000;

// --- Middlewares ---
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://life-link-repo.onrender.com', 'https://life-link-repo1.onrender.com', 'https://life-link-repo3.onrender.com', 'https://life-link-frontend.onrender.com']
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'auth-token'],
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON

// --- Route Middlewares ---
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/pledges', pledgeRoutes);

// --- Test Route ---
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the LifeLink backend!" });
});


// --- Database Connection & Server Start ---
console.log("Attempting to connect to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // This runs *only if* the database connection is successful
    console.log('MongoDB connected successfully.');
    
    // We go back to using app.listen()
    app.listen(port, () => {
      console.log(`Backend server listening on http://localhost:${port}`);
    });
  })
  .catch(err => {
    // This runs *only if* the database connection fails
    console.error('MongoDB connection error. Server will not start.');
    console.error(err);
    process.exit(1); // Stops the script
  });