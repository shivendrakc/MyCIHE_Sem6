import express from 'express';
import User from '../models/userModel.js';
import InstructorProfile from '../models/InstructorModel.js';

const router = express.Router();

// @desc    Get all instructors with their profiles
// @route   GET /api/instructors
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Find all users who are instructors and are approved
    const instructors = await User.find({ 
      role: 'instructor',
      isApproved: true 
    });

    // Get instructor profiles with user information
    const instructorsWithProfiles = await Promise.all(
      instructors.map(async (instructor) => {
        const profile = await InstructorProfile.findOne({ userId: instructor._id });
        return {
          user: {
            _id: instructor._id,
            name: instructor.name,
            email: instructor.email,
            avatar: instructor.avatar
          },
          profile: profile
        };
      })
    );

    res.json(instructorsWithProfiles);
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 