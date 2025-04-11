import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 11, 6));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0, period: 'AM' });
  const navigate = useNavigate();

  const availabilityData = [
    { date: new Date(2022, 11, 6), available: true, startTime: '10:00 AM', endTime: '4:00 PM' },
    { date: new Date(2022, 11, 7), available: false, startTime: null, endTime: null },
    { date: new Date(2022, 11, 8), available: true, startTime: '9:00 AM', endTime: '3:00 PM' },
    { date: new Date(2022, 11, 9), available: false, startTime: null, endTime: null },
    { date: new Date(2022, 11, 10), available: true, startTime: '11:00 AM', endTime: '5:00 PM' },
  ];

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date before proceeding.');
      return;
    }
  
    const availability = availabilityData.find(
      (entry) =>
        entry.date.getDate() === selectedDate.getDate() &&
        entry.date.getMonth() === selectedDate.getMonth() &&
        entry.date.getFullYear() === selectedDate.getFullYear()
    );
  
    if (
      !availability ||
      !availability.available ||
      !isTimeWithinAvailability(selectedTime, availability.startTime, availability.endTime)
    ) {
      alert('The selected time is not within the available timeframe. Please choose a valid time.');
      return;
    }
  
    console.log(
      `Booking confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime.hour}:${selectedTime.minute
        .toString()
        .padStart(2, '0')} ${selectedTime.period}`
    );
  
    navigate('/paymentForm', {
      state: {
        date: selectedDate.toLocaleDateString(),
        time: `${selectedTime.hour}:${selectedTime.minute.toString().padStart(2, '0')} ${selectedTime.period}`,
      },
    });
  };

  // Helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const availability = availabilityData.find(
      (entry) =>
        entry.date.getDate() === clickedDate.getDate() &&
        entry.date.getMonth() === clickedDate.getMonth() &&
        entry.date.getFullYear() === clickedDate.getFullYear()
    );
  
    if (availability && availability.available) {
      setSelectedDate(clickedDate);
      console.log(`Available from ${availability.startTime} to ${availability.endTime}`);
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
    if (type === 'period') {
      return { ...prev, period: prev.period === 'AM' ? 'PM' : 'AM' };
    }
    return prev;
  });
};
const renderCalendar = () => {
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  const prevMonthDays = getDaysInMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );

  // Add previous month's days
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(
      <div
        key={`prev-${i}`}
        style={{
          width: '36px',
          height: '36px',
          background: 'white',
          borderRadius: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#C5C5C5',
        }}
      >
        {prevMonthDays - i}
      </div>
    );
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === 6 &&
      currentDate.getMonth() === 11 &&
      currentDate.getFullYear() === 2022;
    const currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();

    const isAvailable = availabilityData.some(
      (entry) =>
        entry.date.getDate() === currentDay.getDate() &&
        entry.date.getMonth() === currentDay.getMonth() &&
        entry.date.getFullYear() === currentDay.getFullYear() &&
        entry.available
    );

    days.push(
      <div
        key={day}
        onClick={() => handleDateClick(day)}
        style={{
          width: '36px',
          height: '36px',
          background: isSelected
            ? '#ECECEC'
            : isAvailable
            ? '#CDF3FF'
            : 'white',
          borderRadius: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: isToday ? 'white' : '#454545',
          cursor: isAvailable ? 'pointer' : 'not-allowed',
          opacity: isAvailable ? 1 : 0.5,
        }}
      >
        {day}
      </div>
    );
  }

  // Add next month's days
  const remainingSlots = 42 - days.length; // 6 rows of 7 days
  for (let i = 1; i <= remainingSlots; i++) {
    days.push(
      <div
        key={`next-${i}`}
        style={{
          width: '36px',
          height: '36px',
          background: 'white',
          borderRadius: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#C5C5C5',
        }}
      >
        {i}
      </div>
    );
  }

  return days;
};
const formatSelectedDateTime = () => {
  if (!selectedDate) return 'No date selected';
  const dateStr = selectedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = `${selectedTime.hour}:${selectedTime.minute
    .toString()
    .padStart(2, '0')} ${selectedTime.period}`;
  return `${dateStr} at ${timeStr}`;
};

return (
  <div
    style={{
      width: '1920px',
      height: '1080px',
      background: '#CDF3FF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
      {/* Main content (calendar, time selector, etc.) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {/* Instructor Profile Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0px 0px 20px 4px rgba(191.25, 191.25, 191.25, 0.25)',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          {/* Profile Picture */}
          <img
            src="https://placehold.co/100x100"
            alt="Instructor Profile"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          {/* Instructor Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#454545' }}>
              Instructor Name
            </div>
            <div style={{ fontSize: '14px', color: '#737373' }}>Contact: +123 456 7890</div>
            <div style={{ fontSize: '14px', color: '#737373' }}>Email: instructor@example.com</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ color: '#454545', fontSize: '36px', fontFamily: 'Inter', fontWeight: 700 }}>
          Learn2Drive
        </div>

        {/* Calendar */}
        <div
          style={{
            width: '340px',
            padding: '20px',
            background: 'white',
            boxShadow: '0px 0px 20px 4px rgba(191.25, 191.25, 191.25, 0.25)',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
            <div
              onClick={handlePrevMonth}
              style={{
                width: '36px',
                height: '36px',
                background: 'white',
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderLeft: '2px solid #454545',
                  borderBottom: '2px solid #454545',
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
            <div style={{ color: '#454545', fontSize: '16px', fontFamily: 'Inter', fontWeight: 500 }}>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </div>
            <div
              onClick={handleNextMonth}
              style={{
                width: '36px',
                height: '36px',
                background: 'white',
                borderRadius: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRight: '2px solid #454545',
                  borderBottom: '2px solid #454545',
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', padding: '0 24px' }}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div
                key={day}
                style={{
                  textAlign: 'center',
                  color: '#737373',
                  fontSize: '14px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                }}
              >
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>


          {/* Time picker */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div
              style={{
                width: '254px',
                padding: '10px 24px',
                background: 'white',
                boxShadow: '0px 0px 20px 4px rgba(191.25, 191.25, 191.25, 0.25)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div
                    onClick={() => handleTimeChange('hour', 'up')}
                    style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ width: '24px', height: '24px', borderTop: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(-45deg)' }} />
                  </div>
                  <div style={{ color: '#454545', fontSize: '18px', fontFamily: 'Inter', fontWeight: 400 }}>
                    {selectedTime.hour.toString().padStart(2, '0')}
                  </div>
                  <div
                    onClick={() => handleTimeChange('hour', 'down')}
                    style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ width: '24px', height: '24px', borderBottom: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(45deg)' }} />
                  </div>
                </div>
                <div style={{ color: '#454545', fontSize: '18px', fontFamily: 'Inter', fontWeight: 400 }}>:</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div
                    onClick={() => handleTimeChange('minute', 'up')}
                    style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ width: '24px', height: '24px', borderTop: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(-45deg)' }} />
                  </div>
                  <div style={{ color: '#454545', fontSize: '18px', fontFamily: 'Inter', fontWeight: 400 }}>
                    {selectedTime.minute.toString().padStart(2, '0')}
                  </div>
                  <div
                    onClick={() => handleTimeChange('minute', 'down')}
                    style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ width: '24px', height: '24px', borderBottom: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(45deg)' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div
                  onClick={() => handleTimeChange('period', 'toggle')}
                  style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ width: '24px', height: '24px', borderTop: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(-45deg)' }} />
                </div>
                <div style={{ color: '#454545', fontSize: '18px', fontFamily: 'Inter', fontWeight: 400 }}>
                  {selectedTime.period}
                </div>
                <div
                  onClick={() => handleTimeChange('period', 'toggle')}
                  style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ width: '24px', height: '24px', borderBottom: '2px solid #454545', borderRight: '2px solid #454545', transform: 'rotate(45deg)' }} />
                </div>
              </div>
            </div>
          </div>
          {selectedDate && (
            <div
              style={{
                background: '#E6F0FA',
                borderRadius: '16px',
                padding: '8px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#454545',
                fontSize: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>{formatSelectedDateTime()}</div>
              <div>
                {availabilityData.find(
                  (entry) =>
                    entry.date.getDate() === selectedDate.getDate() &&
                    entry.date.getMonth() === selectedDate.getMonth() &&
                    entry.date.getFullYear() === selectedDate.getFullYear()
                )?.startTime}{' '}
                -{' '}
                {availabilityData.find(
                  (entry) =>
                    entry.date.getDate() === selectedDate.getDate() &&
                    entry.date.getMonth() === selectedDate.getMonth() &&
                    entry.date.getFullYear() === selectedDate.getFullYear()
                )?.endTime}
              </div>
            </div>
          )}

          {/* Book Now button */}
          <div
            style={{
              width: '140px',
              height: '56px',
              background: '#387A90',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={handleBookNow}
          >
            <div style={{ color: 'white', fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
              Book Now
            </div>
          </div>
        </div>

        {/* Availability Tab */}
        <div
          style={{
            width: '300px',
            padding: '20px',
            background: 'white',
            boxShadow: '0px 0px 20px 4px rgba(191.25, 191.25, 191.25, 0.25)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ color: '#454545', fontSize: '20px', fontFamily: 'Inter', fontWeight: 700 }}>
            Instructor Availability
          </div>
          {availabilityData.map((entry, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                color: '#454545',
                fontSize: '14px',
                fontFamily: 'Inter',
                fontWeight: 400,
              }}
            >
              <span>
                {entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ color: entry.available ? '#387A90' : '#FF5555', fontWeight: 500 }}>
                {entry.available
                  ? `${entry.startTime} - ${entry.endTime}`
                  : 'Not Available'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
export default DatePicker;