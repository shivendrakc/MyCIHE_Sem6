import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard/bookings`,
        },
      });

      if (submitError) {
        setError(submitError.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || processing}
        sx={{
          mt: 3,
          background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
          },
        }}
      >
        {processing ? <CircularProgress size={24} /> : 'Pay Now'}
      </Button>
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const booking = location.state?.bookingDetails || {};

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        console.log('Creating payment intent with amount:', booking.totalAmount);
        const response = await axios.post(
          'http://localhost:5000/api/payments/create-payment-intent',
          {
            amount: booking.totalAmount || 0,
            currency: 'aud'
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        console.log('Payment intent created:', response.data);
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (booking.totalAmount) {
      createPaymentIntent();
    }
  }, [booking]);

  const handlePaymentSuccess = async () => {
    try {
      // Validate required booking details
      if (!booking.studentId || !booking.instructorId || !booking.date || !booking.time || 
          !booking.duration || !booking.location || !booking.totalAmount) {
        console.error('Missing booking details:', booking);
        setError('Missing required booking details. Please try again.');
        return;
      }

      console.log('Sending payment confirmation with booking details:', booking);

      const response = await axios.post(
        'http://localhost:5000/api/payments/confirm-payment',
        {
          paymentIntentId: booking.paymentIntentId,
          studentId: booking.studentId,
          instructorId: booking.instructorId,
          amount: booking.totalAmount,
          date: booking.date,
          time: booking.time,
          duration: booking.duration,
          location: booking.location,
          notes: booking.notes || ''
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Payment confirmation response:', response.data);
      
      if (response.data.success) {
        setShowSuccessToast(true);
        setTimeout(() => {
          navigate('/dashboard/bookings', {
            state: { 
              paymentSuccess: true,
              bookingId: response.data.booking._id
            }
          });
        }, 2000);
      } else {
        setError('Payment confirmation failed. Please contact support.');
      }
    } catch (err) {
      console.error('Error in handlePaymentSuccess:', err);
      setError(err.response?.data?.error || 'Failed to confirm payment. Please contact support.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          color: '#0f3643'
        }}>
          Payment
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm 
                  amount={booking.totalAmount} 
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Instructor: {booking.instructor?.user?.name}
              </Typography>
              <Typography variant="body1">
                Date: {new Date(booking.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                Time: {booking.time}
              </Typography>
              <Typography variant="body1">
                Duration: {booking.duration} hour{booking.duration > 1 ? 's' : ''}
              </Typography>
              {booking.location && (
                <Typography variant="body1">
                  Location: {booking.location}
                </Typography>
              )}
              {booking.notes && (
                <Typography variant="body1">
                  Notes: {booking.notes}
                </Typography>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ${booking.totalAmount}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccessToast}
        autoHideDuration={2000}
        message="Payment successful! Redirecting to bookings..."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Payment; 