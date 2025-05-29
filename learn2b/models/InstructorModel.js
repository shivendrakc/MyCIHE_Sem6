import mongoose from "mongoose";

const instructorProfileSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  car: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    transmission: {
      type: String,
      required: false
    }
  },
  method: {
    type: String, // Manual or Auto
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
  hourlyRate: {
    type: Number,
    required: true
  },
  availability: [{
    date: {
      type: String,
      required: true
    },
    timeSlots: [String]
  }],
  profileImage: {
    type: String
  }
}, { timestamps: true });

const InstructorProfile = mongoose.model("InstructorProfile", instructorProfileSchema);
export default InstructorProfile;
