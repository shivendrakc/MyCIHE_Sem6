import express from 'express';
import { registerUser, loginUser, getUserProfile, updateProfile } from '../controller/userController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateProfile)

export default router;