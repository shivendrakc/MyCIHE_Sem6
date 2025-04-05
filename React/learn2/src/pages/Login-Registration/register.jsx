import React from 'react';
import { Link } from 'react-router-dom';
import googlePng from '../../assets/google.png';
import facebookPng from '../../assets/facebook.png';
import twitterPng from '../../assets/twitter.png';

export default function RegisterPage() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <main className="flex justify-center items-center min-h-screen bg-[#f4f8fb] p-4 md:p-8">
      <div className="bg-white max-w-[600px] w-full flex flex-col items-center p-8 rounded-lg shadow-lg">
        <h1 className="text-[25px] tracking-[0.7px] font-medium text-center mb-6 text-gray-800">
          Sign Up to Enlighten Your Driving Journey
        </h1>

        <div className="flex flex-col items-center gap-2.5 w-full mb-4 md:w-[75%]">
          <button className="bg-white flex items-center justify-center w-full p-[13px] border border-gray-400 rounded-full text-[18px] text-gray-800 font-medium hover:bg-[#bdeaff] hover:border-[#777]">
            <img src={googlePng} alt="Google Logo" className="w-[22px] h-[22px] mr-2.5" />
            Sign up with Google
          </button>
          <button className="bg-white flex items-center justify-center w-full p-[13px] border border-gray-400 rounded-full text-[18px] text-gray-800 font-medium hover:bg-[#bdeaff] hover:border-[#777]">
            <img src={facebookPng} alt="Facebook Logo" className="w-[22px] h-[22px] mr-2.5" />
            Sign up with Facebook
          </button>
          <button className="bg-white flex items-center justify-center w-full p-[13px] border border-gray-400 rounded-full text-[18px] text-gray-800 font-medium hover:bg-[#bdeaff] hover:border-[#777]">
            <img src={twitterPng} alt="Twitter Logo" className="w-[22px] h-[22px] mr-2.5" />
            Sign up with Twitter
          </button>
        </div>

        <div className="flex items-center w-full my-4 md:w-[75%]">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="px-2 text-gray-600 text-sm">OR</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <form className="w-full flex flex-col gap-4 md:w-[75%]">
          <h3 className="text-[15px] text-center font-medium text-gray-800 mb-4">
            Sign Up with Your Email
          </h3>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile-name" className="text-sm font-medium text-gray-800">Profile Name</label>
            <input type="text" id="profile-name" placeholder="Enter your profile name" className="p-[10px] rounded-md bg-white border border-gray-300 text-base" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">Email</label>
            <input type="email" id="email" placeholder="Enter your email" className="p-[10px] rounded-md bg-white border border-gray-300 text-base" />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-800">Password</label>
            <input type="password" id="password" placeholder="Enter your password" className="p-[10px] rounded-md bg-white border border-gray-300 text-base" />
            <p className="text-xs text-gray-600 mt-1">Use 8+ characters with letters, numbers & symbols</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">What's your gender? (Optional)</label>
            <div className="flex flex-wrap gap-4 mt-1">
              <label className="flex items-center text-sm text-gray-700">
                <input type="radio" name="gender" value="Female" className="mr-2" /> Female
              </label>
              <label className="flex items-center text-sm text-gray-700">
                <input type="radio" name="gender" value="Male" className="mr-2" /> Male
              </label>
              <label className="flex items-center text-sm text-gray-700">
                <input type="radio" name="gender" value="Non-binary" className="mr-2" /> Non-binary
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">Date of Birth</label>
            <div className="flex flex-wrap gap-4 mt-1">
              <select id="dob-month" defaultValue="" className="flex-grow p-[10px] rounded-md bg-white border border-gray-300 min-w-[80px]">
                <option value="" disabled>Month</option>
                {["January","February","March","April","May","June","July","August","September","October","November","December"].map(month => <option key={month}>{month}</option>)}
              </select>
              <select id="dob-day" defaultValue="" className="flex-grow p-[10px] rounded-md bg-white border border-gray-300 min-w-[80px]">
                <option value="" disabled>Day</option>
                {days.map(day => <option key={day}>{day}</option>)}
              </select>
              <select id="dob-year" defaultValue="" className="flex-grow p-[10px] rounded-md bg-white border border-gray-300 min-w-[80px]">
                <option value="" disabled>Year</option>
                {years.map(year => <option key={year}>{year}</option>)}
              </select>
            </div>
          </div>

          <label className="text-sm flex items-center text-gray-800">
            <input type="checkbox" className="mr-2" /> Share my registration data for marketing purposes
          </label>

          <p className="text-xs text-center text-gray-700">
            By creating an account, you agree to the <span className="underline text-[#2e667d] cursor-pointer">Terms of Use</span> and <span className="underline text-[#2e667d] cursor-pointer">Privacy Policy</span>.
          </p>

          <button type="submit" className="p-3 bg-[#2e667d] text-white font-bold text-base rounded-md hover:bg-[#255568]">
            Sign up
          </button>

          <p className="text-center text-sm mt-4 text-gray-800">
            Already have an account?
            <Link to="/login" className="text-[#2e667d] underline ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
