import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @description  Register user
 * @route  POST api/v1/auth/register
 * @returns {Object} token
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exist');
  }
  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // getSignedJwtToken from userSchema.methods in user model
  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, token });
});

/**
 * @description  Login user
 * @route  POST api/v1/auth/login
 * @returns {Object} token
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & passwword
  if (!email || !password) {
    res.status(400);
    throw new Error('Enter email or password');
  }
  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }
  // Checks if password match
  const match = await user.matchPassword(password);

  if (!match) {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  // Create token
  const token = user.getSignedJwtToken();
  res.status(200).json({ success: true, token });
});

/**
 * @description  Loggedin user
 * @route  GET api/v1/auth
 * @returns {Object} data
 * @access private
 */
const authUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json({ success: true, user });
});

export { registerUser, loginUser, authUser };
