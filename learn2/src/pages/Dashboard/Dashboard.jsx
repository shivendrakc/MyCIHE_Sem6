import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

/* ── shared design tokens ───────────────────────── */
const card = 'bg-[#0f1829] border border-white/8 rounded-2xl p-6';
// shared label style (available for page use)
// const label = 'text-gray-400 text-xs uppercase tracking-wider mb-1';
const tealBtn = 'inline-flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all duration-200 hover:scale-[1.02] text-sm';
const ghostBtn = 'inline-flex items-center gap-2 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5 text-sm';

const ArrowRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

/* ── stat card ──────────────────────────────────── */
const StatCard = ({ icon, value, label: lbl }) => (
  <div className={`${card} flex items-center gap-5 hover:border-[#00d4df]/25 transition-all duration-300 group`}>
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#00d4df]/10 border border-[#00d4df]/20 group-hover:border-[#00d4df]/50 transition-all">
      <span className="text-[#00d4df]">{icon}</span>
    </div>
    <div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-gray-400 text-sm">{lbl}</div>
    </div>
  </div>
);

/* ── section header ─────────────────────────────── */
const SectionTitle = ({ children, sub }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold text-white">{children}</h2>
    {sub && <p className="text-gray-400 text-sm mt-0.5">{sub}</p>}
  </div>
);

/* ───────────────────────────────────────────────── */
const CalIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PeopleIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const StarIcon = () => <svg className="w-5 h-5 text-[#00d4df]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>;
const CashIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GroupIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const AppsIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const CheckIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>;
const XIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>;
const EyeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>;

/* ══════════════════════════════════════════════════
   STUDENT DASHBOARD
══════════════════════════════════════════════════ */
const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const navigate = useNavigate();

  const upcomingLessons = [
    { id: 1, day: 'Tomorrow',  time: '10:00 AM', instructor: 'Sarah Taylor' },
    { id: 2, day: 'Friday',    time: '2:30 PM',  instructor: 'Sarah Taylor' },
  ];

  const recentFeedback = [
    { id: 1, instructor: 'Sarah Taylor', date: 'May 15, 2024', skills: ['Parallel Parking', 'Highway'], comment: 'Great improvement on parallel parking! Highway merging still needs practice.' },
    { id: 2, instructor: 'Sarah Taylor', date: 'May 8, 2024',  skills: ['Roundabouts', 'Signaling'],   comment: "Handling roundabouts much better. Remember to signal earlier when changing lanes." },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[#00d4df]/10 to-[#1b9aa0]/10 border border-[#00d4df]/20 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, {userInfo?.name || 'Learner'} 👋</h1>
            <p className="text-gray-400 mt-1">Ready for your next driving lesson?</p>
          </div>
          <button onClick={() => navigate('/dashboard/instructors')} className={tealBtn}>
            Book a Lesson <ArrowRight />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span className="text-green-400 text-sm">Your progress is improving steadily</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={<CalIcon />} value="8" label="Lessons Booked" />
        <StatCard icon={<PeopleIcon />} value="Sarah T." label="Last Instructor" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <div className={card}>
          <SectionTitle sub="Your scheduled driving lessons">Upcoming Lessons</SectionTitle>
          <div className="space-y-3">
            {upcomingLessons.map((l) => (
              <div key={l.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-10 h-10 bg-[#00d4df]/10 border border-[#00d4df]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CalIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">{l.day}</span>
                    <span className="text-gray-400 text-xs">{l.time}</span>
                  </div>
                  <span className="text-gray-400 text-xs">Instructor: {l.instructor}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/dashboard/bookings')} className={`${tealBtn} mt-5`}>
            View Schedule <ArrowRight />
          </button>
        </div>

        {/* Feedback */}
        <div className={card}>
          <SectionTitle sub="Review your progress">Instructor Feedback</SectionTitle>
          <div className="space-y-4">
            {recentFeedback.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/6 hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white text-sm font-semibold">{f.instructor}</span>
                  <span className="text-gray-500 text-xs">{f.date}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {f.skills.map((s) => (
                    <span key={s} className="text-xs bg-[#00d4df]/10 text-[#00d4df] border border-[#00d4df]/20 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{f.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   INSTRUCTOR DASHBOARD
══════════════════════════════════════════════════ */
const InstructorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [bRes, eRes, rRes] = await Promise.all([
          axios.get('/api/instructor/bookings'),
          axios.get('/api/instructor/earnings'),
          axios.get('/api/instructor/reviews'),
        ]);
        setBookings(bRes.data);
        setEarnings(eRes.data);
        setReviews(rRes.data);
      } catch { /* API not wired yet */ }
    };
    fetch();
  }, []);

  const avgRating = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-[#00d4df]/10 to-[#1b9aa0]/10 border border-[#00d4df]/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white">Instructor Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage your driving lessons and students</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<CalIcon />}    value={bookings.length} label="Total Bookings" />
        <StatCard icon={<CashIcon />}   value={`$${earnings}`}  label="Total Earnings" />
        <StatCard icon={<StarIcon />}   value={avgRating}        label="Avg Rating" />
        <StatCard icon={<PeopleIcon />} value={reviews.length}  label="Reviews" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={card}>
          <SectionTitle sub="Update your teaching details">Profile Management</SectionTitle>
          <p className="text-gray-400 text-sm mb-5">Keep your profile up to date to attract more students.</p>
          <Link to="/dashboard/instructor-profile" className={tealBtn}>
            Manage Profile <ArrowRight />
          </Link>
        </div>

        <div className={card}>
          <SectionTitle sub="Your upcoming student sessions">Upcoming Bookings</SectionTitle>
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No upcoming bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-[#00d4df]/10 flex items-center justify-center text-[#00d4df] text-xs font-bold">
                    {(b.studentName || 'S').charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{b.studentName}</div>
                    <div className="text-gray-500 text-xs">{b.date} at {b.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ADMIN DASHBOARD
══════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const [stats, setStats] = useState({ totalUsers: 0, pendingApplications: 0, activeInstructors: 0, totalBookings: 0 });
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          axios.get('/api/admin/stats', { headers }),
          axios.get('/api/instructor-application/all', { headers }),
        ]);
        setStats(sRes.data);
        setApplications(Array.isArray(aRes.data) ? aRes.data : []);
      } catch { /* API not wired */ }
      finally { setLoading(false); }
    };
    load();
  }, []);

  const refresh = async () => {
    const [sRes, aRes] = await Promise.all([
      axios.get('/api/admin/stats', { headers }),
      axios.get('/api/instructor-application/all', { headers }),
    ]);
    setStats(sRes.data);
    setApplications(Array.isArray(aRes.data) ? aRes.data : []);
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/api/instructor-application/${id}/status`, { status: 'approved' }, { headers });
      await refresh();
      setSelected(null);
    } catch { /* handle */ }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`/api/instructor-application/${id}/status`, { status: 'rejected', rejectionReason }, { headers });
      await refresh();
      setSelected(null);
      setRejectionReason('');
    } catch { /* handle */ }
  };

  const statusBadge = (s) => {
    const map = {
      pending:     'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
      approved:    'bg-green-500/15 text-green-400 border-green-500/30',
      rejected:    'bg-red-500/15 text-red-400 border-red-500/30',
      resubmitted: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    };
    return map[s] || 'bg-white/10 text-gray-300 border-white/20';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="bg-gradient-to-br from-[#00d4df]/10 to-[#1b9aa0]/10 border border-[#00d4df]/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white">Welcome back, {userInfo?.name || 'Admin'} 👋</h1>
        <p className="text-gray-400 mt-1">Manage your platform efficiently</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<GroupIcon />}  value={stats.totalUsers}           label="Total Users" />
        <StatCard icon={<AppsIcon />}   value={stats.pendingApplications}  label="Pending Apps" />
        <StatCard icon={<PeopleIcon />} value={stats.activeInstructors}    label="Instructors" />
        <StatCard icon={<CalIcon />}    value={stats.totalBookings}         label="Total Bookings" />
      </div>

      {/* Applications table */}
      <div className={card}>
        <SectionTitle sub="Review and process instructor applications">Instructor Applications</SectionTitle>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-6 w-6 text-[#00d4df]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : applications.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 text-center">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Applicant', 'Email', 'Phone', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left text-gray-400 text-xs uppercase tracking-wider py-3 px-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 px-3 text-white font-medium">{app.personalDetails?.fullName || '—'}</td>
                    <td className="py-3 px-3 text-gray-400">{app.personalDetails?.email || '—'}</td>
                    <td className="py-3 px-3 text-gray-400">{app.personalDetails?.phone || '—'}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusBadge(app.status)}`}>
                        {app.status === 'resubmitted' ? `Resubmitted (${app.resubmissionCount || 1})` : app.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => setSelected(app)}
                        className="flex items-center gap-1.5 text-[#00d4df] text-xs font-semibold hover:underline"
                      >
                        <EyeIcon /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1829] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <div>
                <h3 className="text-lg font-bold text-white">Application Details</h3>
                {selected.status === 'resubmitted' && (
                  <p className="text-blue-400 text-xs mt-0.5">Resubmitted {selected.resubmissionCount || 1} time(s)</p>
                )}
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white transition-colors">
                <XIcon />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {[
                { title: 'Personal Details', fields: [
                  ['Full Name', selected.personalDetails?.fullName],
                  ['Email', selected.personalDetails?.email],
                  ['Phone', selected.personalDetails?.phone],
                  ['Address', selected.personalDetails?.address],
                ]},
                { title: 'Vehicle Information', fields: [
                  ['Make', selected.vehicleInfo?.make],
                  ['Model', selected.vehicleInfo?.model],
                  ['Year', selected.vehicleInfo?.year],
                  ['License Plate', selected.vehicleInfo?.licensePlate],
                ]},
                { title: 'Experience', fields: [
                  ['Years of Experience', selected.experience?.yearsOfExperience],
                  ['Previous Employer', selected.experience?.previousEmployer],
                  ['Teaching Experience', selected.experience?.teachingExperience],
                ]},
              ].map(({ title, fields }) => (
                <div key={title}>
                  <h4 className="text-[#00d4df] text-xs font-semibold uppercase tracking-wider mb-3">{title}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fields.map(([k, v]) => (
                      <div key={k} className="bg-white/[0.03] border border-white/6 rounded-xl p-3">
                        <div className="text-gray-500 text-xs mb-1">{k}</div>
                        <div className="text-white text-sm">{v || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {(selected.status === 'pending' || selected.status === 'resubmitted') && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Rejection Reason</label>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Provide a reason if rejecting…"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all resize-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/8">
              <button onClick={() => setSelected(null)} className={ghostBtn}>Close</button>
              {(selected.status === 'pending' || selected.status === 'resubmitted') && (
                <>
                  <button
                    onClick={() => handleReject(selected._id)}
                    disabled={!rejectionReason}
                    className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <XIcon /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selected._id)}
                    className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
                  >
                    <CheckIcon /> Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ROOT ROUTER
══════════════════════════════════════════════════ */
const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const role = userInfo?.role || 'student';
  if (role === 'admin') return <AdminDashboard />;
  if (role === 'instructor') return <InstructorDashboard />;
  return <StudentDashboard />;
};

export default Dashboard;
