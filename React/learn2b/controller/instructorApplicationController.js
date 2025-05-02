import InstructorApplication from '../models/instructorApplication.js';
import User from '../models/userModel.js';

// Submit new instructor application
export const submitApplication = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Parse JSON data from form fields
    let personalDetails, identityVerification, vehicleInfo, experience;
    try {
      personalDetails = JSON.parse(req.body.personalDetails);
      identityVerification = JSON.parse(req.body.identityVerification);
      vehicleInfo = JSON.parse(req.body.vehicleInfo);
      experience = JSON.parse(req.body.experience);
    } catch (error) {
      console.error('Error parsing form data:', error);
      return res.status(400).json({ error: 'Invalid form data format' });
    }

    // Validate required non-file fields
    if (!personalDetails.fullName?.trim()) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (!personalDetails.email?.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!identityVerification.idType?.trim()) {
      return res.status(400).json({ error: 'ID type is required' });
    }
    if (!identityVerification.idNumber?.trim()) {
      return res.status(400).json({ error: 'ID number is required' });
    }
    if (!vehicleInfo.make?.trim()) {
      return res.status(400).json({ error: 'Vehicle make is required' });
    }
    if (!vehicleInfo.model?.trim()) {
      return res.status(400).json({ error: 'Vehicle model is required' });
    }
    if (!experience.yearsOfExperience) {
      return res.status(400).json({ error: 'Years of experience is required' });
    }
    if (!experience.teachingExperience?.trim()) {
      return res.status(400).json({ error: 'Teaching experience is required' });
    }
    if (!experience.digitalSign?.trim()) {
      return res.status(400).json({ error: 'Digital signature is required' });
    }
    if (experience.digitalSign.trim() !== personalDetails.fullName.trim()) {
      return res.status(400).json({ error: 'Digital signature must match full name' });
    }

    // Handle file uploads - all files are optional
    const filePaths = {
      idFront: null,
      idBack: null,
      insuranceDocument: null,
      certifications: []
    };

    // Process ID Front if uploaded
    if (req.files?.idFront?.[0]) {
      const idFrontFile = req.files.idFront[0];
      filePaths.idFront = idFrontFile.path;
    }

    // Process ID Back if uploaded
    if (req.files?.idBack?.[0]) {
      const idBackFile = req.files.idBack[0];
      filePaths.idBack = idBackFile.path;
    }

    // Process Insurance Document if uploaded
    if (req.files?.insuranceDocument?.[0]) {
      const insuranceFile = req.files.insuranceDocument[0];
      filePaths.insuranceDocument = insuranceFile.path;
    }

    // Process Certifications if uploaded
    if (req.files?.certifications) {
      filePaths.certifications = req.files.certifications.map(file => file.path);
    }

    // Create application data
    const applicationData = {
      userId,
      personalDetails,
      identityVerification: {
        ...identityVerification,
        idFront: filePaths.idFront,
        idBack: filePaths.idBack
      },
      vehicleInfo: {
        ...vehicleInfo,
        insuranceDocument: filePaths.insuranceDocument
      },
      experience: {
        ...experience,
        certifications: filePaths.certifications
      },
      status: 'pending',
      submittedAt: new Date()
    };

    // Save to database
    const application = new InstructorApplication(applicationData);
    await application.save();

    res.status(200).json({
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Error submitting application' });
  }
};

// Get all applications (for admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await InstructorApplication.find()
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 });
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Get application status for a user
export const getApplicationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const application = await InstructorApplication.findOne({ userId })
      .sort({ submittedAt: -1 });
    
    if (!application) {
      return res.status(200).json({ status: 'not_submitted' });
    }
    
    res.status(200).json({ status: application.status });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching application status',
      error: error.message
    });
  }
};

// Update application status (for admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, rejectionReason } = req.body;

    const application = await InstructorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    if (status === 'rejected' && rejectionReason) {
      application.rejectionReason = rejectionReason;
    }
    
    await application.save();

    // If approved, update user role
    if (status === 'approved') {
      await User.findByIdAndUpdate(application.userId, { role: 'instructor' });
    }

    res.status(200).json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating application status',
      error: error.message
    });
  }
}; 