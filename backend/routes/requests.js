const router = require('express').Router();
const Request = require('../models/Request');
const authMiddleware = require('../middleware/authMiddleware');

// --- CREATE A NEW REQUEST (Protected) ---
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const newRequest = new Request({
      ...req.body,
      user: req.user._id,
      requesterName: req.user.name
    });
    
    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully!', request: savedRequest });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- GET ALL REQUESTS (Public) ---
router.get('/all', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- GET MY REQUESTS (Protected) ---
router.get('/my-requests', authMiddleware, async (req, res) => {
  try {
    const userRequests = await Request.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(userRequests);
  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

module.exports = router;