const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate token
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error(`[Auth Middleware] Token validation error: ${error.message}`);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = authMiddleware;