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

    // Log received files
    console.log('Received files:', req.files);

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
      filePaths.idFront = idFrontFile.path.replace(/\\/g, '/'); // Convert Windows path to URL format
      console.log('ID Front path:', filePaths.idFront);
    }

    // Process ID Back if uploaded
    if (req.files?.idBack?.[0]) {
      const idBackFile = req.files.idBack[0];
      filePaths.idBack = idBackFile.path.replace(/\\/g, '/'); // Convert Windows path to URL format
      console.log('ID Back path:', filePaths.idBack);
    }

    // Process Insurance Document if uploaded
    if (req.files?.insuranceDocument?.[0]) {
      const insuranceFile = req.files.insuranceDocument[0];
      filePaths.insuranceDocument = insuranceFile.path.replace(/\\/g, '/'); // Convert Windows path to URL format
      console.log('Insurance Document path:', filePaths.insuranceDocument);
    }

    // Process Certifications if uploaded
    if (req.files?.certifications) {
      filePaths.certifications = req.files.certifications.map(file => 
        file.path.replace(/\\/g, '/') // Convert Windows path to URL format
      );
      console.log('Certifications paths:', filePaths.certifications);
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

    // Log the final application data
    console.log('Saving application data:', JSON.stringify(applicationData, null, 2));

    // Check for existing application
    let application = await InstructorApplication.findOne({ userId });
    
    if (application) {
      // Store old file paths for cleanup
      const oldFiles = {
        idFront: application.identityVerification.idFront,
        idBack: application.identityVerification.idBack,
        insuranceDocument: application.vehicleInfo.insuranceDocument,
        certifications: application.experience.certifications || []
      };

      // Update application data while preserving submission date
      const updatedData = {
        ...applicationData,
        submittedAt: application.submittedAt, // Preserve original submission date
      };

      // If the application was previously rejected, set status to resubmitted
      if (application.status === 'rejected') {
        updatedData.status = 'resubmitted';
        updatedData.resubmissionCount = (application.resubmissionCount || 0) + 1;
      } else {
        updatedData.status = application.status; // Preserve current status
      }

      // Update the application
      Object.assign(application, updatedData);
      await application.save();

      // TODO: Implement file cleanup for old files
      // This would require a file system utility to delete the old files
      // that are no longer needed
    } else {
      // Create new application
      application = new InstructorApplication(applicationData);
      await application.save();
    }

    res.status(200).json({
      message: application.isNew ? 'Application submitted successfully' : 'Application updated successfully',
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
    console.log('Fetching all applications...');
    
    // First check if the user is authenticated and is an admin
    if (!req.user) {
      console.error('No user found in request');
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.user.role !== 'admin') {
      console.error('User is not an admin:', req.user.role);
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Log the query we're about to execute
    console.log('Executing find query with conditions:', { userId: { $ne: null } });

    const applications = await InstructorApplication.find({ userId: { $ne: null } })
      .populate({
        path: 'userId',
        select: 'name email',
        options: { lean: true }
      })
      .sort({ submittedAt: -1 })
      .lean();

    console.log(`Found ${applications.length} applications`);

    // Transform the data to ensure all fields are properly structured
    const formattedApplications = applications.map(app => {
      try {
        return {
          ...app,
          personalDetails: app.personalDetails || {},
          identityVerification: {
            ...app.identityVerification,
            idFront: app.identityVerification?.idFront || null,
            idBack: app.identityVerification?.idBack || null
          },
          vehicleInfo: {
            ...app.vehicleInfo,
            insuranceDocument: app.vehicleInfo?.insuranceDocument || null
          },
          experience: {
            ...app.experience,
            certifications: app.experience?.certifications || []
          }
        };
      } catch (error) {
        console.error('Error formatting application:', app._id, error);
        return null;
      }
    }).filter(Boolean); // Remove any null entries from formatting errors

    console.log('Successfully formatted applications');
    res.status(200).json(formattedApplications);
  } catch (error) {
    console.error('Detailed error in getAllApplications:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
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
    
    res.status(200).json({ 
      status: application.status,
      rejectionReason: application.rejectionReason || ''
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching application status',
      error: error.message
    });
  }
};

// Get user's application data
export const getUserApplication = async (req, res) => {
  try {
    const { userId } = req.params;
    const application = await InstructorApplication.findOne({ userId })
      .sort({ submittedAt: -1 });
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Return the complete application data
    res.status(200).json({
      ...application.toObject(),
      personalDetails: application.personalDetails,
      identityVerification: {
        ...application.identityVerification,
        idFront: application.identityVerification.idFront || null,
        idBack: application.identityVerification.idBack || null
      },
      vehicleInfo: {
        ...application.vehicleInfo,
        insuranceDocument: application.vehicleInfo.insuranceDocument || null
      },
      experience: {
        ...application.experience,
        certifications: application.experience.certifications || []
      }
    });
  } catch (error) {
    console.error('Error fetching application data:', error);
    res.status(500).json({
      message: 'Error fetching application data',
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

    // If the application was previously rejected and is being resubmitted
    if (application.status === 'rejected' && status === 'pending') {
      application.status = 'resubmitted';
      application.resubmissionCount = (application.resubmissionCount || 0) + 1;
    } else {
      application.status = status;
    }

    if (status === 'rejected' && rejectionReason) {
      application.rejectionReason = rejectionReason;
    }
    
    application.reviewedAt = new Date();
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