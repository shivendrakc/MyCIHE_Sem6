import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },
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
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'AUD'
  },
  paymentStatus: {
    type: String,
    enum: ['completed', 'failed'],
    default: 'completed'
  },
  paymentMethod: {
    type: String,
    default: 'card'
  },
  transactionId: {
    type: String
  }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
