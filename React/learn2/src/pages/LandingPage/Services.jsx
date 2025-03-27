import React from 'react'

const Services = () => {
  return (
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
  )
}

export default Services
