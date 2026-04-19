import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const STEPS = ['Choose Date & Time', 'Confirm Booking', 'Payment'];

const inputCls = 'w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all';

export default function BookLessons() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    if (location.state?.selectedInstructor) {
      setInstructor(location.state.selectedInstructor);
    } else {
      navigate('/dashboard/instructors');
    }
  }, [location, navigate]);

  const calculateTotal = () => {
    if (!instructor) return 0;
    return instructor.profile.hourlyRate * parseInt(duration);
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Please log in to book a lesson');
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const studentId = payload._id;
      const dateTime = new Date(`${selectedDate}T${selectedTime}`);
      navigate('/dashboard/payment', {
        state: {
          bookingDetails: {
            studentId,
            instructorId: instructor._id,
            instructor,
            date: dateTime,
            time: dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: parseInt(duration),
            location: instructor.profile.suburb,
            totalAmount: calculateTotal(),
          },
        },
      });
    } catch (err) {
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!instructor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#00d4df]/30 border-t-[#00d4df] rounded-full animate-spin" />
      </div>
    );
  }

  const canProceed = activeStep === 0 ? (selectedDate !== '') : true;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Book a Lesson</h1>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < activeStep
                  ? 'bg-[#00d4df] text-[#080d1a]'
                  : i === activeStep
                  ? 'bg-[#00d4df]/20 border-2 border-[#00d4df] text-[#00d4df]'
                  : 'bg-white/5 border border-white/10 text-gray-500'
              }`}>
                {i < activeStep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </div>
              <span className={`text-xs mt-1 hidden sm:block ${i === activeStep ? 'text-[#00d4df]' : 'text-gray-500'}`}>{step}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-4 ${i < activeStep ? 'bg-[#00d4df]/50' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
        {/* Step 0 — Choose Date & Time */}
        {activeStep === 0 && (
          <div className="space-y-5">
            {/* Instructor summary */}
            <div className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/8 rounded-xl">
              <img
                src={instructor.profile?.profileImage
                  ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${instructor.profile.profileImage}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=00d4df&color=080d1a`}
                alt={instructor.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00d4df]/30"
              />
              <div>
                <p className="text-white font-semibold">{instructor.name}</p>
                <p className="text-gray-400 text-xs">{instructor.profile?.suburb}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {instructor.profile?.method && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#00d4df]/10 text-[#00d4df] border border-[#00d4df]/20">{instructor.profile.method}</span>
                  )}
                  {instructor.profile?.experience && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">{instructor.profile.experience} yrs exp</span>
                  )}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#00d4df]/10 text-[#00d4df] border border-[#00d4df]/20">${instructor.profile?.hourlyRate}/hr</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  min={today}
                  onChange={e => setSelectedDate(e.target.value)}
                  className={inputCls + ' [color-scheme:dark]'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Select Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                  className={inputCls + ' [color-scheme:dark]'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Duration</label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className={inputCls}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 1 — Confirm Booking */}
        {activeStep === 1 && (
          <div>
            <h3 className="text-white font-semibold mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-4 border-b border-white/8">
                <img
                  src={instructor.profile?.profileImage
                    ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${instructor.profile.profileImage}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=00d4df&color=080d1a`}
                  alt={instructor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00d4df]/30"
                />
                <div>
                  <p className="text-white font-semibold">{instructor.name}</p>
                  <p className="text-gray-400 text-xs">{instructor.profile?.suburb}</p>
                </div>
              </div>
              {[
                ['Date', new Date(`${selectedDate}T${selectedTime}`).toLocaleDateString()],
                ['Time', selectedTime],
                ['Duration', `${duration} hour${duration > 1 ? 's' : ''}`],
                ['Rate', `$${instructor.profile?.hourlyRate}/hr`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
              <div className="border-t border-white/8 pt-3 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#00d4df] font-bold text-lg">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Payment info */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Payment Details</h3>
            <p className="text-gray-400 text-sm">You will be redirected to our secure payment gateway to complete your booking.</p>
            <div className="bg-[#00d4df]/10 border border-[#00d4df]/20 rounded-xl p-4">
              <p className="text-[#00d4df] font-bold">Total Amount: ${calculateTotal()}</p>
            </div>
            <p className="text-gray-500 text-xs">By proceeding, you agree to our terms and conditions and cancellation policy.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6 pt-5 border-t border-white/8">
          {activeStep > 0 ? (
            <button
              onClick={() => setActiveStep(s => s - 1)}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl text-sm text-gray-400 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Back
            </button>
          ) : <div />}

          <button
            onClick={activeStep === STEPS.length - 1 ? handleBooking : () => setActiveStep(s => s + 1)}
            disabled={loading || !canProceed}
            className="flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-2.5 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.25)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing…
              </>
            ) : activeStep === STEPS.length - 1 ? 'Proceed to Payment' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
