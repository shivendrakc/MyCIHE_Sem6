import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'rejected', 'paid'],
    default: 'pending'
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
