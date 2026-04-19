import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import googlePng from '../../assets/google.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await API.post('/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    try {
      window.location.href = `${API.defaults.baseURL}/auth/google`;
    } catch {
      toast.error('Failed to initiate Google login');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#080d1a] flex overflow-hidden pt-16">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />

      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080d1a] via-[#0a1020] to-[#0f1829]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d4df]/6 rounded-full blur-[120px] pointer-events-none" />

        {/* spacer where logo was — navbar handles it */}
        <div />

        {/* Center content */}
        <div className="relative space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              Your road to
              <br />
              <span className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] bg-clip-text text-transparent">
                independence
              </span>
              <br />
              starts here.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Connect with certified instructors and start your driving journey today.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Book lessons in real-time',
              'Certified & vetted instructors',
              'Transparent pricing, always',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#00d4df]/15 border border-[#00d4df]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#00d4df]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative bg-white/[0.04] border border-white/8 rounded-2xl p-5">
          <p className="text-gray-300 text-sm italic leading-relaxed">
            "I passed my test on the first try thanks to my instructor. The booking process was so simple!"
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Emma" className="w-8 h-8 rounded-full ring-2 ring-[#00d4df]/30" />
            <div>
              <div className="text-white text-xs font-semibold">Emma R.</div>
              <div className="text-[#00d4df] text-xs">North Sydney</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-400 mt-1 text-sm">Sign in to continue your journey</p>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                disabled={isLoading}
                required
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-[#00d4df] text-xs hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all disabled:opacity-50 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-[#00d4df]" disabled={isLoading} />
              <label htmlFor="remember" className="text-sm text-gray-400">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,212,223,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in…
                </>
              ) : 'Sign in'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#00d4df] font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
