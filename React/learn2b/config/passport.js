import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Define the callback URL
const callbackURL = process.env.NODE_ENV === 'production'
    ? `${process.env.BACKEND_URL}/api/auth/google/callback`
    : 'http://localhost:5000/api/auth/google/callback';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // Check if user exists with same email but different auth method
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                user.avatar = profile.photos[0].value;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    avatar: profile.photos[0].value,
                    role: 'student' // Default role
                });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Return user with token
        return done(null, { ...user.toObject(), token });
    } catch (err) {
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
