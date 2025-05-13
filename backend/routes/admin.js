const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const restaurants = await db.collection('restaurants')
      .find({}, { projection: { _id: 1, restaurant_name: 1 } })
      .toArray();

    res.json(restaurants.map(r => ({
      restaurant_id: r._id,
      restaurant_name: r.restaurant_name
    })));
  } catch (error) {
    console.error('❌ Error fetching restaurants:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
