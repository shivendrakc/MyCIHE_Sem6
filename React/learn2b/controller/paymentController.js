import stripe from '../config/stripe.js';
import Payment from '../models/paymentModel.js';
import Booking from '../models/bookingModel.js';

// Create a payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'aud' } = req.body;
    console.log('Creating payment intent for amount:', amount);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment intent created:', paymentIntent.id);
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
};

// Confirm payment and save to database
const confirmPayment = async (req, res) => {
  try {
    console.log('Received payment confirmation request:', req.body);
    
    const { 
      paymentIntentId, 
      studentId, 
      instructorId, 
      amount, 
      date, 
      time, 
      duration,
      location,
      notes
    } = req.body;

    // Validate required fields
    if (!studentId || !instructorId || !amount || !date || !time || !duration || !location) {
      console.error('Missing required fields:', { studentId, instructorId, amount, date, time, duration, location });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('Creating booking record...');
    // Create booking record first
    const booking = new Booking({
      studentId,
      instructorId,
      date,
      time,
      duration,
      location,
      notes,
      amount,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    const savedBooking = await booking.save();
    console.log('Booking saved successfully:', savedBooking._id);

    console.log('Creating payment record...');
    // Create payment record in database
    const payment = new Payment({
      bookingId: savedBooking._id,
      studentId,
      instructorId,
      amount,
      currency: 'AUD',
      paymentStatus: 'completed',
      paymentMethod: 'card',
      transactionId: paymentIntentId
    });

    const savedPayment = await payment.save();
    console.log('Payment saved successfully:', savedPayment._id);

    res.json({ 
      success: true, 
      payment: savedPayment,
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error in confirmPayment:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  createPaymentIntent,
  confirmPayment
}; 