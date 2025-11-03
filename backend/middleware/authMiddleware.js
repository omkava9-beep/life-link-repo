const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  
  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // Continue to the protected route
  } catch (err) {
    res.status(400).json({ error: 'Invalid Token.' });
  }
};

module.exports = authMiddleware;