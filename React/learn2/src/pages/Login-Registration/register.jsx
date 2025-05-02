import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerSvg from '../../assets/login.svg'; // use the same or a different illustration
import googlePng from '../../assets/google.png';
import API from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await API.post('/users/register', { name, email, password, confirmPassword });
      toast.success('Registration successful!');
      
      // Wait for 2 seconds before redirecting to show the success message
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#CDF3FF]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover style={{ marginTop: '80px' }} />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] max-w-[1000px]">
          {/* Image Section */}
          <section className="hidden md:block flex-1">
            <img src={registerSvg} alt="Register illustration" className="w-full h-auto" />
          </section>

          {/* Form Section */}
          <section className="flex-1 bg-white p-5 rounded-lg max-w-[450px]">
            <h1 className="text-xl font-semibold">Create Your</h1>
            <h1 className="text-3xl font-extrabold text-[#2e667d] mb-3">Learn2Drive Account</h1>

            {/* Social Login */}
            <div className="flex flex-col gap-3 mb-3">
              <button className="bg-white flex items-center justify-center w-full py-2 rounded-md shadow-md border-none cursor-pointer text-sm">
                <img src={googlePng} alt="Google Logo" className="w-4 h-4 mr-2" />
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-3">
              <hr className="flex-1 border border-gray-300" />
              <span className="px-2 text-gray-600 text-sm">OR</span>
              <hr className="flex-1 border border-gray-300" />
            </div>

            {/* Form */}
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <label htmlFor="name" className="mb-0.5 text-[#333] font-medium text-sm">Profile Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 border border-[#ccc] rounded-md text-sm"
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="mb-0.5 text-[#333] font-medium text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border border-[#ccc] rounded-md text-sm"
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="password" className="mb-0.5 text-[#333] font-medium text-sm">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border border-[#ccc] rounded-md text-sm"
                  required
                />
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="confirmPassword" className="mb-0.5 text-[#333] font-medium text-sm">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2 border border-[#ccc] rounded-md text-sm"
                  required
                />
              </div>

              <p className="text-xs text-center text-gray-700 leading-snug mb-2">
                By creating an account, you agree to the
                <span className="underline text-[#2e667d] mx-1 cursor-pointer">Terms of Use</span> and
                <span className="underline text-[#2e667d] ml-1 cursor-pointer">Privacy Policy</span>.
              </p>

              <button 
                type="submit" 
                className="py-2 bg-[#2e667d] text-white text-sm font-bold rounded-md cursor-pointer text-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Signing up...' : 'Sign up'}
              </button>

              <p className="text-center text-xs mt-2">
                Already have an account?
                <Link to="/login" className="text-[#2e667d] no-underline ml-1">Log in</Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
