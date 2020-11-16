import express from 'express';
const router = express.Router();
import {
  getProfiles,
  createProfile,
  getUserById,
  getCurrentProfile,
} from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/all', getProfiles);
router.post('/', protect, createProfile);
router.get('/user/:userId', getUserById);
router.get('/', protect, getCurrentProfile);

export default router;
