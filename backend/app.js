const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const discountsRouter = require('./routes/discounts');
const userRouter = require('./routes/user');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(cors());
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
app.use('/user', userRouter);

module.exports = app;
