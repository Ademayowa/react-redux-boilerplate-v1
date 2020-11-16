import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  authUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', protect, authUser);

export default router;
