import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googlePng from '../../assets/google.png';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Minimum 6 characters';
    if (!formData.confirmPassword) e.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const res = await API.post('/users/register', formData);
      toast.success('Account created!');
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    try {
      window.location.href = `${API.defaults.baseURL}/auth/google`;
    } catch {
      toast.error('Failed to initiate Google signup');
      setIsLoading(false);
    }
  };

  const strengthLevel = () => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strength = strengthLevel();
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-[#00d4df]', 'bg-green-400'];

  const EyeIcon = ({ show, toggle }) => (
    <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  );

  return (
    <div className="h-screen bg-[#080d1a] flex overflow-hidden pt-16">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080d1a] via-[#0a1020] to-[#0f1829]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4df]/6 rounded-full blur-[120px] pointer-events-none" />

        <div />

        <div className="relative space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Join thousands of
              <br />
              <span className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] bg-clip-text text-transparent">
                confident drivers
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Create your account and get matched with a certified instructor in minutes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: '200+', label: 'Instructors' },
              { val: '2,334+', label: 'Learners' },
              { val: '98%', label: 'Pass Rate' },
              { val: '5★', label: 'Avg Rating' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/[0.04] border border-white/8 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">{val}</div>
                <div className="text-gray-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-white/[0.04] border border-white/8 rounded-2xl p-5">
          <p className="text-gray-300 text-sm italic leading-relaxed">
            "Found my instructor in minutes. The platform is so easy to use, and I felt confident from lesson one."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="James" className="w-8 h-8 rounded-full ring-2 ring-[#00d4df]/30" />
            <div>
              <div className="text-white text-xs font-semibold">James K.</div>
              <div className="text-[#00d4df] text-xs">Sydney CBD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-6 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white">Create your account</h2>
            <p className="text-gray-400 mt-1 text-sm">Start your driving journey today</p>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 text-white text-sm font-medium py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            <img src={googlePng} alt="Google" className="w-5 h-5" />
            {isLoading ? 'Connecting…' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-gray-500 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
              <input
                type="text" name="name" value={formData.name} onChange={handleChange}
                placeholder="John Smith" disabled={isLoading} required
                className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50`}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input
                type="email" name="email" value={formData.email} onChange={handleChange}
                placeholder="you@example.com" disabled={isLoading} required
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange}
                  placeholder="••••••••" disabled={isLoading} required
                  className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50`}
                />
                <EyeIcon show={showPassword} toggle={() => setShowPassword(!showPassword)} />
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-white/10'}`} />
                    ))}
                  </div>
                  <p className={`text-xs ${strength >= 4 ? 'text-[#00d4df]' : strength >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                  placeholder="••••••••" disabled={isLoading} required
                  className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/10'} text-white placeholder-gray-500 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50`}
                />
                <EyeIcon show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <p className="text-xs text-gray-500 text-center">
              By creating an account you agree to our{' '}
              <span className="text-[#00d4df] cursor-pointer hover:underline">Terms of Use</span>
              {' '}and{' '}
              <span className="text-[#00d4df] cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            <button
              type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,212,223,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account…
                </>
              ) : 'Create account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-[#00d4df] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
