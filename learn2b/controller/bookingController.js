import Booking from '../models/bookingModel.js';

// Get all bookings for a user
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      studentId: req.user._id
    })
    .populate('instructorId', 'user')
    .populate({
      path: 'instructorId',
      populate: {
        path: 'user',
        select: 'name email'
      }
    })
    .sort({ date: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking belongs to the user
    if (booking.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    // Check if the booking is in the future
    const bookingDate = new Date(booking.date);
    const now = new Date();
    if (bookingDate <= now) {
      return res.status(400).json({ error: 'Cannot cancel past bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getBookings,
  cancelBooking
}; 