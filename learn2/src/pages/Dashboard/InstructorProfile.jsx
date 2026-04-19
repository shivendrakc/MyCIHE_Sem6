import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const inputCls = 'w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all';
const labelCls = 'block text-sm font-medium text-gray-300 mb-1.5';

export default function InstructorProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState({
    bio: '', suburb: '', method: '', experience: '', hourlyRate: '', nationality: '',
    car: { make: '', model: '', year: '', transmission: '' },
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { setError('Please log in to access this page'); setLoading(false); return; }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/instructors/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data) {
        setProfile({
          bio: data.bio || '',
          suburb: data.suburb || '',
          method: data.method || '',
          experience: data.experience || '',
          hourlyRate: data.hourlyRate || '',
          nationality: data.nationality || '',
          car: { make: data.car?.make || '', model: data.car?.model || '', year: data.car?.year || '', transmission: data.car?.transmission || '' },
        });
        setPreviewImage(data.profileImage
          ? `${BACKEND_URL}${data.profileImage}`
          : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'
        );
      }
    } catch (err) {
      if (err.response?.status === 401) setError('Session expired. Please log in again.');
      else setError(err.response?.data?.message || 'Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('car.')) {
      const field = name.split('.')[1];
      setProfile(prev => ({ ...prev, car: { ...prev.car, [field]: value } }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setProfileImage(file); setPreviewImage(URL.createObjectURL(file)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) { setError('Please log in to update your profile'); return; }
    const required = { nationality: 'Nationality', suburb: 'Suburb', 'car.year': 'Car year', 'car.model': 'Car model', 'car.make': 'Car make', method: 'Teaching method', experience: 'Years of experience', hourlyRate: 'Hourly rate' };
    for (const [field, label] of Object.entries(required)) {
      if (field.startsWith('car.')) { if (!profile.car[field.split('.')[1]]) { setError(`${label} is required`); return; } }
      else if (!profile[field]) { setError(`${label} is required`); return; }
    }
    try {
      setSaving(true); setError(null); setSuccess(null);
      const fd = new FormData();
      fd.append('bio', profile.bio || '');
      fd.append('suburb', profile.suburb);
      fd.append('method', profile.method);
      fd.append('experience', profile.experience);
      fd.append('hourlyRate', profile.hourlyRate);
      fd.append('nationality', profile.nationality);
      fd.append('car.make', profile.car.make);
      fd.append('car.model', profile.car.model);
      fd.append('car.year', profile.car.year);
      fd.append('car.transmission', profile.car.transmission || '');
      if (profileImage) fd.append('profileImage', profileImage);
      const { data } = await axios.put(`${BACKEND_URL}/api/instructors/profile`, fd, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully');
      if (data.profileImage) setPreviewImage(`${BACKEND_URL}${data.profileImage}`);
    } catch (err) {
      if (err.response?.status === 401) setError('Session expired. Please log in again.');
      else setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-2 border-[#00d4df]/30 border-t-[#00d4df] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-6">Instructor Profile</h1>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {error}
          <button onClick={() => setError(null)} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {success}
          <button onClick={() => setSuccess(null)} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profile photo */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={previewImage || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-[#00d4df]/30"
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00d4df] flex items-center justify-center cursor-pointer hover:bg-[#00d4df]/80 transition-colors"
            >
              <svg className="w-4 h-4 text-[#080d1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          <p className="text-gray-500 text-xs">Click the camera icon to upload a new photo</p>
        </div>

        {/* Basic Info */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Suburb</label>
              <input type="text" name="suburb" value={profile.suburb} onChange={handleInputChange} className={inputCls} placeholder="e.g. Sydney CBD" />
            </div>
            <div>
              <label className={labelCls}>Nationality</label>
              <input type="text" name="nationality" value={profile.nationality} onChange={handleInputChange} className={inputCls} placeholder="e.g. Australian" required />
            </div>
            <div>
              <label className={labelCls}>Teaching Method</label>
              <select name="method" value={profile.method} onChange={handleInputChange} className={inputCls}>
                <option value="">Select method</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Years of Experience</label>
              <input type="number" name="experience" value={profile.experience} onChange={handleInputChange} min="0" className={inputCls} placeholder="e.g. 5" />
            </div>
            <div>
              <label className={labelCls}>Hourly Rate ($)</label>
              <input type="number" name="hourlyRate" value={profile.hourlyRate} onChange={handleInputChange} min="0" className={inputCls} placeholder="e.g. 60" />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell students about your teaching experience and approach…"
              className={inputCls + ' resize-none'}
            />
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Car Make</label>
              <input type="text" name="car.make" value={profile.car.make} onChange={handleInputChange} className={inputCls} placeholder="e.g. Toyota" />
            </div>
            <div>
              <label className={labelCls}>Car Model</label>
              <input type="text" name="car.model" value={profile.car.model} onChange={handleInputChange} className={inputCls} placeholder="e.g. Corolla" required />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <input type="text" name="car.year" value={profile.car.year} onChange={handleInputChange} className={inputCls} placeholder="e.g. 2020" required />
            </div>
            <div>
              <label className={labelCls}>Transmission</label>
              <select name="car.transmission" value={profile.car.transmission} onChange={handleInputChange} className={inputCls}>
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3 px-8 rounded-xl hover:shadow-[0_0_30px_rgba(0,212,223,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
