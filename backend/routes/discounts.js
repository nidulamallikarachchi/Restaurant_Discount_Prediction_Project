const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /discounts/:restaurant_id
router.get('/:restaurant_id', async (req, res) => {
  try {
    const restaurantId = req.params.restaurant_id;

    // Use local Melbourne date in "YYYY-MM-DD" format
    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Australia/Melbourne',
    });

    const collectionName = `restaurant_${restaurantId}`;
    const collection = mongoose.connection.collection(collectionName);

    // Find the latest document for today (if duplicates exist)
    const result = await collection
      .find({ date: today })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    if (!result.length) {
      return res.status(404).json({ message: 'No prediction data found for today' });
    }

    const { expected_customers, discounts, accepted_discounts } = result[0];

    res.status(200).json({
      expected_customers,
      discounts,
      accepted_discounts,
    });
  } catch (error) {
    console.error('❌ Error fetching discounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
