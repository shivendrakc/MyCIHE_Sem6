import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Get user info to check if admin
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || userInfo.role !== 'admin') {
        throw new Error('You do not have permission to view applications');
      }

      const response = await axios.get('http://localhost:5000/api/instructor-application/all', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setApplications(response.data);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Failed to fetch applications';
      setError(errorMessage);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus, rejectionReason = '') => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/instructor-application/${applicationId}/status`,
        { status: newStatus, rejectionReason },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchApplications(); // Refresh the list
      setSelectedApplication(null); // Close the modal
    } catch (err) {
      setError('Failed to update application status');
      console.error('Error updating application:', err);
    }
  };

  const ImagePreview = ({ src, alt }) => {
    if (!src) return null;
    
    return (
      <div className="relative group">
        <img
          src={`http://localhost:5000/${src}`}
          alt={alt}
          className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setSelectedImage(src)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e667d]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#2e667d] mb-6">Instructor Applications</h1>
      
      <div className="grid gap-6">
        {applications.map((application) => (
          <div
            key={application._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-[#2e667d]">
                  {application.personalDetails.fullName}
                </h2>
                <p className="text-gray-600">{application.personalDetails.email}</p>
                <p className="text-gray-600">{application.personalDetails.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
                <button
                  onClick={() => setSelectedApplication(application)}
                  className="bg-[#2e667d] text-white px-4 py-2 rounded hover:bg-[#1e4d5d] transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for viewing application details */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[#2e667d]">
                Application Details
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="font-semibold text-lg mb-2">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Full Name</p>
                    <p>{selectedApplication.personalDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p>{selectedApplication.personalDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p>{selectedApplication.personalDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date of Birth</p>
                    <p>{new Date(selectedApplication.personalDetails.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-2">Identity Verification</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">ID Type</p>
                    <p>{selectedApplication.identityVerification.idType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">ID Number</p>
                    <p>{selectedApplication.identityVerification.idNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-2">ID Documents</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Front</p>
                        <ImagePreview 
                          src={selectedApplication.identityVerification.idFront} 
                          alt="ID Front" 
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Back</p>
                        <ImagePreview 
                          src={selectedApplication.identityVerification.idBack} 
                          alt="ID Back" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-2">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Make</p>
                    <p>{selectedApplication.vehicleInfo.make}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Model</p>
                    <p>{selectedApplication.vehicleInfo.model}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p>{selectedApplication.vehicleInfo.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">License Plate</p>
                    <p>{selectedApplication.vehicleInfo.licensePlate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-2">Insurance Document</p>
                    <ImagePreview 
                      src={selectedApplication.vehicleInfo.insuranceDocument} 
                      alt="Insurance Document" 
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-semibold text-lg mb-2">Experience</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-600">Years of Experience</p>
                    <p>{selectedApplication.experience.yearsOfExperience}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Previous Employer</p>
                    <p>{selectedApplication.experience.previousEmployer || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Teaching Experience</p>
                    <p>{selectedApplication.experience.teachingExperience}</p>
                  </div>
                  {selectedApplication.experience.certifications?.length > 0 && (
                    <div>
                      <p className="text-gray-600 mb-2">Certifications</p>
                      <div className="flex gap-4">
                        {selectedApplication.experience.certifications.map((cert, index) => (
                          <ImagePreview 
                            key={index}
                            src={cert} 
                            alt={`Certification ${index + 1}`} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {selectedApplication.status === 'pending' || selectedApplication.status === 'resubmitted' ? (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication._id, 'approved')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      const reason = prompt('Please enter rejection reason:');
                      if (reason) {
                        handleStatusUpdate(selectedApplication._id, 'rejected', reason);
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Full-screen image preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={`http://localhost:5000/${selectedImage}`}
              alt="Full size preview"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorApplications; 