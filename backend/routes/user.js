const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/active-discounts', async (req, res) => {
  try {
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Australia/Melbourne',
    });

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    const restaurantsColl = db.collection('restaurants');
    const result = [];

    for (const { name } of collections) {
      if (!name.startsWith('restaurant_')) continue;

      const collection = db.collection(name);

      const [latest] = await collection
        .find({ date: today })
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

      if (!latest || !latest.accepted_discounts) continue;

      const active = {};
      for (const [hour, value] of Object.entries(latest.accepted_discounts)) {
        if (typeof value === 'number') {
          active[hour] = value;
        }
      }

      if (Object.keys(active).length > 0) {
        const restaurantInfo = await restaurantsColl.findOne({ _id: latest.restaurant_id });
        result.push({
          restaurant_id: latest.restaurant_id,
          restaurant_name: restaurantInfo?.restaurant_name || name,
          date: latest.date,
          active_discounts: active
        });
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Error fetching active discounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
