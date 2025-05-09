import express from 'express';
import passport from 'passport';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';

const router = express.Router();

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false 
    })
);

router.get('/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/login',
        session: false 
    }),
    (req, res) => {
        try {
            // Successful authentication
            const { user, token } = req.user;
            const { _id, name, email, role, avatar} = req.user;
            
            // Store user info in the response
            const userInfo = {
                id: _id,
                name,
                email,
                role,
                avatar
              };
            
            // Redirect to frontend with token and user info
            const userInfoString = encodeURIComponent(JSON.stringify(userInfo));
            const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${userInfoString}`;
            console.log('Redirecting to:', redirectUrl); // Debug log
            res.redirect(redirectUrl);
        } catch (error) {
            console.error('Google callback error:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
        }
    }
);

// Get current user
router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router; 