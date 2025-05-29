import mongoose from 'mongoose';

const instructorApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true }
  },
  identityVerification: {
    idType: { type: String, required: true },
    idNumber: { type: String, required: true },
    idFront: { type: String, required: false },
    idBack: { type: String, required: false }
  },
  vehicleInfo: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true },
    insuranceDocument: { type: String, required: false }
  },
  experience: {
    yearsOfExperience: { type: Number, required: true },
    previousEmployer: { type: String },
    certifications: { type: [String], required: false, default: [] },
    teachingExperience: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'resubmitted'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  resubmissionCount: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  }
});

const InstructorApplication = mongoose.model('InstructorApplication', instructorApplicationSchema);

export default InstructorApplication; 