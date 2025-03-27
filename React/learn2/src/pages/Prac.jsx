import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add the icons to the library
library.add(faInstagram, faTwitter, faYoutube, faEnvelope);

const Learn2Drive = () => {
  return (
    <div className="bg-white font-sans">
      {/* Header Section */}
      <header className="bg-sky-100 py-5 border-b-2 border-sky-200">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">LEARN 2 DRIVE</div>
            <div className="space-x-4">
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">Home</a>
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">About us</a>
              <a href="#" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">Contact</a>
              <a href="#" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Login</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 flex items-center justify-around flex-col md:flex-row">
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Find your mate <br /> Learn2Drive with Ease
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Connecting Aspiring Drivers with Certified Instructors for a Seamless Learning Experience.
            </p>
            <div className="space-x-4">
              <a href="#" className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700">
                For Students
              </a>
              <a href="#" className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700">
                For Instructors
              </a>
            </div>
          </div>
          <div className="max-w-md mt-8 md:mt-0">
            <img src="https://via.placeholder.com/400x250?text=Audi+A4" alt="Audi A4" className="rounded-lg w-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="bg-white">
        {/* Top Section (Wavy Background) */}
        <div className="relative h-64 bg-gradient-to-b from-sky-200 to-sky-400 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,117.3C672,107,768,149,864,170.7C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E')" }}
          ></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <img src="https://via.placeholder.com/300x200?text=Instructor+Student" alt="Instructor Student" className="row-span-2 rounded-lg" />
            <img src="https://via.placeholder.com/200x150?text=Woman+Driving" alt="Woman Driving" className="rounded-lg" />
            <img src="https://via.placeholder.com/200x150?text=Car+Interior" alt="Car Interior" className="rounded-lg" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About</h2>
            <p className="text-gray-600 mb-8">
              Learn2Drive is a dynamic platform dedicated to connecting aspiring drivers with certified instructors,
              providing personalized lessons tailored to individual needs. We simplify the learning experience through
              an easy-to-use booking system, secure payments, and real-time progress tracking, ensuring every learner
              gains confidence and skills for the road ahead.
            </p>
            <button className="bg-sky-500 text-white py-3 px-8 rounded-full w-fit hover:bg-sky-600">
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">What We Offer ?</h2>
          <p className="text-center text-gray-600 mb-12">
            Empowering learners to find the perfect driving instructor with personalized lessons, easy scheduling, and
            secure payments. Gain confidence on the road with our seamless, student-focused platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="https://via.placeholder.com/200x150?text=Personalized+Instructor" alt="Personalized Instructor" className="mx-auto mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Instructor Matching</h3>
              <a href="#" className="text-blue-600 font-semibold">Readmore →</a>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/200x150?text=Easy+Lesson+Scheduling" alt="Easy Lesson Scheduling" className="mx-auto mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Lesson Scheduling</h3>
              <a href="#" className="text-blue-600 font-semibold">Readmore →</a>
            </div>
            <div className="text-center">
              <img src="https://via.placeholder.com/200x150?text=Secure+Payment+System" alt="Secure Payment System" className="mx-auto mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payment System</h3>
              <a href="#" className="text-blue-600 font-semibold">Readmore →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section (Stats and Footer) */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stats Section */}
            <div>
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-sky-400 mr-2">Helping a local Youths to Drive with Ease</h2>
              </div>
              <p className="text-gray-300 mb-6">Over 2000 Satisfied Members</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xl font-semibold text-white">2,00</p>
                  <p className="text-gray-400">Certified Instructors</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">2,334</p>
                  <p className="text-gray-400">Users</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">828,867</p>
                  <p className="text-gray-400">Lessons Conducted</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-white">1,926</p>
                  <p className="text-gray-400">Payments</p>
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sky-400 text-gray-300">About us</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Blog</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Contact us</a></li>
              </ul>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Help center</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Terms of service</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Legal</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Privacy policy</a></li>
                <li><a href="#" className="hover:text-sky-400 text-gray-300">Status</a></li>
              </ul>
            </div>

            {/* Stay Up to Date Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">Stay up to date</h3>
              <div className="flex items-center border-b border-gray-600 py-2">
                <input type="email" placeholder="Your email address" className="bg-transparent text-gray-300 focus:outline-none flex-1" />
                <button className="text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </div>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="hover:text-sky-400">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href="#" className="hover:text-sky-400">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="#" className="hover:text-sky-400">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
            Copyright © 2020 Learnify UI Kit . All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Learn2Drive;

