import express from 'express';
import { getBookings, cancelBooking } from '../controller/bookingController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Get all bookings for the logged-in user
router.get('/', protect, getBookings);

// Cancel a booking
router.put('/:id/cancel', protect, cancelBooking);

export default router; 