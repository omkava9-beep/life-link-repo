const router = require('express').Router();
const OrganPledge = require('../models/OrganPledge');
const authMiddleware = require('../middleware/authMiddleware');

// --- CREATE A NEW PLEDGE (Protected) ---
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const newPledge = new OrganPledge({
      ...req.body,
      user: req.user._id,
      pledgerName: req.user.name
    });

    const savedPledge = await newPledge.save();
    res.status(201).json({ message: 'Organ pledge registered successfully!', pledge: savedPledge });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- GET MY PLEDGE (Protected) ---
router.get('/my-pledge', authMiddleware, async (req, res) => {
  try {
    const pledge = await OrganPledge.findOne({ user: req.user._id });
    if (!pledge) {
      return res.status(404).json({ message: 'No pledge found.' });
    }
    res.status(200).json(pledge);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;