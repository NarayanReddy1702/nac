const jwt = require('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(200).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // if (role && decoded.role !== role) {
    //   return res.status(200).json({ message: 'Access denied' });
    // }
    next();
  } catch (error) {
    res.status(200).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
