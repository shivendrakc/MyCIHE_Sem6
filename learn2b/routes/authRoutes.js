import express from 'express';
import passport from 'passport';
import { protect } from '../Middleware/authMiddleware.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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
            // Detailed debug logging
            console.log('=== Google Callback Debug ===');
            console.log('Request user object:', req.user);
            console.log('Request headers:', req.headers);
            console.log('Request query:', req.query);
            console.log('Request params:', req.params);

            // Check if user data exists
            if (!req.user) {
                console.error('No user data in request');
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_user_data`);
            }

            // Extract user data
            const { _id, name, email, role, avatar, token } = req.user;
            
            // Log extracted data
            console.log('Extracted user data:', {
                hasId: !!_id,
                hasName: !!name,
                hasEmail: !!email,
                hasRole: !!role,
                hasAvatar: !!avatar,
                hasToken: !!token
            });
            
            // Validate required fields
            if (!_id || !name || !email || !role || !token) {
                console.error('Missing required user fields:', { 
                    _id: !!_id, 
                    name: !!name, 
                    email: !!email, 
                    role: !!role, 
                    hasToken: !!token 
                });
                return res.redirect(`${process.env.FRONTEND_URL}/login?error=invalid_user_data`);
            }

            // Store user info in the response
            const userInfo = {
                id: _id,
                name,
                email,
                role,
                avatar: avatar || null
            };
            
            // Debug logs
            console.log('User info being sent:', userInfo);
            console.log('Token being sent:', !!token);
            
            // Redirect to frontend with token and user info
            const userInfoString = encodeURIComponent(JSON.stringify(userInfo));
            const redirectUrl = `${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${userInfoString}`;
            console.log('Redirecting to:', redirectUrl);
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