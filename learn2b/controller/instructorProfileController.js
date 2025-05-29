const InstructorProfile = require('../models/instructorProfile');
const asyncHandler = require('express-async-handler');

// @desc    Get instructor profile
// @route   GET /api/instructors/profile
// @access  Private (Instructor only)
const getInstructorProfile = asyncHandler(async (req, res) => {
  const profile = await InstructorProfile.findOne({ userId: req.user._id });
  
  if (profile) {
    res.json(profile);
  } else {
    // If no profile exists, return empty profile structure
    res.json({
      bio: '',
      suburb: '',
      method: '',
      experience: '',
      hourlyRate: '',
      car: {
        make: '',
        model: '',
        year: '',
        transmission: ''
      }
    });
  }
});

// @desc    Update instructor profile
// @route   PUT /api/instructors/profile
// @access  Private (Instructor only)
const updateInstructorProfile = asyncHandler(async (req, res) => {
  const { 
    bio,
      suburb,
      method,
      experience,
      hourlyRate,
      nationality,
      'car.make': carMake,
      'car.model': carModel,
      'car.year': carYear,
      'car.transmission': carTransmission
   } = req.body;
   const car = {
    make: carMake,
    model: carModel,
    year: carYear,
    transmission: carTransmission
  };
  
  // Find profile or create new one
  let profile = await InstructorProfile.findOne({ userId: req.user._id });
  
  if (profile) {
    // Update existing profile
    profile.bio = bio || profile.bio;
    profile.suburb = suburb || profile.suburb;
    profile.method = method || profile.method;
    profile.experience = experience || profile.experience;
    profile.hourlyRate = hourlyRate || profile.hourlyRate;
    profile.car = car || profile.car;
    
    // Handle profile image if uploaded
    if (req.file) {
      profile.profileImage = req.file.path;
    }
    
    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } else {
    // Create new profile
    profile = await InstructorProfile.create({
      userId: req.user._id,
      bio,
      suburb,
      method,
      experience,
      hourlyRate,
      car,
      profileImage: req.file ? req.file.path : undefined
    });
    
    res.status(201).json(profile);
  }
});

module.exports = {
  getInstructorProfile,
  updateInstructorProfile
}; 