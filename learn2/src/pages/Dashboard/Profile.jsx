import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const inputCls = 'w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all';

export default function Profile() {
  const [user, setUser] = useState({ name: '', email: '', oldPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prev => ({ ...prev, name: res.data.name || '', email: res.data.email || '' }));
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          navigate('/login');
        } else {
          setError('Failed to load profile data');
        }
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/users/profile', { name: user.name, email: user.email }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('success', 'Profile updated successfully');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, name: res.data.user.name, email: res.data.user.email }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (user.newPassword !== user.confirmPassword) { setError('New passwords do not match'); return; }
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/profile', { oldPassword: user.oldPassword, newPassword: user.newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showToast('success', 'Password updated successfully');
      setUser(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
      setShowPasswordFields(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  const EyeBtn = ({ show, toggle }) => (
    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  );

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>

      {/* Toast */}
      {toast && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm border flex justify-between items-center ${
          toast.type === 'success'
            ? 'bg-green-500/10 border-green-500/30 text-green-400'
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {toast.msg}
          <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100 ml-4">✕</button>
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex justify-between">
          {error}
          <button onClick={() => setError('')} className="opacity-60 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Basic Info Card */}
      <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6 mb-4">
        <h2 className="text-white font-semibold mb-4">Basic Information</h2>
        <form onSubmit={handleBasicInfoSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} required className={inputCls} placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} required className={inputCls} placeholder="you@example.com" />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-2.5 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.25)] transition-all text-sm"
          >
            Update Information
          </button>
        </form>
      </div>

      {/* Password Card */}
      <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Password Settings</h2>
          <button
            onClick={() => { setShowPasswordFields(!showPasswordFields); setError(''); }}
            className="text-sm text-[#00d4df] hover:underline"
          >
            {showPasswordFields ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {!showPasswordFields && (
          <p className="text-gray-500 text-sm">Click "Change Password" to update your password.</p>
        )}

        {showPasswordFields && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Current password</label>
              <div className="relative">
                <input type={showOld ? 'text' : 'password'} name="oldPassword" value={user.oldPassword} onChange={handleChange} required className={`${inputCls} pr-11`} placeholder="••••••••" />
                <EyeBtn show={showOld} toggle={() => setShowOld(!showOld)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">New password</label>
              <div className="relative">
                <input type={showNew ? 'text' : 'password'} name="newPassword" value={user.newPassword} onChange={handleChange} required className={`${inputCls} pr-11`} placeholder="••••••••" />
                <EyeBtn show={showNew} toggle={() => setShowNew(!showNew)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm new password</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required className={`${inputCls} pr-11`} placeholder="••••••••" />
                <EyeBtn show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-2.5 px-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.25)] transition-all text-sm"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
