import React from 'react'

const Main = () => {
  return (
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
  )
}

export default Main
