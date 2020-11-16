import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  // Get token from the header
  let token;

  token = req.header('Authorization');
  // Check if token does not exist
  if (!token) {
    return res.status(401).json({
      msg: 'Authorization denied!',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is invalid!',
    });
  }
};

export { protect };
