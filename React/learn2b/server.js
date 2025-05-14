import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import passport from 'passport';
import userRoutes from './routes/userRoutes.js';
import instructorApplicationRoutes from './routes/instructorApplicationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import instructorRoutes from './routes/instructorRoutes.js';
import { notFound, errorHandler } from './Middleware/errorMiddleware.js';
import { connectDB } from './config/db.js'; 
import "./config/passport.js"; // loads strategy


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/instructor-application', instructorApplicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/instructors', instructorRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});

//