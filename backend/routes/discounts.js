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

// POST /discounts/respond
router.post('/respond', async (req, res) => {
  try {
    const { restaurant_id, accepted_discounts } = req.body;

    if (!restaurant_id || !accepted_discounts || typeof accepted_discounts !== 'object') {
      return res.status(400).json({ message: 'restaurant_id and accepted_discounts are required and must be an object' });
    }

    const today = new Date().toLocaleDateString('en-CA', {
      timeZone: 'Australia/Melbourne',
    });

    const collectionName = `restaurant_${restaurant_id}`;
    const collection = mongoose.connection.collection(collectionName);

    // Step 1: Find the most recent prediction document for today
    const [latest] = await collection
      .find({ date: today })
      .sort({ _id: -1 })
      .limit(1)
      .toArray();

    if (!latest) {
      return res.status(404).json({ message: 'No prediction entry found to update' });
    }

    // Step 2: Build full accepted_discounts object
    const fullAccepted = {};
    const allHours = Object.keys(latest.discounts);

    for (const hour of allHours) {
      fullAccepted[hour] = accepted_discounts.hasOwnProperty(hour)
        ? accepted_discounts[hour]
        : false;  // Default to false (rejected) if not explicitly included
    }

    // Step 3: Update the document
    await collection.updateOne(
      { _id: latest._id },
      { $set: { accepted_discounts: fullAccepted } }
    );

    res.status(200).json({ message: 'Discount responses updated successfully' });
  } catch (error) {
    console.error('❌ Error updating discounts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
