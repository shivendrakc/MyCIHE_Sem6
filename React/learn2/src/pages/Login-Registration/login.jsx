import React from "react";
import loginSvg from '../../assets/login.svg'; 
import googlePng from '../../assets/google.png'; 
import { Link } from 'react-router-dom'; 

export default function LoginPage() {
  return (
    <main className="flex justify-center items-center h-screen bg-[#c6efff]">
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
            <button className="bg-white flex items-center justify-center w-full py-2.5 rounded-md shadow-md border-none cursor-pointer text-base">
              <img src={googlePng} alt="Google Logo" className="w-5 h-5 mr-2.5" />
              Login with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <hr className="flex-1 border border-gray-300" />
            <span className="px-2 text-gray-600">OR</span>
            <hr className="flex-1 border border-gray-300" />
          </div>

          {/* Form */}
          <form className="flex flex-col">
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1 text-[#333] font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2.5 border border-[#ccc] rounded-md text-base"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="password" className="mb-1 text-[#333] font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="p-2.5 border border-[#ccc] rounded-md text-base"
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-5">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" /> Remember me
              </label>
              <a href="#" className="text-[#2e667d] no-underline">Forgot password?</a>
            </div>

            <button type="submit" className="py-3 bg-[#2e667d] text-white text-base font-bold rounded-md cursor-pointer text-center">
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?
              <Link to="/register" className="text-[#2e667d] no-underline ml-1">Register</Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}