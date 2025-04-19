import express from 'express';
import { registerUser, loginUser, getUserProfile, updateProfile } from '../controller/userController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', authMiddleware, getUserProfile)
router.put('/profile', authMiddleware, updateProfile)

export default router;