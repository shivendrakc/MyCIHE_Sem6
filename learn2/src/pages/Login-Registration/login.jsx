import React, { useState } from "react";
import loginSvg from '../../assets/login.svg'; 
import googlePng from '../../assets/google.png'; 
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import API from "../../utils/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await API.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid Credentials';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    setIsLoading(true);
    try {
      // Get the base URL from the API configuration
      const baseURL = API.defaults.baseURL;
      console.log('Redirecting to Google OAuth:', `${baseURL}/auth/google`);
      
      // Redirect to backend Google OAuth endpoint
      window.location.href = `${baseURL}/auth/google`;
    } catch (err) {
      console.error('Google login error:', err);
      toast.error('Failed to initiate Google login');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#CDF3FF]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] max-w-[1000px]">
          {/* Image Section */}
          <section className="hidden md:block flex-1">
            <img src={loginSvg} alt="Login illustration" className="w-full h-auto" />
          </section>

          {/* Form Section */}
          <section className="flex-1 bg-white p-8 rounded-lg max-w-[460px]">
            <h1 className="text-2xl font-semibold">Welcome to</h1>
            <h1 className="text-4xl font-extrabold text-[#2e667d] mb-4">Learn2Drive</h1>

            {/* Social Login */}
            <div className="flex flex-col gap-4 mb-4">
              <button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="bg-white flex items-center justify-center w-full py-2.5 rounded-md shadow-md border-none cursor-pointer text-base hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <img src={googlePng} alt="Google Logo" className="w-5 h-5 mr-2.5" />
                {isLoading ? 'Connecting...' : 'Login with Google'}
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
                <label htmlFor="email" className="mb-1 text-[#333] font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-1 text-[#333] font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="p-2.5 border border-[#ccc] rounded-md text-base"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-center text-sm mb-5">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-1" disabled={isLoading} /> Remember me
                </label>
                <a href="#" className="text-[#2e667d] no-underline">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="py-3 bg-[#2e667d] text-white text-base font-bold rounded-md cursor-pointer text-center hover:bg-[#245566] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <p className="text-center text-sm mt-4">
                Don't have an account?
                <Link to="/register" className="text-[#2e667d] no-underline ml-1">Register</Link>
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}