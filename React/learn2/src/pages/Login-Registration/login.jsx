// src/pages/LoginRegistration/LoginPage.jsx (or your preferred path)

import React from 'react';
// Import Link if you intend to link TO the register page later
import { Link } from 'react-router-dom';

// --- Adjust your asset paths here ---
import loginSvg from '../../assets/login.svg'; // Example path
import googlePng from '../../assets/google.png'; // Example path
import facebookPng from '../../assets/facebook.png'; // Example path
// -----------------------------------

function LoginPage() {
  return (
    // .login-page styles: bg-background maps to var(--background-color)
    <div className="bg-background flex justify-center items-center min-h-screen font-sans">
      {/* .auth__login-container styles: Using custom-md breakpoint from config */}
      {/* Added bg-white, rounded-lg, shadow-lg, overflow-hidden based on appearance */}
      <main className="flex items-center justify-center w-[90%] max-w-[1000px] bg-white rounded-lg shadow-lg overflow-hidden">

        {/* .auth__image-container: Hidden by default, shown on custom-md screens */}
        <section className="flex-1  p-8"> {/* Added padding */}
          {/* .auth__image */}
          <img
            src={loginSvg}
            alt="Login illustration"
            className="w-full h-auto block"
          />
        </section>

        {/* .auth__form-container: p-8 = padding: 2rem */}
        <section className="flex-1 bg-white p-8 max-w-[460px] w-full custom-md:max-w-none mx-auto custom-md:mx-0">
          {/* .auth__subtitle: font-size: 24px, font-weight: 600 */}
          <h1 className="text-[24px] font-semibold text-gray-800">Welcome to</h1>
          {/* .auth__title: font-size: 36px, font-weight: 800, color: var(--primary-color), margin-bottom: 1rem */}
          <h1 className="text-[36px] font-extrabold text-primary mb-4">Learn2Drive</h1>

          {/* .auth__social-login: flex-direction: column, gap: 1rem, margin-bottom: 1rem */}
          <div className="flex flex-col gap-4 mb-4">
            {/* .auth__social-btn: using exact padding, radius, shadow */}
            {/* font-size: medium is ~16px. text-gray-800 for #333 */}
            <button className="bg-white flex items-center justify-center w-full p-[10px] rounded-[5px] shadow-custom-social border-none cursor-pointer text-[16px] font-medium text-gray-800 hover:bg-gray-50 transition-colors">
              {/* .auth__social-icon: width/height 20px, margin-right 10px */}
              <img src={googlePng} alt="Google Logo" className="w-[20px] h-[20px] mr-[10px]" />
              Login with Google
            </button>

            <button className="bg-white flex items-center justify-center w-full p-[10px] rounded-[5px] shadow-custom-social border-none cursor-pointer text-[16px] font-medium text-gray-800 hover:bg-gray-50 transition-colors">
              <img src={facebookPng} alt="Facebook Logo" className="w-[20px] h-[20px] mr-[10px]" />
              Login with Facebook
            </button>
          </div>

          {/* .auth__divider */}
          <div className="flex items-center mb-4">
            {/* .auth__divider-line: border: 1px solid #ddd */}
            <hr className="flex-1 border-t border-gray-300" /> {/* border-gray-300 approximates #ddd */}
            {/* .auth__divider-text: padding: 0 10px, color: #666 */}
            <span className="px-[10px] text-gray-600 text-[14px]">OR</span> {/* Added text size for clarity */}
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          {/* .auth__form */}
          <form action="#" className="flex flex-col"> {/* Add onSubmit={...} later */}
            {/* .auth__form-group */}
            <div className="flex flex-col mb-4">
              {/* .auth__label: margin-bottom: 5px, color: #333, font-weight: 500 */}
              <label htmlFor="email" className="mb-[5px] text-gray-800 font-medium text-[14px]"> {/* Using 14px for typical label size */}
                Email
              </label>
              {/* .auth__input: padding: 10px, border: 1px solid #ccc, border-radius: 5px, font-size: 16px */}
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-[10px] border border-gray-300 rounded-[5px] text-[16px] w-full font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-[5px] text-gray-800 font-medium text-[14px]">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="p-[10px] border border-gray-300 rounded-[5px] text-[16px] w-full font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* .auth__options: font-size: 14px, margin-bottom: 20px */}
            <div className="flex justify-between items-center mb-[20px] text-[14px]">
              {/* .auth__checkbox */}
              <label className="flex items-center text-gray-800">
                 {/* .auth__checkbox input: margin-right: 4px - Requires @tailwindcss/forms */}
                <input type="checkbox" className="mr-[4px] rounded text-primary focus:ring-primary border-gray-300" /> Remember me
              </label>
              {/* .auth__forgot-password: color: var(--primary-color), text-decoration: none */}
              <a href="#" className="text-primary no-underline hover:underline">
                Forgot password?
              </a>
            </div>

            {/* .auth__submit-btn: padding: 12px, bg: var(--primary), font-size: 16px, font-weight: bold, radius: 5px */}
            <button
              type="submit"
              className="block w-full p-[12px] bg-primary text-white text-[16px] font-bold border-none rounded-[5px] cursor-pointer text-center no-underline transition-colors hover:bg-[#255568]" // Darker hover state
            >
              Login
            </button>

            {/* .auth__register: font-size: 15px, margin-top: 15px */}
            <p className="text-center text-[15px] mt-[15px] text-gray-800">
              Don't have an account?{' '}
              {/* .auth__register-link: color: var(--primary), text-decoration: none */}
              {/* Replace with React Router <Link> when setting up routes */}
              <Link to="/register" className="text-primary no-underline font-medium hover:underline"> {/* Assumes '/register' route */}
                Register
              </Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}

export default LoginPage;