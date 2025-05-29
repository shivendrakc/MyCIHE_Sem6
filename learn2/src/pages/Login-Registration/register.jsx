import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import registerSvg from '../../assets/login.svg'; // use the same or a different illustration
import googlePng from '../../assets/google.png';
import API from '../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await API.post('/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      toast.success('Registration successful!');
      
      // Store the token and user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.user));
      
      // Wait for 2 seconds before redirecting to show the success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      toast.error(errorMsg);
      
      // Set specific field errors if provided by the backend
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    try {
      // Get the base URL from the API configuration
      const baseURL = API.defaults.baseURL;
      console.log('Redirecting to Google OAuth:', `${baseURL}/auth/google`);
      
      // Redirect to backend Google OAuth endpoint
      window.location.href = `${baseURL}/auth/google`;
    } catch (err) {
      toast.error('Failed to initiate Google signup');
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
              <button 
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="bg-white flex items-center justify-center w-full py-2 rounded-md shadow-md border-none cursor-pointer text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={googlePng} alt="Google Logo" className="w-4 h-4 mr-2" />
                {isLoading ? 'Connecting...' : 'Sign up with Google'}
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
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`p-2 border ${errors.name ? 'border-red-500' : 'border-[#ccc]'} rounded-md text-sm`}
                  disabled={isLoading}
                  required
                />
                {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="mb-0.5 text-[#333] font-medium text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`p-2 border ${errors.email ? 'border-red-500' : 'border-[#ccc]'} rounded-md text-sm`}
                  disabled={isLoading}
                  required
                />
                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="password" className="mb-0.5 text-[#333] font-medium text-sm">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`p-2 border ${errors.password ? 'border-red-500' : 'border-[#ccc]'} rounded-md text-sm`}
                  disabled={isLoading}
                  required
                />
                {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
              </div>

              <div className="flex flex-col mb-2">
                <label htmlFor="confirmPassword" className="mb-0.5 text-[#333] font-medium text-sm">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#ccc]'} rounded-md text-sm`}
                  disabled={isLoading}
                  required
                />
                {errors.confirmPassword && <span className="text-red-500 text-xs mt-1">{errors.confirmPassword}</span>}
              </div>

              <p className="text-xs text-center text-gray-700 leading-snug mb-2">
                By creating an account, you agree to the
                <span className="underline text-[#2e667d] mx-1 cursor-pointer">Terms of Use</span> and
                <span className="underline text-[#2e667d] ml-1 cursor-pointer">Privacy Policy</span>.
              </p>

              <button 
                type="submit" 
                className="py-2 bg-[#2e667d] text-white text-sm font-bold rounded-md cursor-pointer text-center hover:bg-[#245566] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
