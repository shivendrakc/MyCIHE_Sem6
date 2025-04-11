import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controller/userController.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getUserProfile)


export default router;