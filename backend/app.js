const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const discountsRouter = require('./routes/discounts');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to the correct DB explicitly
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'restaurant_prediction_data',
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Register routes
app.use('/discounts', discountsRouter);

module.exports = app;
