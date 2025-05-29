import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Pending as PendingIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import API from '../../utils/axios';
import { toast } from 'react-hot-toast';

const steps = [
  'Personal Details',
  'Identity Verification',
  'Vehicle Info',
  'Experience & Background',
  'Consent',
  'Review & Submit'
];

// Add helper function for deep copying with File preservation
const deepCopyWithFiles = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof File) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepCopyWithFiles(item));
  }

  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopyWithFiles(obj[key]);
    }
  }
  return copy;
};

const ApplicationForm = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo?._id || userInfo?.id;
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: ''
    },
    identityVerification: {
      idType: '',
      idNumber: '',
      idFront: null,
      idBack: null
    },
    vehicleInfo: {
      make: '',
      model: '',
      year: '',
      licensePlate: '',
      insuranceDocument: null
    },
    experience: {
      yearsOfExperience: '',
      previousEmployer: '',
      certifications: [],
      teachingExperience: '',
      noConviction: false,
      agreeInfo: false,
      agreePolicy: false,
      digitalSign: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const navigate = useNavigate();

  // Check application status and fetch existing data on mount
  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await API.get(`/instructor-application/status/${userId}`, {
          withCredentials: true
        });
        
        if (response.data.status === 'not_submitted') {
          setApplicationStatus(null);
          // Clear any existing localStorage data for this user
          localStorage.removeItem('instructorApplicationStatus');
          localStorage.removeItem('instructorFormData');
        } else {
          setApplicationStatus(response.data.status);
          if (response.data.status === 'rejected') {
            setRejectionReason(response.data.rejectionReason || '');
          }
          
          // If there's an existing application, fetch its data
          if (response.data.status === 'pending' || response.data.status === 'rejected') {
            try {
              const applicationResponse = await API.get(`/instructor-application/${userId}`, {
                withCredentials: true
              });
              
              if (applicationResponse.data) {
                // Pre-populate form with existing data
                setFormData({
                  personalDetails: {
                    fullName: applicationResponse.data.personalDetails.fullName || '',
                    email: applicationResponse.data.personalDetails.email || '',
                    phone: applicationResponse.data.personalDetails.phone || '',
                    address: applicationResponse.data.personalDetails.address || '',
                    dateOfBirth: applicationResponse.data.personalDetails.dateOfBirth || ''
                  },
                  identityVerification: {
                    idType: applicationResponse.data.identityVerification.idType || '',
                    idNumber: applicationResponse.data.identityVerification.idNumber || '',
                    idFront: applicationResponse.data.identityVerification.idFront || null,
                    idBack: applicationResponse.data.identityVerification.idBack || null
                  },
                  vehicleInfo: {
                    make: applicationResponse.data.vehicleInfo.make || '',
                    model: applicationResponse.data.vehicleInfo.model || '',
                    year: applicationResponse.data.vehicleInfo.year || '',
                    licensePlate: applicationResponse.data.vehicleInfo.licensePlate || '',
                    insuranceDocument: applicationResponse.data.vehicleInfo.insuranceDocument || null
                  },
                  experience: {
                    yearsOfExperience: applicationResponse.data.experience.yearsOfExperience || '',
                    previousEmployer: applicationResponse.data.experience.previousEmployer || '',
                    certifications: applicationResponse.data.experience.certifications || [],
                    teachingExperience: applicationResponse.data.experience.teachingExperience || '',
                    noConviction: applicationResponse.data.experience.noConviction || false,
                    agreeInfo: applicationResponse.data.experience.agreeInfo || false,
                    agreePolicy: applicationResponse.data.experience.agreePolicy || false,
                    digitalSign: applicationResponse.data.experience.digitalSign || ''
                  }
                });
              }
            } catch (error) {
              console.error('Error fetching existing application data:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error checking application status:', error);
        // On error, clear localStorage to be safe
        localStorage.removeItem('instructorApplicationStatus');
        localStorage.removeItem('instructorFormData');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      checkApplicationStatus();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    
    console.log('Input changed:', { name, type, files: files ? Array.from(files) : null });
    
    setFormData(prev => {
      // Use our custom deep copy function
      const newData = deepCopyWithFiles(prev);
      
      // Handle file inputs
      if (type === 'file') {
        if (name === 'certifications') {
          // Handle multiple files for certifications
          newData.experience.certifications = Array.from(files);
          console.log('Certifications updated:', newData.experience.certifications);
        } else {
          // Handle single file uploads
          const file = files[0];
          if (!file) {
            console.warn(`No file selected for ${name}`);
            return newData;
          }

          // Validate file type and size
          const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
          const maxSize = 5 * 1024 * 1024; // 5MB

          if (!validTypes.includes(file.type)) {
            toast.error(`Invalid file type for ${name}. Please upload JPEG, PNG, or PDF files.`);
            return newData;
          }

          if (file.size > maxSize) {
            toast.error(`File size too large for ${name}. Maximum size is 5MB.`);
            return newData;
          }

          // Store the file object directly in state
          switch (name) {
            case 'idFront':
              newData.identityVerification.idFront = file;
              console.log('ID Front updated:', {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
              });
              break;
            case 'idBack':
              newData.identityVerification.idBack = file;
              console.log('ID Back updated:', {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
              });
              break;
            case 'insuranceDocument':
              newData.vehicleInfo.insuranceDocument = file;
              console.log('Insurance document updated:', {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
              });
              break;
            default:
              console.warn(`Unknown file input name: ${name}`);
          }
        }
        return newData;
      }
      
      // Handle checkbox inputs
      if (type === 'checkbox') {
        const nameParts = name.split('.');
        let current = newData;
        
        // Navigate to the correct nested property
        for (let i = 0; i < nameParts.length - 1; i++) {
          if (!current[nameParts[i]]) {
            current[nameParts[i]] = {};
          }
          current = current[nameParts[i]];
        }
        
        // Set the checkbox value
        current[nameParts[nameParts.length - 1]] = checked;
        console.log(`Checkbox ${name} updated to:`, checked);
        return newData;
      }
      
      // Handle text inputs (including nested ones)
      const nameParts = name.split('.');
      let current = newData;
      
      // Navigate to the correct nested property
      for (let i = 0; i < nameParts.length - 1; i++) {
        if (!current[nameParts[i]]) {
          current[nameParts[i]] = {};
        }
        current = current[nameParts[i]];
      }
      
      // Set the value
      current[nameParts[nameParts.length - 1]] = value;
      console.log(`Field ${name} updated to:`, value);
      
      return newData;
    });
  };

  const validateStep = (step) => {
    if (!showValidation) return true;
    
    const newErrors = {};
    let hasErrors = false;
    
    if (step === 0) {
      // Personal Details validation
      if (!formData.personalDetails.fullName?.trim()) {
        newErrors.personalDetails = { ...newErrors.personalDetails, fullName: 'Full Name is required' };
        hasErrors = true;
      }
      
      if (!formData.personalDetails.email?.trim()) {
        newErrors.personalDetails = { ...newErrors.personalDetails, email: 'Email is required' };
        hasErrors = true;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalDetails.email)) {
        newErrors.personalDetails = { ...newErrors.personalDetails, email: 'Please enter a valid email address' };
        hasErrors = true;
      }
      
      if (!formData.personalDetails.phone?.trim()) {
        newErrors.personalDetails = { ...newErrors.personalDetails, phone: 'Phone is required' };
        hasErrors = true;
      }
      
      if (!formData.personalDetails.dateOfBirth) {
        newErrors.personalDetails = { ...newErrors.personalDetails, dateOfBirth: 'Date of Birth is required' };
        hasErrors = true;
      }
    }
    
    if (step === 1) {
      // Identity Verification validation
      if (!formData.identityVerification.idType) {
        newErrors.identityVerification = { ...newErrors.identityVerification, idType: 'ID Type is required' };
        hasErrors = true;
      }
      
      if (!formData.identityVerification.idNumber?.trim()) {
        newErrors.identityVerification = { ...newErrors.identityVerification, idNumber: 'ID Number is required' };
        hasErrors = true;
      }
    }
    
    if (step === 2) {
      // Vehicle Info validation
      if (!formData.vehicleInfo.make?.trim()) {
        newErrors.vehicleInfo = { ...newErrors.vehicleInfo, make: 'Car Make is required' };
        hasErrors = true;
      }
      
      if (!formData.vehicleInfo.model?.trim()) {
        newErrors.vehicleInfo = { ...newErrors.vehicleInfo, model: 'Car Model is required' };
        hasErrors = true;
      }
      
      if (!formData.vehicleInfo.year) {
        newErrors.vehicleInfo = { ...newErrors.vehicleInfo, year: 'Year is required' };
        hasErrors = true;
      }
      
      if (!formData.vehicleInfo.licensePlate?.trim()) {
        newErrors.vehicleInfo = { ...newErrors.vehicleInfo, licensePlate: 'License Plate is required' };
        hasErrors = true;
      }
    }
    
    if (step === 3) {
      // Experience validation
      if (!formData.experience.yearsOfExperience) {
        newErrors.experience = { ...newErrors.experience, yearsOfExperience: 'Years of Experience is required' };
        hasErrors = true;
      }
      
      if (!formData.experience.teachingExperience?.trim()) {
        newErrors.experience = { ...newErrors.experience, teachingExperience: 'Teaching Experience is required' };
        hasErrors = true;
      }
    }
    
    if (step === 4) {
      // Consent validation
      if (!formData.experience.noConviction) {
        newErrors.experience = { ...newErrors.experience, noConviction: 'You must declare your conviction status' };
        hasErrors = true;
      }
      
      if (!formData.experience.agreeInfo) {
        newErrors.experience = { ...newErrors.experience, agreeInfo: 'You must certify the information' };
        hasErrors = true;
      }
      
      if (!formData.experience.agreePolicy) {
        newErrors.experience = { ...newErrors.experience, agreePolicy: 'You must agree to the Terms & Privacy Policy' };
        hasErrors = true;
      }
      
      if (!formData.experience.digitalSign?.trim()) {
        newErrors.experience = { ...newErrors.experience, digitalSign: 'Digital Signature is required' };
        hasErrors = true;
      } else if (formData.experience.digitalSign.trim() !== formData.personalDetails.fullName.trim()) {
        newErrors.experience = { ...newErrors.experience, digitalSign: 'Digital Signature must match your full name' };
        hasErrors = true;
      }
    }

    setErrors(newErrors);
    
    if (hasErrors) {
      const errorMessage = step === 4 
        ? 'Please complete all required fields and ensure your digital signature matches your full name'
        : 'Please complete all required fields before proceeding';
      toast.error(errorMessage);
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === steps.length - 2) {
      // On second to last step (Consent), prepare review data
      setReviewData({
        personalDetails: formData.personalDetails,
        identityVerification: {
          ...formData.identityVerification,
          idFront: formData.identityVerification.idFront instanceof File 
            ? formData.identityVerification.idFront.name 
            : 'Not uploaded',
          idBack: formData.identityVerification.idBack instanceof File 
            ? formData.identityVerification.idBack.name 
            : 'Not uploaded'
        },
        vehicleInfo: {
          ...formData.vehicleInfo,
          insuranceDocument: formData.vehicleInfo.insuranceDocument instanceof File 
            ? formData.vehicleInfo.insuranceDocument.name 
            : 'Not uploaded'
        },
        experience: {
          ...formData.experience,
          certifications: formData.experience.certifications?.map(cert => 
            cert instanceof File ? cert.name : 'Invalid file'
          ) || []
        }
      });
    }
    
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only process submission on the final step
    if (currentStep !== steps.length - 1) {
      return;
    }

    setShowValidation(true);
    
    // Validate all steps before submission
    for (let i = 0; i < steps.length - 1; i++) {
      if (!validateStep(i)) {
        toast.error('Please complete all required fields before submitting');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add user ID
      formDataToSend.append('userId', userId);
      
      // Add JSON data with proper stringification
      const jsonData = {
        personalDetails: formData.personalDetails,
        identityVerification: {
          idType: formData.identityVerification.idType,
          idNumber: formData.identityVerification.idNumber
        },
        vehicleInfo: {
          make: formData.vehicleInfo.make,
          model: formData.vehicleInfo.model,
          year: formData.vehicleInfo.year,
          licensePlate: formData.vehicleInfo.licensePlate
        },
        experience: {
          yearsOfExperience: formData.experience.yearsOfExperience,
          previousEmployer: formData.experience.previousEmployer,
          teachingExperience: formData.experience.teachingExperience,
          noConviction: formData.experience.noConviction,
          agreeInfo: formData.experience.agreeInfo,
          agreePolicy: formData.experience.agreePolicy,
          digitalSign: formData.experience.digitalSign
        }
      };

      // Add JSON data to FormData
      formDataToSend.append('personalDetails', JSON.stringify(jsonData.personalDetails));
      formDataToSend.append('identityVerification', JSON.stringify(jsonData.identityVerification));
      formDataToSend.append('vehicleInfo', JSON.stringify(jsonData.vehicleInfo));
      formDataToSend.append('experience', JSON.stringify(jsonData.experience));

      // Add files only if they exist
      if (formData.identityVerification.idFront instanceof File) {
        formDataToSend.append('idFront', formData.identityVerification.idFront);
      }
      if (formData.identityVerification.idBack instanceof File) {
        formDataToSend.append('idBack', formData.identityVerification.idBack);
      }
      if (formData.vehicleInfo.insuranceDocument instanceof File) {
        formDataToSend.append('insuranceDocument', formData.vehicleInfo.insuranceDocument);
      }
      if (formData.experience.certifications?.length > 0) {
        formData.experience.certifications.forEach((cert) => {
          if (cert instanceof File) {
            formDataToSend.append('certifications', cert);
          }
        });
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }

      const response = await API.post('/instructor-application/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setApplicationStatus('pending');  
      localStorage.removeItem('instructorFormData');
      toast.success('Application submitted successfully!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          'Error submitting application. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setApplicationStatus(null);
    setCurrentStep(0);
    // Initialize form data with proper structure

    
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#28c1c6] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application status...</p>
        </div>
      </div>
    );
  }

  // If application is submitted, only show status section
  if (applicationStatus) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="text-center">
                {applicationStatus === 'pending' ? (
                  <>
                    <div className="mb-6">
                      <PendingIcon className="mx-auto h-16 w-16 text-[#28c1c6]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#28c1c6] mb-4">Application Submitted Successfully</h3>
                    <div className="bg-[#ebcc34] bg-opacity-10 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-center space-x-3">
                        <PendingIcon className="h-6 w-6 text-white" />
                        <p className="text-lg font-medium text-white">Status: Pending Review</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Thank you for submitting your application. Our team will review your information and get back to you soon. 
                      You will be notified once a decision has been made.
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={handleEdit}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#28c1c6] hover:bg-[#1b9aa0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6]"
                      >
                        Edit Application
                      </button>
                      
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6">
                      <CancelIcon className="mx-auto h-16 w-16 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-semibold text-red-600 mb-4">Application Rejected</h3>
                    <div className="bg-red-50 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-center space-x-3 mb-4">
                        <WarningIcon className="h-6 w-6 text-red-500" />
                        <p className="text-lg font-medium text-red-600">Reason for Rejection</p>
                      </div>
                      <p className="text-red-700 text-center">
                        {rejectionReason}
                      </p>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Please review the reason for rejection and feel free to reapply after addressing the concerns.
                    </p>
                    <div className="space-y-4">
                      <button
                        onClick={handleEdit}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#28c1c6] hover:bg-[#1b9aa0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6]"
                      >
                        Edit and Resubmit Application
                      </button>
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6]"
                      >
                        Return to Dashboard
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add Review Section Component
  const ReviewSection = () => {
    if (!reviewData) {
      return (
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Review Your Application</h3>
          <p className="text-gray-600">Loading review data...</p>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">Review Your Application</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Personal Details</h4>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Full Name</dt>
                <dd className="text-sm text-gray-900">{reviewData.personalDetails?.fullName || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{reviewData.personalDetails?.email || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{reviewData.personalDetails?.phone || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Date of Birth</dt>
                <dd className="text-sm text-gray-900">{reviewData.personalDetails?.dateOfBirth || 'Not provided'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Identity Verification</h4>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">ID Type</dt>
                <dd className="text-sm text-gray-900">{reviewData.identityVerification?.idType || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">ID Number</dt>
                <dd className="text-sm text-gray-900">{reviewData.identityVerification?.idNumber || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">ID Front</dt>
                <dd className="text-sm text-gray-900">{reviewData.identityVerification?.idFront || 'Not uploaded'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">ID Back</dt>
                <dd className="text-sm text-gray-900">{reviewData.identityVerification?.idBack || 'Not uploaded'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Vehicle Information</h4>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Make</dt>
                <dd className="text-sm text-gray-900">{reviewData.vehicleInfo?.make || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Model</dt>
                <dd className="text-sm text-gray-900">{reviewData.vehicleInfo?.model || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Year</dt>
                <dd className="text-sm text-gray-900">{reviewData.vehicleInfo?.year || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">License Plate</dt>
                <dd className="text-sm text-gray-900">{reviewData.vehicleInfo?.licensePlate || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Insurance Document</dt>
                <dd className="text-sm text-gray-900">{reviewData.vehicleInfo?.insuranceDocument || 'Not uploaded'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Experience & Background</h4>
            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-500">Years of Experience</dt>
                <dd className="text-sm text-gray-900">{reviewData.experience?.yearsOfExperience || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Previous Employer</dt>
                <dd className="text-sm text-gray-900">{reviewData.experience?.previousEmployer || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Teaching Experience</dt>
                <dd className="text-sm text-gray-900">{reviewData.experience?.teachingExperience || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Certifications</dt>
                <dd className="text-sm text-gray-900">
                  {reviewData.experience?.certifications?.length > 0 
                    ? reviewData.experience.certifications.join(', ')
                    : 'No certifications uploaded'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#28c1c6]">Instructor Application</h2>
              <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
            </div>
            
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
              <div className="flex justify-between relative">
                {steps.map((label, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setCurrentStep(index)}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      ${index === currentStep 
                        ? 'bg-[#28c1c6] text-white' 
                        : index < currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {index + 1}
                    </div>
                    <span className="text-xs mt-2 text-center max-w-[100px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-4 py-6 sm:p-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === steps.length - 1) {
                handleSubmit(e);
              }
            }} className="space-y-8">
              {currentStep === 0 && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="personalDetails.fullName"
                      value={formData.personalDetails.fullName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.personalDetails?.fullName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.personalDetails?.fullName && <p className="mt-1 text-sm text-red-600">{errors.personalDetails.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="personalDetails.email"
                      value={formData.personalDetails.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.personalDetails?.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.personalDetails?.email && <p className="mt-1 text-sm text-red-600">{errors.personalDetails.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="personalDetails.phone"
                      value={formData.personalDetails.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.personalDetails?.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.personalDetails?.phone && <p className="mt-1 text-sm text-red-600">{errors.personalDetails.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="personalDetails.dateOfBirth"
                      value={formData.personalDetails.dateOfBirth}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.personalDetails?.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.personalDetails?.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.personalDetails.dateOfBirth}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="personalDetails.address"
                      value={formData.personalDetails.address}
                      onChange={handleChange}
                      rows={3}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.personalDetails?.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID Type <span className="text-red-500">*</span></label>
                    <select
                      name="identityVerification.idType"
                      value={formData.identityVerification.idType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-3 py-2"
                    >
                      <option value="">Select ID Type</option>
                      <option value="passport">Passport</option>
                      <option value="nationalId">National ID</option>
                      <option value="drivingLicense">Driving License</option>
                    </select>
                    {errors.identityVerification?.idType && <p className="mt-1 text-sm text-red-600">{errors.identityVerification.idType}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID Number <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="identityVerification.idNumber"
                      value={formData.identityVerification.idNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm px-3 py-2 ${
                        errors.identityVerification?.idNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.identityVerification?.idNumber && <p className="mt-1 text-sm text-red-600">{errors.identityVerification.idNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload ID Front <span className="text-red-500">*</span></label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="idFront"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#28c1c6] hover:text-[#1b9aa0] focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="idFront"
                              name="idFront"
                              type="file"
                              className="sr-only"
                              onChange={handleChange}
                              accept=".jpg,.jpeg,.png,.pdf"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                        {formData.identityVerification.idFront && (
                          <p className="text-sm text-gray-600 mt-2">
                            Selected: {formData.identityVerification.idFront.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.identityVerification?.idFront && <p className="mt-1 text-sm text-red-600">{errors.identityVerification.idFront}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload ID Back <span className="text-red-500">*</span></label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="idBack"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#28c1c6] hover:text-[#1b9aa0] focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="idBack"
                              name="idBack"
                              type="file"
                              className="sr-only"
                              onChange={handleChange}
                              accept=".jpg,.jpeg,.png,.pdf"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                        {formData.identityVerification.idBack && (
                          <p className="text-sm text-gray-600 mt-2">
                            Selected: {formData.identityVerification.idBack.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.identityVerification?.idBack && <p className="mt-1 text-sm text-red-600">{errors.identityVerification.idBack}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car Make <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="vehicleInfo.make"
                      value={formData.vehicleInfo.make}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.vehicleInfo?.make ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.vehicleInfo?.make && <p className="mt-1 text-sm text-red-600">{errors.vehicleInfo.make}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car Model <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="vehicleInfo.model"
                      value={formData.vehicleInfo.model}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.vehicleInfo?.model ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.vehicleInfo?.model && <p className="mt-1 text-sm text-red-600">{errors.vehicleInfo.model}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="vehicleInfo.year"
                      value={formData.vehicleInfo.year}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.vehicleInfo?.year ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.vehicleInfo?.year && <p className="mt-1 text-sm text-red-600">{errors.vehicleInfo.year}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Plate <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="vehicleInfo.licensePlate"
                      value={formData.vehicleInfo.licensePlate}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.vehicleInfo?.licensePlate ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.vehicleInfo?.licensePlate && <p className="mt-1 text-sm text-red-600">{errors.vehicleInfo.licensePlate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Insurance (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="insuranceDocument"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#28c1c6] hover:text-[#1b9aa0] focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="insuranceDocument"
                              name="insuranceDocument"
                              type="file"
                              className="sr-only"
                              onChange={handleChange}
                              accept=".jpg,.jpeg,.png,.pdf"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                        {formData.vehicleInfo.insuranceDocument && (
                          <p className="text-sm text-gray-600 mt-2">
                            Selected: {formData.vehicleInfo.insuranceDocument.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="experience.yearsOfExperience"
                      value={formData.experience.yearsOfExperience}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.experience?.yearsOfExperience ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.experience?.yearsOfExperience && <p className="mt-1 text-sm text-red-600">{errors.experience.yearsOfExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Previous Employer</label>
                    <input
                      type="text"
                      name="experience.previousEmployer"
                      value={formData.experience.previousEmployer}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.experience?.previousEmployer ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Certifications</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="certifications"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-[#28c1c6] hover:text-[#1b9aa0] focus-within:outline-none"
                          >
                            <span>Upload a file</span>
                            <input
                              id="certifications"
                              name="certifications"
                              type="file"
                              multiple
                              className="sr-only"
                              onChange={handleChange}
                              accept=".jpg,.jpeg,.png,.pdf"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 5MB</p>
                        {formData.experience.certifications.length > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Selected: {formData.experience.certifications.map(c => c.name).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teaching Style / Experience <span className="text-red-500">*</span></label>
                    <textarea
                      name="experience.teachingExperience"
                      value={formData.experience.teachingExperience}
                      onChange={handleChange}
                      rows={3}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.experience?.teachingExperience ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.experience?.teachingExperience && <p className="mt-1 text-sm text-red-600">{errors.experience.teachingExperience}</p>}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm block mt-2">
                      <input
                        type="checkbox"
                        name="experience.noConviction"
                        checked={formData.experience.noConviction}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      I declare that I have no disqualifying convictions in the last 5 years.
                    </label>
                  </div>

                  <div>
                    <label className="text-sm">
                      <input
                        type="checkbox"
                        name="experience.agreeInfo"
                        checked={formData.experience.agreeInfo}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      I certify that the information provided is accurate. <span className="text-red-500">*</span>
                    </label>
                    {errors.experience?.agreeInfo && <p className="text-sm text-red-600">{errors.experience.agreeInfo}</p>}
                  </div>

                  <div>
                    <label className="text-sm block mt-2">
                      <input
                        type="checkbox"
                        name="experience.agreePolicy"
                        checked={formData.experience.agreePolicy}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      I agree to Learn2Drive's Terms & Privacy Policy. <span className="text-red-500">*</span>
                    </label>
                    {errors.experience?.agreePolicy && <p className="text-sm text-red-600">{errors.experience.agreePolicy}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Digital Signature (Type Full Name) <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="experience.digitalSign"
                      value={formData.experience.digitalSign}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm px-3 py-2 ${
                        errors.experience?.digitalSign ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.experience?.digitalSign && <p className="mt-1 text-sm text-red-600">{errors.experience.digitalSign}</p>}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <ReviewSection />
                </div>
              )}

              <div className="flex justify-between pt-5">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#28c1c6] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6] disabled:opacity-50"
                >
                  <ArrowBackIcon className="mr-2" />
                  Previous
                </button>

                {currentStep === steps.length - 1 ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#28c1c6] hover:bg-[#1b9aa0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6] disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#28c1c6] hover:bg-[#1b9aa0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#28c1c6]"
                  >
                    Next
                    <ArrowForwardIcon className="ml-2" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
