import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from '../controller/userController.js';
const router = express.Router();

router.post('/', registerUser)
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', getUserProfile);           
router.put('/profile', updateUserProfile);

export default router;