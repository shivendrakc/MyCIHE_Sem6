import React from 'react'

const Stats = () => {
  return (
    <div className="bg-(--background) text-black py-12">
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
        </div>
        </div>
        </div>
  )
}

export default Stats
