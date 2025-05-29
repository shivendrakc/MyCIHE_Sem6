import express from 'express';
import User from '../models/userModel.js';
import InstructorProfile from '../models/InstructorModel.js';
import { protect, instructor } from '../Middleware/authMiddleware.js';
import multer from 'multer';
import path from 'path';
import {
  getInstructors,
  getInstructorById,
  getInstructorProfile,
  updateInstructorProfile
} from '../controller/instructorController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// @desc    Get all instructors with their profiles
// @route   GET /api/instructors
// @access  Private
router.get('/', protect, getInstructors);


// @desc    Get instructor profile
// @route   GET /api/instructors/profile
// @access  Private (Instructor only)
router.get('/profile', protect, instructor, getInstructorProfile);

// @desc    Update instructor profile
// @route   PUT /api/instructors/profile
// @access  Private (Instructor only)
router.put('/profile', protect, instructor, upload.single('profileImage'), updateInstructorProfile);

// @desc    Get instructor by ID
// @route   GET /api/instructors/:id
// @access  Private
router.get('/:id', protect, getInstructorById);



export default router; 