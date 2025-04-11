import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      const res = await API.post('/users/register', { name, email, password, confirmPassword });
      toast.success('Registered successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
      
      <main className="flex justify-center items-center h-screen bg-[#c6efff]">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] max-w-[1000px]">
          {/* Image Section */}
          <section className="hidden md:block flex-1">
            <img src={registerSvg} alt="Register illustration" className="w-full h-auto" />
          </section>

          {/* Form Section */}
          <section className="flex-1 bg-white p-8 rounded-lg max-w-[460px]">
            <h1 className="text-2xl font-semibold">Create Your</h1>
            <h1 className="text-4xl font-extrabold text-[#2e667d] mb-4">Learn2Drive Account</h1>

            {/* Social Login */}
            <div className="flex flex-col gap-4 mb-4">
              <button className="bg-white flex items-center justify-center w-full py-2.5 rounded-md shadow-md border-none cursor-pointer text-base">
                <img src={googlePng} alt="Google Logo" className="w-5 h-5 mr-2.5" />
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <hr className="flex-1 border border-gray-300" />
              <span className="px-2 text-gray-600">OR</span>
              <hr className="flex-1 border border-gray-300" />
            </div>

            {/* Form */}
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="mb-1 text-[#333] font-medium">Profile Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-1 text-[#333] font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-1 text-[#333] font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="confirmPassword" className="mb-1 text-[#333] font-medium">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  required
                />
              </div>

              <p className="text-xs text-center text-gray-700 leading-snug mb-4">
                By creating an account, you agree to the
                <span className="underline text-[#2e667d] mx-1 cursor-pointer">Terms of Use</span> and
                <span className="underline text-[#2e667d] ml-1 cursor-pointer">Privacy Policy</span>.
              </p>

              <button type="submit" className="py-3 bg-[#2e667d] text-white text-base font-bold rounded-md cursor-pointer text-center">
                Sign up
              </button>

              <p className="text-center text-sm mt-4">
                Already have an account?
                <Link to="/login" className="text-[#2e667d] no-underline ml-1">Log in</Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
