import express from 'express';
import { createPaymentIntent, confirmPayment } from '../controller/paymentController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', protect, createPaymentIntent);

// Confirm payment
router.post('/confirm-payment', protect, confirmPayment);

export default router; 