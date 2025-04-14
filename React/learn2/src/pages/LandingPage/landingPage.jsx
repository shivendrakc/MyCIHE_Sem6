import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Car from '../../assets/car.png';
import "../../assets/flipcar.css"
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import {
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const Learn2Drive = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
  const [flipped, setFlipped] = useState(false);
  const [flipped2, setFlipped2] = useState(false);
  const [flipped3, setFlipped3] = useState(false);





 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Inquiry submitted:', formData);
        navigate('/thank-you');
      } catch (error) {
        console.error('Submission failed:', error);
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="w-full mt-40 mb-16 flex flex-col md:flex-row justify-between items-center bg-white/60 px-30 py-16 shadow">
        <div className="mb-0 max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-800  mb-0">Find your mate</h1>
          <h1 className="text-4xl font-bold text-gray-800  mt-0 mb-2"><span className='text-6xl text-[#28c1c6]'>Learn2Drive</span> with Ease</h1>
          <p className="text-gray-600 mt-0 mb-10">Connecting Students with certified instructors for a seamless learning Experience.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/studentPortal')} className="bg-[#28c1c6] hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
              Available Instructors
            </button>
            <button onClick={() => navigate('/instructorPortal')} className="bg-[#28c1c6] hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
              Become an Instructor
            </button>
          </div>
        </div>
        <img
          src={Car}
          alt="Car on Road"
          className="max-w-md rounded-lg shadow mb-30"
        />
      </section>

      
      <div className="relative w-full h-[250px] overflow-hidden bg-white mt-25">
      {/* Dots/Indicators */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
        <span className="w-2 h- bg-teal-300 rounded-full opacity-70"></span>
        <span className="w-2 h-2 bg-teal-200 rounded-full opacity-50"></span>
      </div>

      {/* SVG Waves */}
      <svg id="about"
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          fill="#00cfff"
          fillOpacity="0.3"
          d="
            M0,100 
            C120,200 240,0 360,100 
            C480,200 600,0 720,100 
            C840,200 960,0 1080,100 
            C1200,200 1320,0 1440,100 
            L1440,260 
            C1320,160 1200,320 1080,260 
            C960,160 840,320 720,260 
            C600,160 480,320 360,260 
            C240,160 120,320 0,260 
            Z"
        />

        {/* Layer 2 - darker */}
        <path
          fill="#0a5d72"
          fillOpacity="0.6"
          d="
            M0,120 
            C120,40 240,220 360,120 
            C480,40 600,220 720,120 
            C840,40 960,220 1080,120 
            C1200,40 1320,220 1440,120 
            L1440,240 
            C1320,320 1200,140 1080,240 
            C960,320 840,140 720,240 
            C600,320 480,140 360,240 
            C240,320 120,140 0,240 
            Z"
        />
      </svg>
    </div>

    {/* About Section */}
    <section  className="bg-white py-16 px-6 md:px-20">

        {/* Heading OUTSIDE the grid */}
        <h2 className="text-4xl md:text-6xl font-bold text-[#28c1c6] text-center leading-snug font-sans-serif mb-12">
          About Us
        </h2>

        {/* Grid Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Column 1: Image + First Paragraph */}
          <div className="flex flex-col gap-8">
            {/* Image with overlay */}
            <div className="relative w-full h-[300px] rounded-bl-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1587808326264-bb8e737b1f4d?q=80&w=2070"
                alt="Office collaboration"
                className="w-full h-full object-cover"
                style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0% 100%)' }}
              />
             
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              At Learn2Drive, we're passionate about making the journey to getting your license smooth, safe, and empowering. 
              Whether you're starting from scratch or picking up where you left off, we connect you with certified instructors who care about your progress and confidence on the road.
            </p>
          </div>

          {/* Column 2: Content */}
          <div className="space-y-6">
            <h3 className="text-5xl font-semibold text-gray-800">
              How we work with our Learners?
            </h3>
            <p className="text-xl text-gray-600">
              Personalized lesson plans. Real-time availability. Transparent pricing.
              <br />
              Our platform is built to make learning to drive flexible and stress-free. With just a few clicks, you can find the right instructor, book a session, and start building your driving skills with confidence.
            </p>
            <button className="mt-4 bg-[#28c1c6] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Explore →
            </button>
          </div>

        </div>
        
      </section>




      

      {/* Services*/}
      <section id="services" className="py-16 px-6 md:px-20 bg-[#CDF3FF]">
  <h2 className="text-3xl md:text-6xl font-bold text-center text-[#0f3643] mb-25">Our Promise ?</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
    {/* CARD 1 */}
      <div className="w-full max-w-sm mx-auto perspective">
      <div className={`relative w-full h-[525px] transition-transform duration-700 transform-style preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1630406144797-821be1f35d75?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Personalized Matching"
            className="rounded-2xl mb-6"
          />
          <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Instructor Matching</h3>
          <ul className="text-sm text-gray-700 space-y-2 mb-6">
            <li className="flex items-center justify-center gap-2">
              <i className="uil uil-check text-blue-500"></i> Matched by location & style
            </li>
            <li className="flex items-center justify-center gap-2">
              <i className="uil uil-check text-blue-500"></i> 1-on-1 support
            </li>
            <li className="flex items-center justify-center gap-2">
              <i className="uil uil-check text-blue-500"></i> Certified instructors only
            </li>
            <li className="flex items-center justify-center gap-2">
              <i className="uil uil-check text-blue-500"></i> Transparent matching process
            </li>
          </ul>
          <button
            onClick={() => setFlipped(true)}
            className="mt-auto w-3/4 bg-blue-500 text-white py-2 rounded-md hover:bg-[#CDF3FF] hover:text-black transition"
          >
            Learn More
          </button>
        </div>

        {/* BACK SIDE */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
          <h3 className="text-xl font-bold text-black mb-4">Why Personalized Matching?</h3>
          <p className="text-gray-700 text-lg mb-6">
          Personalized matching ensures you're paired with the right driving instructor who fits your schedule, learning style, and location. Whether you're a beginner or brushing up on skills, this tailored approach makes your driving journey smoother, more effective, and truly enjoyable.
          </p>
          <button
            onClick={() => setFlipped(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#CDF3FF] hover:text-black transition"
          >
                   <ArrowLeftIcon className="w-5 h-5" />

          </button>
        </div>

      </div>
    </div>


    {/* CARD 2 */}
    <div className="w-full max-w-sm mx-auto perspective">
  <div className={`relative w-full h-[525px] transition-transform duration-700 transform-style preserve-3d ${flipped2 ? 'rotate-y-180' : ''}`}>
    
    {/* FRONT SIDE */}
    <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <img
        src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Easy Lesson Scheduling"
        className="rounded-2xl mb-6"
      />

      <h3 className="text-xl font-bold text-gray-800 mb-4">Easy Lesson Scheduling</h3>
      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Real-Time Booking
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Flexible Time Slots
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Instant Notifications
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Calendar Integration
        </li>
      </ul>

      <button
        onClick={() => setFlipped2(true)}
        className="mt-auto w-3/4 bg-blue-500 text-white py-2 rounded-md hover:bg-[#CDF3FF] hover:text-black transition"
      >
        Learn More
      </button>
    </div>

    {/* BACK SIDE */}
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-bold text-black mb-4">Why Easy Scheduling?</h3>
      <p className="text-gray-700 text-lg mb-6">
        Our intuitive scheduling system allows students to book lessons in real time based on instructor availability.
        You’ll get instant confirmations, flexible rescheduling options, and calendar reminders—all designed to make your driving journey stress-free and organized.
      </p>
      <button
        onClick={() => setFlipped2(false)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#CDF3FF] hover:text-black transition"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
    </div>

  </div>
</div>

    {/* CARD 3 */}
    <div className="w-full max-w-sm mx-auto perspective">
  <div className={`relative w-full h-[525px] transition-transform duration-700 transform-style preserve-3d ${flipped3 ? 'rotate-y-180' : ''}`}>
    
    {/* FRONT SIDE */}
    <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <img
        src="https://plus.unsplash.com/premium_photo-1682309553075-c84ea8d9d49a?q=80&w=2712&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Progress Tracking"
        className="rounded-2xl mb-6"
      />

      <h3 className="text-xl font-bold text-gray-800 mb-4">Progress Tracking</h3>
      <ul className="text-sm text-gray-700 space-y-2 mb-6">
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Lesson Completion Status
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Skill Level Updates
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Session Recap Logs
        </li>
        <li className="flex items-center justify-center gap-2">
          <i className="uil uil-check text-blue-500"></i> Goal Milestone Alerts
        </li>
      </ul>

      <button
        onClick={() => setFlipped3(true)}
        className="mt-auto w-3/4 bg-blue-500 text-white py-2 rounded-md hover:bg-[#CDF3FF] hover:text-black transition"
      >
        Learn More
      </button>
    </div>

    {/* BACK SIDE */}
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-bold text-black mb-4">Why Progress Tracking?</h3>
      <p className="text-gray-700 text-lg mb-6">
        Stay on top of your learning journey with real-time progress tracking. Know exactly where you stand after every lesson, monitor improvements, and get timely reminders to help you achieve key driving milestones with confidence.
      </p>
      <button
        onClick={() => setFlipped3(false)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#CDF3FF] hover:text-black transition"
      >
                <ArrowLeftIcon className="w-5 h-5" />

      </button>
    </div>

  </div>
</div>
</div>
</section>


      

      {/* Stats */}
      
    <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-50 py-35 bg-gray-50 mb-16">
      <div className="max-w-md space-y-3 mb-8 md:mb-0">
        <h2 className="text-4xl font-semibold text-gray-800">
          Helping local <br />
          <span className="text-6xl font-bold text-teal-600">
            Youths to Drive with Ease
          </span>
        </h2>
        <p className="text-lg text-gray-600">Over 2,000 Satisfied Members</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-15 text-left">
        <div className="flex items-center gap-5">
          <UserIcon className="h-15 w-15 text-teal-600" />
          <div>
            <div className="text-2xl font-semibold text-gray-800">200</div>
            <div className="text-sm text-gray-500">Certified Instructors</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <UsersIcon className="h-15 w-15 text-teal-600" />
          <div>
            <div className="text-2xl font-semibold text-gray-800">2,334</div>
            <div className="text-sm text-gray-500">Users</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDaysIcon className="h-15 w-15 text-teal-600" />
          <div>
            <div className="text-2xl font-semibold text-gray-800">828,867</div>
            <div className="text-sm text-gray-500">Lessons Conducted</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreditCardIcon className="h-15 w-15 text-teal-600" />
          <div>
            <div className="text-2xl font-semibold text-gray-800">1,926</div>
            <div className="text-sm text-gray-500">Payments</div>
          </div>
        </div>
      </div>
    </section>

      {/* Contact Form */}
     <section className="bg-[#CDF3FF] py-16 px-6 md:px-10 lg:px-24">
  <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
    {/* LEFT COLUMN - Heading */}
    <div className="bg-[#28c1c6] text-white flex flex-col justify-center items-center p-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
        Have a Query?
      </h2>
      <p className="text-lg md:text-xl text-center max-w-xs">
        Shoot us an email and our admin team get back to you as soon as they can!
      </p>
    </div>

    {/* RIGHT COLUMN - Contact Form */}
    <div className="p-8">
      <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Get in Touch</h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {errors.submit && <div className="text-red-500 text-sm">{errors.submit}</div>}
        {['name', 'email', 'message'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            {field === 'message' ? (
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Your message..."
              />
            ) : (
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder={`Your ${field}`}
              />
            )}
            {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
          </div>
        ))}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#28c1c6] hover:bg-[#CDF3FF] hover:text-black text-white py-3 rounded transition"
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>

  </div>
</section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Learn2Drive;
