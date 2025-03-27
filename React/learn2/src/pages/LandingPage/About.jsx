import React from 'react'

const About = () => {
  return (
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
  )
}

export default About
