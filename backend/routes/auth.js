const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// --- REGISTER ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully!", userId: savedUser._id });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    res.header('auth-token', token).json({
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- VALIDATE TOKEN ---
router.get('/validate-token', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
      valid: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// --- FORGOT PASSWORD ---
router.post('/forgot-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({ message: "If your email is registered, a password reset has been initiated." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password has been updated successfully." });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});


module.exports = router;