import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/axios';
import { toast } from 'react-hot-toast';

const STEPS = ['Personal Details', 'Identity', 'Vehicle', 'Experience', 'Consent', 'Review'];

const deepCopyWithFiles = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof File) return obj;
  if (Array.isArray(obj)) return obj.map(deepCopyWithFiles);
  const copy = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) copy[key] = deepCopyWithFiles(obj[key]);
  }
  return copy;
};

/* ── shared styles ─────────────────────────── */
const inputCls = (err) =>
  `w-full bg-white/5 border ${err ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all`;
const labelCls = 'block text-sm font-medium text-gray-300 mb-1.5';
const errCls   = 'text-red-400 text-xs mt-1';

const FieldError = ({ msg }) => msg ? <p className={errCls}>{msg}</p> : null;

/* ── upload zone ──────────────────────────── */
const UploadZone = ({ id, name, label, onChange, fileName, accept = '.jpg,.jpeg,.png,.pdf' }) => (
  <div>
    <label className={labelCls}>{label}</label>
    <label
      htmlFor={id}
      className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/15 rounded-xl px-6 py-8 cursor-pointer hover:border-[#00d4df]/40 hover:bg-[#00d4df]/5 transition-all group"
    >
      <svg className="w-8 h-8 text-gray-500 group-hover:text-[#00d4df] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      {fileName ? (
        <span className="text-[#00d4df] text-sm font-medium">{fileName}</span>
      ) : (
        <>
          <span className="text-gray-400 text-sm">Click to upload or drag & drop</span>
          <span className="text-gray-600 text-xs">PNG, JPG, PDF — max 5 MB</span>
        </>
      )}
      <input id={id} name={name} type="file" className="sr-only" onChange={onChange} accept={accept} />
    </label>
  </div>
);

/* ── review row ───────────────────────────── */
const ReviewField = ({ label, value }) => (
  <div className="bg-white/[0.03] border border-white/6 rounded-xl p-3">
    <div className="text-gray-500 text-xs mb-1">{label}</div>
    <div className="text-white text-sm">{value || '—'}</div>
  </div>
);

/* ════════════════════════════════════════════ */
const ApplicationForm = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const userId = userInfo?._id || userInfo?.id;
  const navigate = useNavigate();

  const [step, setStep]   = useState(0);
  const [status, setStatus] = useState(null);   // null | 'pending' | 'rejected'
  const [rejectionReason, setRejectionReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    personalDetails:      { fullName: '', email: '', phone: '', address: '', dateOfBirth: '' },
    identityVerification: { idType: '', idNumber: '', idFront: null, idBack: null },
    vehicleInfo:          { make: '', model: '', year: '', licensePlate: '', insuranceDocument: null },
    experience:           { yearsOfExperience: '', previousEmployer: '', certifications: [], teachingExperience: '', noConviction: false, agreeInfo: false, agreePolicy: false, digitalSign: '' },
  });

  /* ── load status ─────────────────────────── */
  useEffect(() => {
    if (!userId) { setIsLoading(false); return; }
    (async () => {
      try {
        const { data } = await API.get(`/instructor-application/status/${userId}`, { withCredentials: true });
        if (data.status === 'not_submitted') { setStatus(null); return; }
        setStatus(data.status);
        if (data.status === 'rejected') setRejectionReason(data.rejectionReason || '');
        if (data.status === 'pending' || data.status === 'rejected') {
          try {
            const { data: appData } = await API.get(`/instructor-application/${userId}`, { withCredentials: true });
            if (appData) {
              setFormData({
                personalDetails:      { ...appData.personalDetails },
                identityVerification: { ...appData.identityVerification, idFront: null, idBack: null },
                vehicleInfo:          { ...appData.vehicleInfo, insuranceDocument: null },
                experience:           { ...appData.experience, certifications: [] },
              });
            }
          } catch { /* ignore */ }
        }
      } catch { /* ignore */ }
      finally { setIsLoading(false); }
    })();
  }, [userId]);

  /* ── change handler ─────────────────────── */
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => {
      const next = deepCopyWithFiles(prev);
      if (type === 'file') {
        if (name === 'certifications') { next.experience.certifications = Array.from(files); return next; }
        const file = files[0];
        if (!file) return next;
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) { toast.error(`Invalid file type for ${name}`); return next; }
        if (file.size > 5 * 1024 * 1024) { toast.error(`File too large for ${name} (max 5 MB)`); return next; }
        if (name === 'idFront')           next.identityVerification.idFront = file;
        else if (name === 'idBack')       next.identityVerification.idBack  = file;
        else if (name === 'insuranceDocument') next.vehicleInfo.insuranceDocument = file;
        return next;
      }
      const parts = name.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = type === 'checkbox' ? checked : value;
      return next;
    });
  };

  /* ── validation ─────────────────────────── */
  const validateStep = (s) => {
    if (!showValidation) return true;
    const e = {};
    if (s === 0) {
      if (!formData.personalDetails.fullName?.trim()) e['pd.fullName'] = 'Required';
      if (!formData.personalDetails.email?.trim()) e['pd.email'] = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalDetails.email)) e['pd.email'] = 'Invalid email';
      if (!formData.personalDetails.phone?.trim()) e['pd.phone'] = 'Required';
      if (!formData.personalDetails.dateOfBirth) e['pd.dob'] = 'Required';
    }
    if (s === 1) {
      if (!formData.identityVerification.idType) e['iv.type'] = 'Required';
      if (!formData.identityVerification.idNumber?.trim()) e['iv.number'] = 'Required';
    }
    if (s === 2) {
      if (!formData.vehicleInfo.make?.trim())  e['vi.make']  = 'Required';
      if (!formData.vehicleInfo.model?.trim()) e['vi.model'] = 'Required';
      if (!formData.vehicleInfo.year)          e['vi.year']  = 'Required';
      if (!formData.vehicleInfo.licensePlate?.trim()) e['vi.plate'] = 'Required';
    }
    if (s === 3) {
      if (!formData.experience.yearsOfExperience) e['ex.years'] = 'Required';
      if (!formData.experience.teachingExperience?.trim()) e['ex.teaching'] = 'Required';
    }
    if (s === 4) {
      if (!formData.experience.noConviction) e['ex.conv']   = 'Required';
      if (!formData.experience.agreeInfo)    e['ex.info']   = 'Required';
      if (!formData.experience.agreePolicy)  e['ex.policy'] = 'Required';
      if (!formData.experience.digitalSign?.trim()) e['ex.sign'] = 'Required';
      else if (formData.experience.digitalSign.trim() !== formData.personalDetails.fullName.trim())
        e['ex.sign'] = 'Must match your full name';
    }
    setErrors(e);
    if (Object.keys(e).length) { toast.error('Please complete all required fields'); return false; }
    return true;
  };

  const nextStep = () => {
    setShowValidation(true);
    if (!validateStep(step)) return;
    if (step === STEPS.length - 2) {
      setReviewData({
        personalDetails:      formData.personalDetails,
        identityVerification: { ...formData.identityVerification, idFront: formData.identityVerification.idFront?.name || 'Not uploaded', idBack: formData.identityVerification.idBack?.name || 'Not uploaded' },
        vehicleInfo:          { ...formData.vehicleInfo, insuranceDocument: formData.vehicleInfo.insuranceDocument?.name || 'Not uploaded' },
        experience:           { ...formData.experience, certifications: formData.experience.certifications.map((c) => c?.name || '—') },
      });
    }
    setStep((p) => Math.min(p + 1, STEPS.length - 1));
  };

  const prevStep = () => setStep((p) => Math.max(p - 1, 0));

  /* ── submit ─────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== STEPS.length - 1) return;
    setShowValidation(true);
    for (let i = 0; i < STEPS.length - 1; i++) { if (!validateStep(i)) return; }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('userId', userId);
      fd.append('personalDetails',      JSON.stringify(formData.personalDetails));
      fd.append('identityVerification', JSON.stringify({ idType: formData.identityVerification.idType, idNumber: formData.identityVerification.idNumber }));
      fd.append('vehicleInfo',          JSON.stringify({ make: formData.vehicleInfo.make, model: formData.vehicleInfo.model, year: formData.vehicleInfo.year, licensePlate: formData.vehicleInfo.licensePlate }));
      fd.append('experience',           JSON.stringify({ yearsOfExperience: formData.experience.yearsOfExperience, previousEmployer: formData.experience.previousEmployer, teachingExperience: formData.experience.teachingExperience, noConviction: formData.experience.noConviction, agreeInfo: formData.experience.agreeInfo, agreePolicy: formData.experience.agreePolicy, digitalSign: formData.experience.digitalSign }));
      if (formData.identityVerification.idFront instanceof File)     fd.append('idFront', formData.identityVerification.idFront);
      if (formData.identityVerification.idBack instanceof File)      fd.append('idBack',  formData.identityVerification.idBack);
      if (formData.vehicleInfo.insuranceDocument instanceof File)    fd.append('insuranceDocument', formData.vehicleInfo.insuranceDocument);
      formData.experience.certifications.forEach((c) => { if (c instanceof File) fd.append('certifications', c); });

      const token = localStorage.getItem('token');
      await API.post('/instructor-application/submit', fd, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setStatus('pending');
      toast.success('Application submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── loading ────────────────────────────── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-[#00d4df]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  /* ── status screens ─────────────────────── */
  if (status) {
    const isPending = status === 'pending';
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-6">
        <div className="bg-[#0f1829] border border-white/10 rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isPending ? 'bg-[#00d4df]/10 border border-[#00d4df]/25' : 'bg-red-500/10 border border-red-500/25'}`}>
            {isPending ? (
              <svg className="w-8 h-8 text-[#00d4df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>

          <h2 className={`text-2xl font-bold mb-3 ${isPending ? 'text-[#00d4df]' : 'text-red-400'}`}>
            {isPending ? 'Application Submitted' : 'Application Rejected'}
          </h2>

          {isPending ? (
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Thank you! Our team will review your application and get back to you soon.
            </p>
          ) : (
            <>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-left">
                <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Reason for Rejection</p>
                <p className="text-gray-300 text-sm">{rejectionReason || 'No reason provided.'}</p>
              </div>
              <p className="text-gray-400 text-sm mb-8">Please address the concerns above and resubmit your application.</p>
            </>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setStatus(null); setStep(0); }}
              className="w-full bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all"
            >
              {isPending ? 'Edit Application' : 'Edit & Resubmit'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-semibold py-3 rounded-xl transition-all hover:bg-white/5"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── main form ──────────────────────────── */
  const progress = ((step) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#080d1a] py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Instructor Application</h1>
          <p className="text-gray-400 mt-1 text-sm">Complete all steps to apply as a driving instructor</p>
        </div>

        {/* Step bar */}
        <div className="bg-[#0f1829] border border-white/8 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#00d4df] text-sm font-semibold">{STEPS[step]}</span>
            <span className="text-gray-400 text-sm">Step {step + 1} of {STEPS.length}</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className="flex flex-col items-center gap-1 group"
                title={s}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step  ? 'bg-[#00d4df] text-[#080d1a]' :
                  i === step ? 'bg-[#00d4df]/15 border-2 border-[#00d4df] text-[#00d4df]' :
                               'bg-white/8 text-gray-500'
                }`}>
                  {i < step ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : i + 1}
                </div>
                <span className="hidden md:block text-xs text-gray-500 group-hover:text-gray-300 transition-colors whitespace-nowrap">{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-[#0f1829] border border-white/8 rounded-2xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); if (step === STEPS.length - 1) handleSubmit(e); }} className="space-y-5">

            {/* Step 0 — Personal Details */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Full Name *',       name: 'personalDetails.fullName',    type: 'text',  errKey: 'pd.fullName', ph: 'John Smith' },
                  { label: 'Email Address *',   name: 'personalDetails.email',       type: 'email', errKey: 'pd.email',    ph: 'you@example.com' },
                  { label: 'Phone Number *',    name: 'personalDetails.phone',       type: 'tel',   errKey: 'pd.phone',    ph: '+61 4XX XXX XXX' },
                  { label: 'Date of Birth *',   name: 'personalDetails.dateOfBirth', type: 'date',  errKey: 'pd.dob',      ph: '' },
                ].map(({ label, name, type, errKey, ph }) => (
                  <div key={name}>
                    <label className={labelCls}>{label}</label>
                    <input
                      type={type} name={name} placeholder={ph}
                      value={name.split('.').reduce((o, k) => o?.[k], formData)}
                      onChange={handleChange}
                      className={inputCls(errors[errKey])}
                    />
                    <FieldError msg={errors[errKey]} />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address</label>
                  <textarea name="personalDetails.address" rows={2} placeholder="123 Main St, Sydney NSW 2000"
                    value={formData.personalDetails.address} onChange={handleChange}
                    className={`${inputCls(false)} resize-none`}
                  />
                </div>
              </div>
            )}

            {/* Step 1 — Identity */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>ID Type *</label>
                  <select name="identityVerification.idType" value={formData.identityVerification.idType} onChange={handleChange}
                    className={`${inputCls(errors['iv.type'])} bg-[#0f1829]`}>
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="nationalId">National ID</option>
                    <option value="drivingLicense">Driving License</option>
                  </select>
                  <FieldError msg={errors['iv.type']} />
                </div>
                <div>
                  <label className={labelCls}>ID Number *</label>
                  <input type="text" name="identityVerification.idNumber" value={formData.identityVerification.idNumber}
                    onChange={handleChange} placeholder="Enter ID number" className={inputCls(errors['iv.number'])} />
                  <FieldError msg={errors['iv.number']} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <UploadZone id="idFront" name="idFront" label="ID Front *" onChange={handleChange} fileName={formData.identityVerification.idFront?.name} />
                  <UploadZone id="idBack"  name="idBack"  label="ID Back *"  onChange={handleChange} fileName={formData.identityVerification.idBack?.name} />
                </div>
              </div>
            )}

            {/* Step 2 — Vehicle */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Car Make *',      name: 'vehicleInfo.make',         errKey: 'vi.make',  ph: 'Toyota' },
                    { label: 'Car Model *',     name: 'vehicleInfo.model',        errKey: 'vi.model', ph: 'Corolla' },
                    { label: 'Year *',          name: 'vehicleInfo.year',         errKey: 'vi.year',  ph: '2020' },
                    { label: 'License Plate *', name: 'vehicleInfo.licensePlate', errKey: 'vi.plate', ph: 'ABC123' },
                  ].map(({ label, name, errKey, ph }) => (
                    <div key={name}>
                      <label className={labelCls}>{label}</label>
                      <input type="text" name={name} placeholder={ph}
                        value={name.split('.').reduce((o, k) => o?.[k], formData)}
                        onChange={handleChange} className={inputCls(errors[errKey])} />
                      <FieldError msg={errors[errKey]} />
                    </div>
                  ))}
                </div>
                <UploadZone id="insuranceDocument" name="insuranceDocument" label="Insurance Document (Optional)"
                  onChange={handleChange} fileName={formData.vehicleInfo.insuranceDocument?.name} />
              </div>
            )}

            {/* Step 3 — Experience */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Years of Experience *</label>
                    <input type="number" name="experience.yearsOfExperience" min="0"
                      value={formData.experience.yearsOfExperience} onChange={handleChange}
                      placeholder="e.g. 5" className={inputCls(errors['ex.years'])} />
                    <FieldError msg={errors['ex.years']} />
                  </div>
                  <div>
                    <label className={labelCls}>Previous Employer</label>
                    <input type="text" name="experience.previousEmployer"
                      value={formData.experience.previousEmployer} onChange={handleChange}
                      placeholder="Company name" className={inputCls(false)} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Teaching Style / Experience *</label>
                  <textarea name="experience.teachingExperience" rows={4}
                    value={formData.experience.teachingExperience} onChange={handleChange}
                    placeholder="Describe your teaching approach and experience…"
                    className={`${inputCls(errors['ex.teaching'])} resize-none`} />
                  <FieldError msg={errors['ex.teaching']} />
                </div>
                <UploadZone id="certifications" name="certifications" label="Certifications (Optional, multiple)"
                  onChange={handleChange}
                  fileName={formData.experience.certifications.length ? `${formData.experience.certifications.length} file(s) selected` : undefined}
                  accept=".jpg,.jpeg,.png,.pdf" />
              </div>
            )}

            {/* Step 4 — Consent */}
            {step === 4 && (
              <div className="space-y-5">
                {[
                  { name: 'experience.noConviction', errKey: 'ex.conv',   label: 'I declare that I have no disqualifying convictions in the last 5 years.' },
                  { name: 'experience.agreeInfo',    errKey: 'ex.info',   label: 'I certify that all information provided is accurate and truthful.' },
                  { name: 'experience.agreePolicy',  errKey: 'ex.policy', label: "I agree to Learn2Drive's Terms of Service and Privacy Policy." },
                ].map(({ name, errKey, label }) => {
                  const val = name.split('.').reduce((o, k) => o?.[k], formData);
                  return (
                    <div key={name} className={`flex items-start gap-3 p-4 rounded-xl border ${errors[errKey] ? 'border-red-500/30 bg-red-500/5' : 'border-white/8 bg-white/[0.02]'}`}>
                      <input type="checkbox" name={name} checked={val} onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-[#00d4df] flex-shrink-0" />
                      <label className="text-gray-300 text-sm leading-relaxed cursor-pointer">{label}</label>
                    </div>
                  );
                })}
                <div>
                  <label className={labelCls}>Digital Signature (type your full name) *</label>
                  <input type="text" name="experience.digitalSign"
                    value={formData.experience.digitalSign} onChange={handleChange}
                    placeholder={formData.personalDetails.fullName || 'Your full name'}
                    className={`${inputCls(errors['ex.sign'])} font-serif text-lg`} />
                  <FieldError msg={errors['ex.sign']} />
                  <p className="text-gray-500 text-xs mt-1">Must match exactly: "{formData.personalDetails.fullName}"</p>
                </div>
              </div>
            )}

            {/* Step 5 — Review */}
            {step === 5 && (
              <div className="space-y-6">
                <p className="text-gray-400 text-sm">Please review your application before submitting.</p>
                {reviewData ? (
                  <>
                    {[
                      { title: 'Personal Details', fields: [
                        ['Full Name', reviewData.personalDetails?.fullName],
                        ['Email', reviewData.personalDetails?.email],
                        ['Phone', reviewData.personalDetails?.phone],
                        ['Date of Birth', reviewData.personalDetails?.dateOfBirth],
                        ['Address', reviewData.personalDetails?.address],
                      ]},
                      { title: 'Identity Verification', fields: [
                        ['ID Type', reviewData.identityVerification?.idType],
                        ['ID Number', reviewData.identityVerification?.idNumber],
                        ['ID Front', reviewData.identityVerification?.idFront],
                        ['ID Back', reviewData.identityVerification?.idBack],
                      ]},
                      { title: 'Vehicle Information', fields: [
                        ['Make', reviewData.vehicleInfo?.make],
                        ['Model', reviewData.vehicleInfo?.model],
                        ['Year', reviewData.vehicleInfo?.year],
                        ['License Plate', reviewData.vehicleInfo?.licensePlate],
                        ['Insurance Doc', reviewData.vehicleInfo?.insuranceDocument],
                      ]},
                      { title: 'Experience', fields: [
                        ['Years Experience', reviewData.experience?.yearsOfExperience],
                        ['Previous Employer', reviewData.experience?.previousEmployer],
                        ['Teaching Experience', reviewData.experience?.teachingExperience],
                      ]},
                    ].map(({ title, fields }) => (
                      <div key={title}>
                        <p className="text-[#00d4df] text-xs font-semibold uppercase tracking-wider mb-3">{title}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {fields.map(([k, v]) => <ReviewField key={k} label={k} value={v} />)}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No review data available.</p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-white/8">
              <button type="button" onClick={prevStep} disabled={step === 0}
                className="flex items-center gap-2 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-semibold px-5 py-2.5 rounded-xl transition-all hover:bg-white/5 text-sm disabled:opacity-30 disabled:cursor-not-allowed">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                Previous
              </button>

              {step < STEPS.length - 1 ? (
                <button type="button" onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all hover:scale-[1.02] text-sm">
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              ) : (
                <button type="submit" disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all hover:scale-[1.02] text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                  {isSubmitting ? (
                    <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Submitting…</>
                  ) : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
