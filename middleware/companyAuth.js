const jwt = require('jsonwebtoken');
const Company = require('../models/Company');

exports.protectCompany = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.company = await Company.findById(decoded.id).select('-password');

      if (!req.company) {
        return res.status(401).json({ message: 'Not authorized, company not found' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
