import { useState, useEffect } from 'react';
import axios from 'axios';

const statusConfig = {
  pending:     { label: 'Pending',     cls: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/20' },
  approved:    { label: 'Approved',    cls: 'bg-green-500/15 text-green-400 border border-green-500/20' },
  rejected:    { label: 'Rejected',    cls: 'bg-red-500/15 text-red-400 border border-red-500/20' },
  resubmitted: { label: 'Resubmitted', cls: 'bg-[#00d4df]/15 text-[#00d4df] border border-[#00d4df]/20' },
};

function ImagePreview({ src, onClick }) {
  if (!src) return null;
  return (
    <div className="relative group cursor-pointer" onClick={() => onClick(src)}>
      <img
        src={`http://localhost:5000/${src}`}
        alt=""
        className="w-24 h-24 object-cover rounded-xl border border-white/10 group-hover:border-[#00d4df]/40 transition-all"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-[#00d4df] text-sm font-semibold uppercase tracking-wider mb-3">{title}</h3>
      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
      <p className="text-white text-sm">{value || '—'}</p>
    </div>
  );
}

export default function InstructorApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!userInfo || userInfo.role !== 'admin') throw new Error('You do not have permission to view applications');
      const res = await axios.get('http://localhost:5000/api/instructor-application/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, reason = '') => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/instructor-application/${id}/status`,
        { status, rejectionReason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
      setSelected(null);
      setShowRejectInput(false);
      setRejectionReason('');
    } catch {
      setError('Failed to update application status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#00d4df]/30 border-t-[#00d4df] rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-white mb-6">Instructor Applications</h1>

      {applications.length === 0 ? (
        <div className="text-center py-16 bg-white/[0.03] border border-white/8 rounded-2xl">
          <p className="text-gray-500 text-sm">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map(app => {
            const s = statusConfig[app.status] || statusConfig.pending;
            return (
              <div key={app._id} className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-white font-semibold">{app.personalDetails.fullName}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{app.personalDetails.email}</p>
                    <p className="text-gray-500 text-xs">{app.personalDetails.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.cls}`}>{s.label}</span>
                    <button
                      onClick={() => { setSelected(app); setShowRejectInput(false); setRejectionReason(''); }}
                      className="text-sm text-[#00d4df] hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1829] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#0f1829] border-b border-white/8 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-white font-bold text-lg">Application Details</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <Section title="Personal Details">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Full Name" value={selected.personalDetails.fullName} />
                  <Field label="Email" value={selected.personalDetails.email} />
                  <Field label="Phone" value={selected.personalDetails.phone} />
                  <Field label="Date of Birth" value={new Date(selected.personalDetails.dateOfBirth).toLocaleDateString()} />
                </div>
              </Section>

              <Section title="Identity Verification">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="ID Type" value={selected.identityVerification.idType} />
                  <Field label="ID Number" value={selected.identityVerification.idNumber} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-2">ID Documents</p>
                  <div className="flex gap-3 flex-wrap">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Front</p>
                      <ImagePreview src={selected.identityVerification.idFront} onClick={setLightbox} />
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Back</p>
                      <ImagePreview src={selected.identityVerification.idBack} onClick={setLightbox} />
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Vehicle Information">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Make" value={selected.vehicleInfo.make} />
                  <Field label="Model" value={selected.vehicleInfo.model} />
                  <Field label="Year" value={selected.vehicleInfo.year} />
                  <Field label="License Plate" value={selected.vehicleInfo.licensePlate} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-2">Insurance Document</p>
                  <ImagePreview src={selected.vehicleInfo.insuranceDocument} onClick={setLightbox} />
                </div>
              </Section>

              <Section title="Experience">
                <Field label="Years of Experience" value={selected.experience.yearsOfExperience} />
                <Field label="Previous Employer" value={selected.experience.previousEmployer || 'N/A'} />
                <Field label="Teaching Experience" value={selected.experience.teachingExperience} />
                {selected.experience.certifications?.length > 0 && (
                  <div>
                    <p className="text-gray-500 text-xs mb-2">Certifications</p>
                    <div className="flex gap-3 flex-wrap">
                      {selected.experience.certifications.map((cert, i) => (
                        <ImagePreview key={i} src={cert} onClick={setLightbox} />
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {(selected.status === 'pending' || selected.status === 'resubmitted') && (
                <div className="pt-2 space-y-3">
                  {showRejectInput ? (
                    <div className="space-y-3">
                      <textarea
                        value={rejectionReason}
                        onChange={e => setRejectionReason(e.target.value)}
                        placeholder="Enter rejection reason…"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500/50 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => { if (rejectionReason.trim()) handleStatusUpdate(selected._id, 'rejected', rejectionReason); }}
                          disabled={!rejectionReason.trim()}
                          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/80 hover:bg-red-500 transition-colors disabled:opacity-40"
                        >
                          Confirm Rejection
                        </button>
                        <button
                          onClick={() => setShowRejectInput(false)}
                          className="px-5 py-2.5 rounded-xl text-sm text-gray-400 bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusUpdate(selected._id, 'approved')}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#080d1a] bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] hover:shadow-[0_0_20px_rgba(0,212,223,0.25)] transition-all"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setShowRejectInput(true)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img
              src={`http://localhost:5000/${lightbox}`}
              alt=""
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
