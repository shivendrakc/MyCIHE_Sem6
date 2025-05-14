import User from '../models/userModel.js';
import InstructorProfile from '../models/InstructorModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all instructors with their profiles
// @route   GET /api/instructors
// @access  Private
const getInstructors = asyncHandler(async (req, res) => {
   // First get all instructor profiles
  const instructorProfiles = await InstructorProfile.find({});
  
  // Get all users who are either approved instructors or have instructor profiles
  const instructorIds = instructorProfiles.map(profile => profile.userId);
  const instructors = await User.find({
    $or: [
      { role: 'instructor', isApproved: true },
      { _id: { $in: instructorIds } }
    ]
  });
  
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
        profile: profile ? {
          ...profile.toObject(),
          profileImage: profile.profileImage ? `/uploads/${profile.profileImage.split('/').pop()}` : null
        } : {}
      };
    })
  );
  
  res.json(instructorsWithProfiles);
});

// @desc    Get instructor by ID
// @route   GET /api/instructors/:id
// @access  Private
const getInstructorById = asyncHandler(async (req, res) => {
  const instructor = await User.findOne({ 
    _id: req.params.id,
    role: 'instructor',
    isApproved: true
  });
  
  if (!instructor) {
    res.status(404);
    throw new Error('Instructor not found');
  }
  
  const profile = await InstructorProfile.findOne({ userId: instructor._id });
  
  res.json({
    user: {
      _id: instructor._id,
      name: instructor.name,
      email: instructor.email,
      avatar: instructor.avatar
    },
    profile: profile || {}
  });
});

// @desc    Get instructor profile
// @route   GET /api/instructors/profile
// @access  Private (Instructor only)
const getInstructorProfile = asyncHandler(async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user._id); // Debug log
    
    const profile = await InstructorProfile.findOne({ userId: req.user._id });
    console.log('Found profile:', profile); // Debug log
    
    if (profile) {
      res.json(profile);
    } else {
      // If no profile exists, return empty profile structure
      const emptyProfile = {
        bio: '',
        suburb: '',
        method: '',
        experience: '',
        hourlyRate: '',
        nationality: '',
        car: {
          make: '',
          model: '',
          year: '',
          transmission: ''
        },
        profileImage: ''
      };
      console.log('No profile found, returning empty structure'); // Debug log
      res.json(emptyProfile);
    }
  } catch (error) {
    console.error('Error in getInstructorProfile:', error);
    res.status(500).json({ 
      message: 'Error fetching instructor profile',
      error: error.message 
    });
  }
});

// @desc    Update instructor profile
// @route   PUT /api/instructors/profile
// @access  Private (Instructor only)
const updateInstructorProfile = asyncHandler(async (req, res) => {
  console.log('Received request body:', req.body); // Debug log

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

  // Debug logs
  console.log('Extracted fields:', {
    suburb,
    carMake,
    carModel,
    carYear,
    carTransmission
  });

  // Validate required fields
  const requiredFields = {
    nationality: 'Nationality',
    suburb: 'Suburb',
    method: 'Teaching method',
    experience: 'Years of experience',
    hourlyRate: 'Hourly rate',
    'car.make': 'Car make',
    'car.model': 'Car model',
    'car.year': 'Car year'
  };

  for (const [field, label] of Object.entries(requiredFields)) {
    if (field.includes('car.')) {
      const carField = field.split('.')[1];
      if (!req.body[field]) {
        res.status(400);
        throw new Error(`${label} is required`);
      }
    } else if (!req.body[field]) {
      res.status(400);
      throw new Error(`${label} is required`);
    }
  }

  // Find profile or create new one
  let profile = await InstructorProfile.findOne({ userId: req.user._id });

  if (profile) {
    // Update all fields
    profile.bio = bio || '';
    profile.suburb = suburb;
    profile.method = method;
    profile.experience = experience;
    profile.hourlyRate = hourlyRate;
    profile.nationality = nationality;
    
    // Update car fields - ensure all car fields are set
    profile.car = {
      make: carMake,
      model: carModel,
      year: carYear,
      transmission: carTransmission || ''
    };
    
    // Handle profile image if uploaded
    if (req.file) {
      profile.profileImage = `/uploads/${req.file.filename}`;
    }

    console.log('Updating profile with data:', {
      suburb: profile.suburb,
      car: profile.car
    });
    
    const updatedProfile = await profile.save();
    console.log('Updated profile:', updatedProfile); // Debug log
    res.json(updatedProfile);
  } else {
    // Create new profile with all required fields
    const newProfile = {
      userId: req.user._id,
      bio: bio || '',
      suburb: suburb,
      method: method,
      experience: experience,
      hourlyRate: hourlyRate,
      nationality: nationality,
      car: {
        make: carMake,
        model: carModel,
        year: carYear,
        transmission: carTransmission || ''
      }
    };

    if (req.file) {
      newProfile.profileImage = `/uploads/${req.file.filename}`;
    }

    console.log('Creating new profile with data:', newProfile); // Debug log
    profile = await InstructorProfile.create(newProfile);
    console.log('Created profile:', profile); // Debug log
    res.status(201).json(profile);
  }
});

export {
  getInstructors,
  getInstructorById,
  getInstructorProfile,
  updateInstructorProfile
}; 