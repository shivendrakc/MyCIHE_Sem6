import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const steps = [
  'Personal Details',
  'Identity Verification',
  'Vehicle Info',
  'Experience & Background',
  'Consent & Submit'
];



const InstructorKYCForm = () => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    nationality: '',
    address: '',
    governmentId: null,
    licenseNumber: '',
    licenseExpiry: '',
    profilePicture: null,
    wwcc: null,
    carMakeModel: '',
    carType: '',
    transmission: '',
    year: '',
    regoNumber: '',
    insurance: null,
    experience: '',
    certifications: null,
    languages: '',
    bio: '',
    agreeInfo: false,
    agreePolicy: false,
    digitalSign: ''
  });

const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate();

useEffect(() => {
  if (submitted) {
    let count = 20;
    const timer = setInterval(() => {
      count--;
      const countdownElement = document.getElementById('countdown');
      if (countdownElement) {
        countdownElement.textContent = count;
      }
      if (count === 0) {
        clearInterval(timer);
        navigate('/');
      }
    }, 1000);

    return () => clearInterval(timer);
  }
}, [submitted, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0]
      }));
      // Update the filename display
      const filenameDisplay = document.getElementById(`${name}-filename`);
      if (filenameDisplay) {
        filenameDisplay.textContent = files[0] ? files[0].name : '';
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 0) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    }
    
    if (currentStep === 1) {
      if (!formData.governmentId) newErrors.governmentId = 'Government ID is required';
      if (!formData.profilePicture) newErrors.profilePicture = 'Profile Picture is required';
      if (!formData.wwcc) newErrors.wwcc = 'WWCC is required';
    }
    
    if (currentStep === 2) {
      if (!formData.carMakeModel) newErrors.carMakeModel = 'Car Make & Model is required';
      if (!formData.carType) newErrors.carType = 'Car Type is required';
      if (!formData.transmission) newErrors.transmission = 'Transmission type is required';
      if (!formData.year) newErrors.year = 'Year is required';
      if (!formData.regoNumber) newErrors.regoNumber = 'Registration Number is required';
    }
    
    if (currentStep === 3) {
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.languages) newErrors.languages = 'Languages are required';
      if (!formData.bio) newErrors.bio = 'Bio is required';
    }
    
    if (currentStep === 4) {
      if (!formData.agreeInfo) newErrors.agreeInfo = 'You must certify the information';
      if (!formData.agreePolicy) newErrors.agreePolicy = 'You must agree to the Terms & Privacy Policy';
      if (!formData.digitalSign) newErrors.digitalSign = 'Digital Signature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen flex justify-center items-start py-16 px-4">
      {submitted && (
        <div 
          className="fixed inset-0 bg-[#28c1c6] bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => navigate('/')}
        >
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-500 scale-100 hover:scale-105">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-[#28c1c6] mb-4">Thank You!</h3>
              <p className="text-gray-700 mb-4">
                Your application has been successfully submitted. Our team will review your information
                and get back to you shortly regarding the next steps. If successful, you will be be notified via email for further instructions.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to homepage in <span id="countdown">10</span> seconds...
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center text-[#28c1c6] mb-10">Instructor KYC Form</h2>

        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-10 relative">
          {steps.map((label, index) => (
            <div 
              key={index} 
              className="flex-1 text-center z-10 cursor-pointer"
              onClick={() => setStep(index)}
            >
              <div
                className={`w-6 h-6 mx-auto rounded-full font-bold flex items-center justify-center 
                ${index === step ? 'bg-[#28c1c6] text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors duration-200'}`}
              >
                {index + 1}
              </div>
              <p className="text-xs mt-2 hover:text-[#28c1c6] transition-colors duration-200">{label}</p>
            </div>
          ))}
          <div className="absolute top-3 left-3 right-3 border-t border-gray-300 z-0"></div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {step === 0 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
                <input name="fullName" placeholder="Full Name" className="input" onChange={handleChange} />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email Address <span className="text-red-500">*</span></label>
                <input name="email" type="email" placeholder="Email Address" className="input" onChange={handleChange} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input name="phone" placeholder="Phone Number" className="input" onChange={handleChange} />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <input name="dob" type="date" className="input" onChange={handleChange} />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Gender</label>
                <input name="gender" placeholder="Gender" className="input" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Nationality</label>
                <input name="nationality" placeholder="Nationality" className="input" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Residential Address</label>
                <input name="address" placeholder="Residential Address" className="input" onChange={handleChange} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Upload Government ID <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="file"
                    name="governmentId"
                    onChange={handleChange}
                    className="hidden"
                    id="governmentId"
                  />
                  <label 
                    htmlFor="governmentId"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="governmentId-filename"></span>
                </div>
                {errors.governmentId && <p className="text-red-500 text-sm mt-1">{errors.governmentId}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Driver's License Number</label>
                <input name="licenseNumber" placeholder="Driver's License Number" className="input" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">License Expiry</label>
                <input name="licenseExpiry" type="date" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Upload Profile Picture <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="file"
                    name="profilePicture"
                    onChange={handleChange}
                    className="hidden"
                    id="profilePicture"
                  />
                  <label 
                    htmlFor="profilePicture"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="profilePicture-filename"></span>
                </div>
                {errors.profilePicture && <p className="text-red-500 text-sm mt-1">{errors.profilePicture}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Upload WWCC <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="file"
                    name="wwcc"
                    onChange={handleChange}
                    className="hidden"
                    id="wwcc"
                  />
                  <label 
                    htmlFor="wwcc"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="wwcc-filename"></span>
                </div>
                {errors.wwcc && <p className="text-red-500 text-sm mt-1">{errors.wwcc}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Upload Health Assessment Report</label>
                <div className="relative">
                  <input
                    type="file"
                    name="healthReport"
                    onChange={handleChange}
                    className="hidden"
                    id="healthReport"
                  />
                  <label 
                    htmlFor="healthReport"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="healthReport-filename"></span>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Car Make & Model <span className="text-red-500">*</span></label>
                <input name="carMakeModel" placeholder="Car Make & Model" className="input" onChange={handleChange} />
                {errors.carMakeModel && <p className="text-red-500 text-sm mt-1">{errors.carMakeModel}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Car Type <span className="text-red-500">*</span></label>
                <input name="carType" placeholder="Car Type (Sedan, SUV...)" className="input" onChange={handleChange} />
                {errors.carType && <p className="text-red-500 text-sm mt-1">{errors.carType}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Transmission <span className="text-red-500">*</span></label>
                <input name="transmission" placeholder="Transmission (Manual/Auto)" className="input" onChange={handleChange} />
                {errors.transmission && <p className="text-red-500 text-sm mt-1">{errors.transmission}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Year of Manufacture <span className="text-red-500">*</span></label>
                <input name="year" placeholder="Year of Manufacture" className="input" onChange={handleChange} />
                {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Vehicle Registration Number <span className="text-red-500">*</span></label>
                <input name="regoNumber" placeholder="Vehicle Registration Number" className="input" onChange={handleChange} />
                {errors.regoNumber && <p className="text-red-500 text-sm mt-1">{errors.regoNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Upload Insurance (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    name="insurance"
                    onChange={handleChange}
                    className="hidden"
                    id="insurance"
                  />
                  <label 
                    htmlFor="insurance"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="insurance-filename"></span>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Years of Experience <span className="text-red-500">*</span></label>
                <input name="experience" placeholder="Years of Experience" className="input" onChange={handleChange} />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Upload Certifications</label>
                <div className="relative">
                  <input
                    type="file"
                    name="certifications"
                    onChange={handleChange}
                    className="hidden"
                    id="certifications"
                  />
                  <label 
                    htmlFor="certifications"
                    className="inline-block bg-[#28c1c6] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#1b9aa0] transition-colors duration-300"
                  >
                    Choose File
                  </label>
                  <span className="ml-2 text-sm text-gray-600" id="certifications-filename"></span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Languages Spoken <span className="text-red-500">*</span></label>
                <input name="languages" placeholder="Languages Spoken" className="input" onChange={handleChange} />
                {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Teaching Style / Bio <span className="text-red-500">*</span></label>
                <textarea
                  name="bio"
                  placeholder="Teaching Style / Bio"
                  rows={4}
                  className="w-full border border-gray-300 rounded p-2"
                  onChange={handleChange}
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <label className="text-sm block mt-2">
                  <input
                    type="checkbox"
                    name="noConviction"
                    checked={formData.noConviction}
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
                    name="agreeInfo"
                    checked={formData.agreeInfo}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I certify that the information provided is accurate. <span className="text-red-500">*</span>
                </label>
                {errors.agreeInfo && <p className="text-red-500 text-sm mt-1">{errors.agreeInfo}</p>}
              </div>

              <div>
                <label className="text-sm block mt-2">
                  <input
                    type="checkbox"
                    name="agreePolicy"
                    checked={formData.agreePolicy}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  I agree to Learn2Drive's Terms & Privacy Policy. <span className="text-red-500">*</span>
                </label>
                {errors.agreePolicy && <p className="text-red-500 text-sm mt-1">{errors.agreePolicy}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Digital Signature (Type Full Name) <span className="text-red-500">*</span></label>
                <input
                  name="digitalSign"
                  placeholder="Digital Signature (Type Full Name)"
                  className="input mt-4"
                  onChange={handleChange}
                />
                {errors.digitalSign && <p className="text-red-500 text-sm mt-1">{errors.digitalSign}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#28c1c6] text-white py-2 rounded hover:bg-[#1b9aa0] hover:scale-105 transition-all duration-300 mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  if (validateStep(4)) {
                    setSubmitted(true);
                  }
                }}
              >
                Submit Application
              </button>
            </>
          )}
        </form>
        

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="bg-[#28c1c6] text-white px-3 py-2 rounded hover:bg-[#1b9aa0] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-[#28c1c6]"
          >
            ← Previous
          </button>
          {step < steps.length - 1 && (
            <button
              onClick={nextStep}
              className="bg-[#28c1c6] text-white px-3 py-2 rounded hover:bg-[#1b9aa0] hover:scale-105 transition-all duration-300"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorKYCForm;
