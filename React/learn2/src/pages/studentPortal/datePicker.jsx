import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import Footer from '../LandingPage/Footer';

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({ hour: 9, minute: 0, period: 'AM' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { instructorId } = useParams();

  // Mocked instructor data
  const instructor = {
    id: instructorId || '1',
    name: 'John Doe',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    availabilityData: [
      { date: new Date(2025, 3, 11), available: true, startTime: '9:00 AM', endTime: '5:00 PM' },
      { date: new Date(2025, 3, 12), available: false },
      { date: new Date(2025, 3, 13), available: true, startTime: '10:00 AM', endTime: '4:00 PM' },
      { date: new Date(2025, 3, 14), available: true, startTime: '8:00 AM', endTime: '3:00 PM' },
      { date: new Date(2025, 3, 15), available: false },
    ],
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }
    const availability = instructor.availabilityData.find(
      (entry) => entry.date.toDateString() === selectedDate.toDateString()
    );
    if (!availability || !availability.available || !isTimeWithinAvailability(selectedTime, availability.startTime, availability.endTime)) {
      alert('Selected time is not available.');
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = () => {
    const timeStr = `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.period}`;
    console.log(`Booking confirmed for ${selectedDate.toLocaleDateString()} at ${timeStr}`);
    navigate('/paymentForm', { state: { date: selectedDate.toLocaleDateString(), time: timeStr, instructorId } });
    setShowModal(false);
  };

  const isTimeWithinAvailability = (time, start, end) => {
    if (!start || !end) return false;
    const [startHour, startMinPeriod] = start.split(' ');
    const [endHour, endMinPeriod] = end.split(' ');
    const startH = parseInt(startHour.split(':')[0]) + (startMinPeriod === 'PM' && startHour !== '12' ? 12 : 0);
    const endH = parseInt(endHour.split(':')[0]) + (endMinPeriod === 'PM' && endHour !== '12' ? 12 : 0);
    const selectedH = time.hour + (time.period === 'PM' && time.hour !== 12 ? 12 : 0);
    return selectedH >= startH && selectedH < endH;
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const availability = instructor.availabilityData.find(
      (entry) => entry.date.toDateString() === clickedDate.toDateString()
    );
    if (availability && availability.available) {
      setSelectedDate(clickedDate);
    } else {
      alert('This date is not available.');
    }
  };

  const handleTimeChange = (type, direction) => {
    setSelectedTime((prev) => {
      if (type === 'hour') {
        let newHour = direction === 'up' ? prev.hour + 1 : prev.hour - 1;
        newHour = newHour > 12 ? 1 : newHour < 1 ? 12 : newHour;
        return { ...prev, hour: newHour };
      }
      if (type === 'minute') {
        let newMinute = direction === 'up' ? prev.minute + 15 : prev.minute - 15;
        newMinute = newMinute >= 60 ? 0 : newMinute < 0 ? 45 : newMinute;
        return { ...prev, minute: newMinute };
      }
      if (type === 'period') return { ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' };
      return prev;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-center text-gray-400">
          {prevMonthDays - i}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = selectedDate && selectedDate.toDateString() === currentDay.toDateString();
      const availability = instructor.availabilityData.find(
        (entry) => entry.date.toDateString() === currentDay.toDateString()
      );
      const isAvailable = availability && availability.available;
      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`p-2 text-center rounded-full transition-colors duration-200 ${
            isSelected
              ? 'bg-blue-500 text-white'
              : isAvailable
              ? 'bg-blue-100 text-gray-800 hover:bg-blue-200 cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {day}
        </div>
      );
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-center text-gray-400">
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Scheduling Section */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Instructor Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{instructor.name}</h3>
                <p className="text-sm text-gray-500">Contact: +123 456 7890</p>
                <p className="text-sm text-gray-500">Email: instructor@example.com</p>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 text-center">Schedule a Lesson</h2>

            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-800">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                  <div key={d} className="p-2 text-center font-medium text-gray-600">
                    {d}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>

            {/* Time Picker */}
            <div className="bg-white rounded-xl shadow-sm p-6 flex justify-center">
              <div className="flex gap-4">
                {['hour', 'minute', 'period'].map((type) => (
                  <div key={type} className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleTimeChange(type, 'up')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <div className="w-16 text-center text-lg font-medium text-gray-800 bg-gray-100 rounded px-2 py-1">
                      {type === 'period'
                        ? selectedTime.period
                        : type === 'hour'
                        ? selectedTime.hour.toString().padStart(2, '0')
                        : selectedTime.minute.toString().padStart(2, '0')}
                    </div>
                    <button
                      onClick={() => handleTimeChange(type, type === 'period' ? 'toggle' : 'down')}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            {selectedDate && (
              <div className="bg-blue-50 rounded-xl p-4 text-center text-sm text-gray-700">
                <p>
                  {selectedDate.toLocaleDateString()} at {selectedTime.hour}:
                  {selectedTime.minute.toString().padStart(2, '0')} {selectedTime.period}
                </p>
                <p>
                  Available:{' '}
                  {instructor.availabilityData.find((a) => a.date.toDateString() === selectedDate.toDateString())
                    ?.startTime}{' '}
                  -{' '}
                  {instructor.availabilityData.find((a) => a.date.toDateString() === selectedDate.toDateString())
                    ?.endTime}
                </p>
              </div>
            )}

            {/* Book Now Button */}
            <button
              onClick={handleBookNow}
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 transition-colors duration-200"
            >
              Book Now
            </button>
          </div>

          {/* Availability Sidebar */}
          <div className="lg:w-80 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Availability</h3>
            <div className="space-y-2">
              {instructor.availabilityData.map((entry, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span
                    className={`font-medium ${entry.available ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {entry.available ? `${entry.startTime} - ${entry.endTime}` : 'Not Available'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Booking</h3>
            <p className="text-gray-600 mb-6">
              {selectedDate.toLocaleDateString()} at {selectedTime.hour}:
              {selectedTime.minute.toString().padStart(2, '0')} {selectedTime.period}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DatePicker;