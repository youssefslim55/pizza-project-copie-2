const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1]; // Extract token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = { id: decoded.id }; // Attach user info to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = protect;
