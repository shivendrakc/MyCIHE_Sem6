import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.JWT_SECRET) {
    console.error('Missing required environment variables for Google OAuth');
    process.exit(1);
}

// Define the callback URL
const callbackURL = process.env.NODE_ENV === 'production'
    ? `${process.env.BACKEND_URL}/api/auth/google/callback`
    : 'http://localhost:5000/api/auth/google/callback';

console.log('Google OAuth Configuration:');
console.log('Callback URL:', callbackURL);
console.log('Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured');
console.log('Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Configured' : 'Not configured');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    proxy: true
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('=== Google Strategy Debug ===');
        console.log('Profile received:', {
            id: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            hasPhoto: !!profile.photos?.[0]?.value
        });

        if (!profile.emails?.[0]?.value) {
            console.error('No email provided by Google');
            return done(new Error('No email provided by Google'), null);
        }

        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });
        console.log('Existing user found by googleId:', !!user);

        if (!user) {
            // Check if user exists with same email but different auth method
            user = await User.findOne({ email: profile.emails[0].value });
            console.log('Existing user found by email:', !!user);
            
            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.avatar = profile.photos?.[0]?.value;
                await user.save();
                console.log('Linked Google account to existing user');
            } else {
                // Create new user
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    avatar: profile.photos?.[0]?.value,
                    role: 'student' // Default role
                });
                console.log('Created new user');
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        console.log('Generated JWT token');

        // Convert user to plain object and add token
        const userObj = user.toObject();
        userObj.token = token;

        // Debug log
        console.log('Final user object:', {
            id: userObj._id,
            name: userObj.name,
            email: userObj.email,
            role: userObj.role,
            hasToken: !!userObj.token
        });

        return done(null, userObj);
    } catch (err) {
        console.error('Google strategy error:', err);
        return done(err, null);
    }
}));

// These are needed for session-based auth, but we're using JWT
// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });
