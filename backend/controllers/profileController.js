import express from 'express';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';

/**
 * @description  Get all profiles
 * @route  GET api/v1/profiles/all
 * @returns {Object} data
 * @access public
 */
const getProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.find();
  res.status(200).json({
    success: true,
    count: profiles.length,
    data: profiles,
  });
});

/**
 * @description  Get profile by userId
 * @route  GET api/v1/profiles/user/:userId
 * @returns {Object} data
 * @access public
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await Profile.findOne({
    user: req.params.userId,
  }).populate('user', ['name', 'email']);

  if (!user) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @description  Create profile
 * @route  POST api/v1/profiles
 * @returns {Object} data
 * @access private
 */
const createProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, handle } = req.body;

  const profileFields = {};
  profileFields.firstName = firstName;
  profileFields.lastName = lastName;
  profileFields.handle = handle;

  // Get user token
  profileFields.user = req.user.id;

  let profile = await Profile.findOne({ user: req.user.id });

  // Checks if profile exist
  profile = await Profile.findOne({ handle: profileFields.handle });

  if (profile) {
    res.status(409);
    throw new Error('Profile already exist');
  }
  // Save profile
  await new Profile(profileFields).save();
  res.status(201).json({ success: true, data: profileFields });
});

/**
 * @description  Current profile
 * @route  GET api/v1/profiles
 * @returns {Object} data
 * @access private
 */
const getCurrentProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate('user', ['name', 'email']);

  if (!profile) {
    res.status(400);
    throw new Error('You do not have a profile yet!');
  }

  res.status(200).json({ success: true, profile });
});

export { getProfiles, createProfile, getUserById, getCurrentProfile };
