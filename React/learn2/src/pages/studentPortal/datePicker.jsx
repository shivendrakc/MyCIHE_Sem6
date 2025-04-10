import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 11, 6)); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0, period: 'AM' });
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (selectedDate) {
      console.log(`Booking confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`);
      navigate('/paymentForm', {
        state: {
          date: selectedDate.toLocaleDateString(),
          time: `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`,
        },
      });
    } else {
      alert('Please select a date before proceeding.');
    }
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
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const handleTimeChange = (type, direction) => {
    setSelectedTime((prev) => {
      if (type === 'hour') {
        let newHour = direction === 'up' ? prev.hour + 1 : prev.hour - 1;
        if (newHour > 12) newHour = 1;
        if (newHour < 1) newHour = 12;
        return { ...prev, hour: newHour };
      }
      if (type === 'minute') {
        let newMinute = direction === 'up' ? prev.minute + 15 : prev.minute - 15;
        if (newMinute >= 60) newMinute = 0;
        if (newMinute < 0) newMinute = 45;
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
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
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

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 6 && currentDate.getMonth() === 11 && currentDate.getFullYear() === 2022;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          style={{
            width: '36px',
            height: '36px',
            background: isToday ? '#5598FF' : isSelected ? '#ECECEC' : 'white',
            borderRadius: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: isToday ? 'white' : '#454545',
            cursor: 'pointer',
          }}
        >
          {day}
        </div>
      );
    }

    // Next month days
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

  return (
    <div style={{ width: '1920px', height: '1080px', position: 'relative', background: '#CDF3FF', overflow: 'hidden' }}>
      <div style={{ left: '365px', top: '80px', position: 'absolute', color: '#454545', fontSize: '36px', fontFamily: 'Inter', fontWeight: 700 }}>
        Learn2Drive
      </div>

      <div style={{ left: '365px', top: '184px', position: 'absolute', color: '#454545', fontSize: '24px', fontFamily: 'Inter', fontWeight: 700 }}>
        Book a date
      </div>

      <div style={{ left: '365px', top: '243px', position: 'absolute', color: '#454545', fontSize: '16px', fontFamily: 'Inter', fontWeight: 400 }}>
        Navigate through different months by clicking arrow selectors.
      </div>

      <div
        style={{
          width: '340px',
          padding: '20px',
          left: '1146px',
          top: '184px',
          position: 'absolute',
          background: 'white',
          boxShadow: '0px 0px 20px 4px rgba(191.25, 191.25, 191.25, 0.25)',
          borderRadius: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
          <div
            onClick={handlePrevMonth}
            style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '24px', height: '24px', borderLeft: '2px solid #454545', borderBottom: '2px solid #454545', transform: 'rotate(45deg)' }} />
          </div>
          <div style={{ color: '#454545', fontSize: '16px', fontFamily: 'Inter', fontWeight: 500 }}>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </div>
          <div
            onClick={handleNextMonth}
            style={{ width: '36px', height: '36px', background: 'white', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <div style={{ width: '24px', height: '24px', borderRight: '2px solid #454545', borderBottom: '2px solid #454545', transform: 'rotate(-45deg)' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', padding: '0 24px' }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
            <div key={day} style={{ textAlign: 'center', color: '#737373', fontSize: '14px', fontFamily: 'Inter', fontWeight: 500 }}>
              {day}
            </div>
          ))}
          {renderCalendar()}
        </div>
      </div>

      <div style={{ left: '365px', top: '676px', position: 'absolute', color: '#454545', fontSize: '24px', fontFamily: 'Inter', fontWeight: 700 }}>
        Select a time slot
      </div>
          
      <div
        style={{
          width: '254px',
          padding: '10px 24px',
          left: '1052px',
          top: '676px',
          position: 'absolute',
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

      <div
        style={{
          width: '140px',
          height: '56px',
          padding: '0 20px',
          left: '365px',
          top: '840px',
          position: 'absolute',
          background: '#387A90',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={handleBookNow}
      >
        <div style={{ color: 'white', fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, textDecoration: 'underline' }}>
          Book Now
        </div>
      </div>
    </div>
  );
};

export default DatePicker;