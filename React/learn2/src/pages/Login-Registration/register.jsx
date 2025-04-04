import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you'll add routing later

// --- Adjust asset paths as needed ---
import googlePng from './assets/google.png';
import facebookPng from './assets/facebook.png';
import twitterPng from './assets/twitter.png';
// ------------------------------------

function RegisterPage() {
  // Example: Generate years dynamically (optional but good practice)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    // .register-page styles
    <div className="flex items-center justify-center min-h-screen font-sans bg-[#f4f8fb] p-4 md:p-8"> {/* Added padding and bg */}
      {/* .register__form-container styles */}
      <main className="bg-white max-w-[600px] w-[95%] flex flex-col justify-center items-center p-8 rounded-lg shadow-lg">

        {/* .register__form-title styles */}
        <h1 className="text-[25px] tracking-[0.7px] font-medium text-center mb-[calc(1.6*1rem)] text-gray-800"> {/* mb-6 is approx 1.6rem */}
          Sign Up to Enlighten Your Driving Journey
        </h1>

        {/* .register__social-login styles */}
        <div className="flex flex-col items-center gap-[calc(0.6*1rem)] w-full mb-4 custom-sm:w-[75%]"> {/* gap-2.5 is approx 0.6rem */}
          {/* .register__social-btn styles */}
          <button className="bg-background flex items-center justify-center w-full p-[13px] border-[1.5px] border-[#999] rounded-full cursor-pointer text-[18px] text-gray-800 font-medium transition-colors duration-200 ease-in-out hover:bg-[#bdeaff] hover:border-[#777]">
            {/* .register__social-icon styles */}
            <img src={googlePng} alt="Google Logo" className="w-[22px] h-[22px] mr-[10px]" />
            Sign up with Google
          </button>
          <button className="bg-background flex items-center justify-center w-full p-[13px] border-[1.5px] border-[#999] rounded-full cursor-pointer text-[18px] text-gray-800 font-medium transition-colors duration-200 ease-in-out hover:bg-[#bdeaff] hover:border-[#777]">
            <img src={facebookPng} alt="Facebook Logo" className="w-[22px] h-[22px] mr-[10px]" />
            Sign up with Facebook
          </button>
          <button className="bg-background flex items-center justify-center w-full p-[13px] border-[1.5px] border-[#999] rounded-full cursor-pointer text-[18px] text-gray-800 font-medium transition-colors duration-200 ease-in-out hover:bg-[#bdeaff] hover:border-[#777]">
            <img src={twitterPng} alt="Twitter Logo" className="w-[22px] h-[22px] mr-[10px]" />
            Sign up with Twitter
          </button>
        </div>

        {/* .register__divider styles */}
        <div className="w-full flex items-center my-4 mx-auto custom-sm:w-[75%]">
          <hr className="flex-1 border-t border-gray-300" />
          <span className="px-[10px] text-gray-600 text-[14px]">OR</span>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        {/* .register__form styles */}
        <form action="#" className="w-full flex flex-col gap-4 custom-sm:w-[75%]"> {/* gap-4 = 1rem */}
          {/* .subtitle styles */}
          <h3 className="text-[15px] text-center font-medium text-gray-800 mb-4"> {/* Added margin */}
            Sign Up with Your Email
          </h3>

          {/* .register-form-item styles */}
          <div className="flex flex-col gap-[2.5px] w-full">
            {/* .register-form-item label */}
            <label htmlFor="profile-name" className="text-[15px] text-gray-800 font-medium">
              Profile Name
            </label>
            {/* input styles */}
            <input
              type="text"
              id="profile-name"
              placeholder="Enter your profile name"
              className="p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] w-full font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-[2.5px] w-full">
            <label htmlFor="email" className="text-[15px] text-gray-800 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] w-full font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-[2.5px] w-full">
            <label htmlFor="password" className="text-[15px] text-gray-800 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] w-full font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            {/* .auth__password-hint styles */}
            <p className="my-[3px] text-gray-700 text-[13px]"> {/* text-gray-700 approximates #555 */}
              Use 8+ characters with letters, numbers & symbols
            </p>
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-[2.5px] w-full">
            <label className="text-[15px] text-gray-800 font-medium">
              What's your gender? (Optional)
            </label>
            {/* .auth__gender-options styles */}
            <div className="flex flex-wrap gap-8 mt-[5px]"> {/* gap-8 = 2rem */}
              <label className="flex items-center text-[14px] font-normal text-gray-700">
                <input type="radio" name="gender" value="Female" className="mr-[5px] rounded-full text-primary focus:ring-primary border-gray-300"/> Female
              </label>
              <label className="flex items-center text-[14px] font-normal text-gray-700">
                <input type="radio" name="gender" value="Male" className="mr-[5px] rounded-full text-primary focus:ring-primary border-gray-300"/> Male
              </label>
              <label className="flex items-center text-[14px] font-normal text-gray-700">
                <input type="radio" name="gender" value="Non-binary" className="mr-[5px] rounded-full text-primary focus:ring-primary border-gray-300"/> Non-binary
              </label>
            </div>
          </div>

          {/* DOB */}
          <div className="flex flex-col gap-[2.5px] w-full">
            <label className="text-[15px] text-gray-800 font-medium">
              Date of Birth
            </label>
             {/* .auth__dob styles */}
            <div className="flex flex-wrap gap-4 mt-[5px]">
               {/* .auth__dob-select styles */}
              <select id="dob-month" defaultValue="" className="flex-grow p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] min-w-[80px] font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                 <option value="" disabled>Month</option>
                 <option>January</option> <option>February</option> <option>March</option> <option>April</option> <option>May</option> <option>June</option> <option>July</option> <option>August</option> <option>September</option> <option>October</option> <option>November</option> <option>December</option>
              </select>
              <select id="dob-day" defaultValue="" className="flex-grow p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] min-w-[80px] font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                 <option value="" disabled>Day</option>
                 {days.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
              <select id="dob-year" defaultValue="" className="flex-grow p-[10px] rounded-[8px] bg-background border border-gray-300 text-[16px] min-w-[80px] font-sans focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                 <option value="" disabled>Year</option>
                 {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
          </div>

          {/* .auth-register-checkbox */}
          <label className="text-[15px] flex items-center text-gray-800">
            <input type="checkbox" className="mr-[4px] rounded text-primary focus:ring-primary border-gray-300" /> Share my registration data for marketing purposes
          </label>

          {/* .terms */}
          <p className="text-[13px] mb-[12px] text-center text-gray-700">
            By creating an account, you agree to the{' '}
            {/* .link-text */}
            <span className="underline cursor-pointer text-primary font-medium hover:opacity-80">Terms of Use</span> and{' '}
            <span className="underline cursor-pointer text-primary font-medium hover:opacity-80">Privacy Policy</span>.
          </p>

           {/* Submit Button - Reuse .auth__submit-btn styles */}
           {/* Changed from <a> to <button> */}
           <button
              type="submit"
              className="block w-full p-[12px] bg-primary text-white text-[16px] font-bold border-none rounded-[5px] cursor-pointer text-center no-underline transition-colors duration-200 ease-in-out hover:bg-[#255568]"
            >
              Sign up
            </button>

          {/* .auth_login styles */}
          <p className="mt-[-4px] text-center text-[15px] text-gray-800">
            Already have an account?{' '}
            {/* Use React Router Link */}
            <Link to="/login" className="underline cursor-pointer text-primary font-medium hover:opacity-80">Log in</Link> {/* Assumed /login route */}
          </p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;