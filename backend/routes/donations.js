const router = require('express').Router();
const Donation = require('../models/Donation');
const authMiddleware = require('../middleware/authMiddleware');

// --- CREATE A NEW DONATION (Protected) ---
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const newDonation = new Donation({
      ...req.body,
      user: req.user._id,
      donorName: req.user.name
    });
    
    const savedDonation = await newDonation.save();
    res.status(201).json({ message: 'Donation registered successfully!', donation: savedDonation });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- GET ALL DONATIONS (Public) ---
router.get('/all', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- GET MY DONATIONS (Protected) ---
router.get('/my-donations', authMiddleware, async (req, res) => {
  try {
    const userDonations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(userDonations);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;