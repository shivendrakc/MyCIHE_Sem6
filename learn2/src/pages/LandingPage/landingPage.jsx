import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Car from '../../assets/car.png';
import "../../assets/flipcar.css"
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
        const response = await axios.post('http://localhost:5000/api/contact/submit', formData);
        if (response.data.success) {
          setFormData({ name: '', email: '', message: '' });
          setShowSuccessModal(true);
          // Hide modal after 3 seconds
          setTimeout(() => {
            setShowSuccessModal(false);
          }, 3000);
        } else {
          setErrors({ submit: response.data.error || 'Failed to send message. Please try again.' });
        }
      } catch (error) {
        console.error('Submission failed:', error);
        setErrors({ 
          submit: error.response?.data?.error || 'Failed to send message. Please try again.' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleStartLearning = () => {
    navigate('/register');
  };

  return (
    <div className="w-full">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Message Sent Successfully!</h3>
              <p className="text-sm text-gray-500">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="w-full mt-20 md:mt-40 mb-16 flex flex-col md:flex-row justify-between items-center bg-white/60 px-4 md:px-30 py-16 shadow-lg">
        <div className="mb-8 md:mb-0 max-w-xl space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Find your mate <span className="text-4xl md:text-6xl text-[#28c1c6]">Learn2Drive</span> with Ease
          </h1>
          <p className="text-lg text-gray-600">
            Connecting Students with certified instructors for a seamless learning Experience.
          </p>
          <div className="flex justify-start">
            <button 
              onClick={handleStartLearning}
              className="bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-4"
            >
              Start Learning to Drive
              <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
        <img
          src={Car}
          alt="Car on Road"
          className="max-w-md w-full rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
        />
      </section>

      {/* Add the CSS for the arrow animation */}
      <style jsx>{`
        .arrow {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 24px;
          width: 24px;
          transform: rotate(-90deg);
        }

        .arrow span {
          display: block;
          width: 12px;
          height: 12px;
          border-bottom: 3px solid white;
          border-right: 3px solid white;
          transform: rotate(45deg);
          margin: -6px;
          animation: animate 2s infinite;
        }

        .arrow span:nth-child(2) {
          animation-delay: -0.2s;
        }

        .arrow span:nth-child(3) {
          animation-delay: -0.4s;
        }

        @keyframes animate {
          0% {
            opacity: 0;
            transform: rotate(45deg) translate(-10px, -10px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(45deg) translate(10px, 10px);
          }
        }
      `}</style>

      {/* SVG Waves Section */}
      <div className="relative w-full h-[250px] overflow-hidden bg-white">
        {/* Dots/Indicators */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
          <span className="w-2 h-2 bg-teal-300 rounded-full opacity-70"></span>
          <span className="w-2 h-2 bg-teal-200 rounded-full opacity-50"></span>
        </div>

        {/* SVG Waves */}
        <svg 
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

      {/* Onboarding Steps */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-b from-white to-[#f0f9ff]">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0f3643] mb-4">Get Started in 3 Simple Steps</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Start your driving journey with our easy-to-follow process</p>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Arrow between steps */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] transform -translate-y-1/2"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] transform -translate-y-1/2"></div>
          
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
              <span className="text-white text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-[#0f3643]">Sign Up</h3>
            <p className="text-gray-600 mb-4">Create your account in minutes with just a few details</p>
            <div className="flex justify-center">
              <UserIcon className="w-8 h-8 text-[#28c1c6] transform transition-all duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
              <span className="text-white text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-[#0f3643]">Find an Instructor</h3>
            <p className="text-gray-600 mb-4">Browse through our certified instructors and find your perfect match</p>
            <div className="flex justify-center">
              <UsersIcon className="w-8 h-8 text-[#28c1c6] transform transition-all duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
            <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
              <span className="text-white text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-[#0f3643]">Book a Lesson</h3>
            <p className="text-gray-600 mb-4">Schedule your first driving lesson at your convenience</p>
            <div className="flex justify-center">
              <CalendarDaysIcon className="w-8 h-8 text-[#28c1c6] transform transition-all duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button 
            onClick={handleStartLearning}
            className="bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py- px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5">
            <h2 className="text-4xl md:text-5xl font-bold text-[#28c1c6] leading-tight mb-2">
              About Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#28c1c6]/20 to-[#1b9aa0]/20 rounded-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500"></div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1587808326264-bb8e737b1f4d?q=80&w=2070"
                  alt="Office collaboration"
                  className="w-full h-[400px] object-cover rounded-2xl shadow-xl transform transition-all duration-500 group-hover:scale-105"
                  style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0% 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                  <p className="text-white text-lg font-medium">Our Team at Work</p>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-semibold text-[#0f3643] leading-tight">
                  How we work with our Learners?
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] rounded-full"></div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                At Learn2Drive, we're passionate about making the journey to getting your license smooth, safe, and empowering. 
                Whether you're starting from scratch or picking up where you left off, we connect you with certified instructors who care about your progress and confidence on the road.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Personalized lesson plans</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <CalendarDaysIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Real-time availability</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <CreditCardIcon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg text-gray-700">Transparent pricing</p>
                </div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed mb-20">
                Our platform is built to make learning to drive flexible and stress-free. With just a few clicks, you can find the right instructor, book a session, and start building your driving skills with confidence.
              </p>

              
            </div>
          </div>
        </div>
      </section>

      {/* Services*/}
      <section id="services" className="py-16 px-6 md:px-20 bg-[#CDF3FF]">
  <h2 className="text-3xl md:text-6xl font-bold text-center text-[#0f3643] mb-10">Our Promise ?</h2>

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
            className="mt-auto w-3/4 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
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
            className="bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
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
        className="mt-auto w-3/4 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
      >
        Learn More
      </button>
    </div>

    {/* BACK SIDE */}
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-center">
      <h3 className="text-xl font-bold text-black mb-4">Why Easy Scheduling?</h3>
      <p className="text-gray-700 text-lg mb-6">
        Our intuitive scheduling system allows students to book lessons in real time based on instructor availability.
        You'll get instant confirmations, flexible rescheduling options, and calendar reminders—all designed to make your driving journey stress-free and organized.
      </p>
      <button
        onClick={() => setFlipped2(false)}
        className="bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
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
        className="mt-auto w-3/4 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
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
        className="bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-4 py-2 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
      >
                <ArrowLeftIcon className="w-5 h-5" />

      </button>
    </div>

  </div>
</div>
</div>
</section>


      

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#f0f9ff] to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f3643] leading-tight mb-6">
              Our Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Join thousands of satisfied learners who have transformed their driving journey with us
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0f3643] mb-2">200+</div>
              <div className="text-lg text-gray-600">Certified Instructors</div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                <UsersIcon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0f3643] mb-2">2,334+</div>
              <div className="text-lg text-gray-600">Active Learners</div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                <CalendarDaysIcon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0f3643] mb-2">828,867+</div>
              <div className="text-lg text-gray-600">Lessons Conducted</div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 group-hover:scale-110">
                <CreditCardIcon className="w-10 h-10 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0f3643] mb-2">1,926+</div>
              <div className="text-lg text-gray-600">Successful Payments</div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're proud to be helping local youths learn to drive with confidence and ease
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-white to-[#f0f9ff]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f3643] leading-tight mb-6">
              What Our Learners Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Hear from our students about their learning experience with Learn2Drive
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#28c1c6]/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0f3643]">Sarah</h4>
                  <p className="text-[#28c1c6]">Parramatta</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Super easy to use and my instructor was amazing! The booking process was seamless and the lessons were exactly what I needed."
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="James" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#28c1c6]/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0f3643]">James</h4>
                  <p className="text-[#28c1c6]">Sydney CBD</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "I was nervous about learning to drive, but my instructor made me feel comfortable right away. The platform made finding and booking lessons so simple."
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img 
                    src="https://randomuser.me/api/portraits/women/68.jpg" 
                    alt="Emma" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#28c1c6]/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-[#0f3643]">Emma</h4>
                  <p className="text-[#28c1c6]">North Sydney</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "The flexibility to choose my instructor and schedule was perfect for my busy lifestyle. I passed my test on the first try!"
              </p>
              <div className="mt-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="footer" className="py-16 px-6 md:px-20 bg-gradient-to-b from-[#f0f9ff] to-white">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f3643] mb-4">
              Get in Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Have questions? We're here to help! Send us a message and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold text-[#0f3643] mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f3643]">Email</h4>
                    <p className="text-sm text-gray-600">support@learn2drive.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#28c1c6] to-[#1b9aa0] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#0f3643]">Phone</h4>
                    <p className="text-sm text-gray-600">+61 2 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#0f3643] mb-4">Send us a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {errors.submit && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                    {errors.submit}
                  </div>
                )}
                
                {['name', 'email', 'message'].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="block text-sm font-medium text-[#0f3643] capitalize">
                      {field}
                    </label>
                    {field === 'message' ? (
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28c1c6] focus:border-transparent transition-all duration-300"
                        placeholder="Your message..."
                        rows="3"
                      />
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28c1c6] focus:border-transparent transition-all duration-300"
                        placeholder={`Your ${field}`}
                      />
                    )}
                    {errors[field] && (
                      <p className="text-red-500 text-xs">{errors[field]}</p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white px-4 py-2 rounded-lg text-base font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Learn2Drive;
