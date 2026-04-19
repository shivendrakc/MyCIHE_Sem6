import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TABS = ['Upcoming', 'Completed', 'Cancelled'];

const statusConfig = {
  pending:   { label: 'Pending',   cls: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' },
  confirmed: { label: 'Confirmed', cls: 'bg-[#00d4df]/15 text-[#00d4df] border border-[#00d4df]/20' },
  completed: { label: 'Completed', cls: 'bg-green-500/15 text-green-400 border border-green-500/20' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-500/15 text-red-400 border border-red-500/20' },
};

export default function Bookings() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(location.state?.paymentSuccess ? 'Payment successful! Your booking has been confirmed.' : '');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBookings(res.data);
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${cancelTarget._id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCancelTarget(null);
      fetchBookings();
    } catch {
      setError('Failed to cancel booking. Please try again.');
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 0) return b.status === 'pending' || b.status === 'confirmed';
    if (activeTab === 1) return b.status === 'completed';
    if (activeTab === 2) return b.status === 'cancelled';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#00d4df]/30 border-t-[#00d4df] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">My Bookings</h1>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="text-red-400/60 hover:text-red-400">✕</button>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {successMsg}
          <button onClick={() => setSuccessMsg('')} className="text-green-400/60 hover:text-green-400">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 border border-white/8 rounded-xl p-1 mb-6 w-fit">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === i
                ? 'bg-[#00d4df] text-[#080d1a]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white/[0.03] border border-white/8 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((booking) => {
            const s = statusConfig[booking.status] || statusConfig.pending;
            const canCancel = booking.status === 'pending' || booking.status === 'confirmed';
            return (
              <div
                key={booking._id}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all"
              >
                <div className="flex flex-wrap items-center gap-4 justify-between">
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm">{booking.instructorId?.name || 'Instructor'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                    <p className="text-gray-500 text-xs">Duration: {booking.duration} hour{booking.duration !== 1 ? 's' : ''}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#00d4df] font-semibold text-sm">${booking.amount}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.cls}`}>{s.label}</span>
                    {canCancel && (
                      <button
                        onClick={() => setCancelTarget(booking)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Cancel booking"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelTarget && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1829] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-white font-bold text-lg mb-2">Cancel Booking</h3>
            <p className="text-gray-400 text-sm mb-6">
              Are you sure you want to cancel this booking? Cancellations within 24 hours of the lesson may be subject to a cancellation fee.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCancelTarget(null)}
                className="px-4 py-2 rounded-xl text-sm text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
              >
                No, Keep It
              </button>
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
