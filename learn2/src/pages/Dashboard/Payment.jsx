import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const stripeAppearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#00d4df',
    colorBackground: '#0f1829',
    colorText: '#f0f9ff',
    colorDanger: '#f87171',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    borderRadius: '12px',
  },
};

function PaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    try {
      const { error: submitError } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/dashboard/bookings` },
      });
      if (submitError) setError(submitError.message);
      else onSuccess();
    } catch {
      setError('An unexpected error occurred.');
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && (
        <div className="mt-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,212,223,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing…
          </>
        ) : `Pay $${amount}`}
      </button>
    </form>
  );
}

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successBanner, setSuccessBanner] = useState(false);
  const booking = location.state?.bookingDetails || {};

  useEffect(() => {
    if (!booking.totalAmount) return;
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/payments/create-payment-intent',
          { amount: booking.totalAmount, currency: 'aud' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setClientSecret(res.data.clientSecret);
      } catch {
        setError('Failed to initialize payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    createPaymentIntent();
  }, [booking.totalAmount]);

  const handlePaymentSuccess = async () => {
    try {
      if (!booking.studentId || !booking.instructorId || !booking.date || !booking.time ||
          !booking.duration || !booking.location || !booking.totalAmount) {
        setError('Missing required booking details. Please try again.');
        return;
      }
      const res = await axios.post(
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
          notes: booking.notes || '',
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (res.data.success) {
        setSuccessBanner(true);
        setTimeout(() => navigate('/dashboard/bookings', { state: { paymentSuccess: true, bookingId: res.data.booking._id } }), 2000);
      } else {
        setError('Payment confirmation failed. Please contact support.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to confirm payment. Please contact support.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#00d4df]/30 border-t-[#00d4df] rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !clientSecret) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">Payment</h1>

      {successBanner && (
        <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm">
          Payment successful! Redirecting to your bookings…
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment form */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Payment Details</h2>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: stripeAppearance }}>
              <PaymentForm amount={booking.totalAmount} onSuccess={handlePaymentSuccess} />
            </Elements>
          )}
        </div>

        {/* Order summary */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-5">Order Summary</h2>
          <div className="space-y-3">
            {[
              ['Instructor', booking.instructor?.name || '—'],
              ['Date', booking.date ? new Date(booking.date).toLocaleDateString() : '—'],
              ['Time', booking.time || '—'],
              ['Duration', booking.duration ? `${booking.duration} hour${booking.duration > 1 ? 's' : ''}` : '—'],
              booking.location ? ['Location', booking.location] : null,
              booking.notes ? ['Notes', booking.notes] : null,
            ].filter(Boolean).map(([label, value]) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-gray-400">{label}</span>
                <span className="text-white text-right max-w-[60%]">{value}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 mt-4 pt-4 flex justify-between items-center">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#00d4df] font-bold text-xl">${booking.totalAmount}</span>
          </div>

          <div className="mt-6 p-4 bg-[#00d4df]/5 border border-[#00d4df]/15 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#00d4df] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-gray-400 text-xs leading-relaxed">Your payment is secured with 256-bit SSL encryption. By proceeding, you agree to our terms and cancellation policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
