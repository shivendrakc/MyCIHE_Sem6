import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorPortal = () => {
  const [students, setStudents] = useState([
    { name: 'Aasta Katwal', score: 78 },
    { name: 'Shivendra K C', score: 20 },
    { name: 'Prashant Joshi', score: 33 },
    { name: 'Sandesh Ghimire', score: 72 },
  ]);

  const [stats, setStats] = useState({
    fullProgress: 85,
    theoryProgress: 92,
    activeBookings: 27,
    questionsAnswered: 3298,
    sessionLength: '2hr 20min',
    totalRevenue: 6400,
    currentEngagement: 88,
    revenueGain: 34,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(students[1]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateProgressCircle = (id, value) => {
      const circle = document.getElementById(id);
      const valueElement = document.getElementById(`${id}Value`);
      if (circle && valueElement) {
        const radius = 74;
        const circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference - (value / 100) * circumference;
        valueElement.textContent = `${value}%`;
      }
    };

    updateProgressCircle('fullProgress', stats.fullProgress);
    updateProgressCircle('theoryProgress', stats.theoryProgress);
  }, [stats]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '60%',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>Reza Rafah</span>
        </div>
      </div>

      {/* Task Section */}
      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>Today’s Task</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
          Check your daily tasks and schedules
        </p>
        <button
          style={{
            marginTop: '16px',
            padding: '10px 24px',
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
        >
          Today's Schedule
        </button>
      </div>

      {/* Analysis Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Individual Analysis</h3>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>{selectedStudent.name}</span>
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          {[
            { id: 'fullProgress', value: stats.fullProgress, label: 'Full Progress', color: '#f97316' },
            { id: 'theoryProgress', value: stats.theoryProgress, label: 'Theory Progress', color: '#3b82f6' },
          ].map((prog) => (
            <div key={prog.id} style={{ position: 'relative', width: '160px', height: '160px' }}>
              <svg width="160" height="160" style={{ position: 'absolute' }}>
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  id={prog.id}
                  cx="80"
                  cy="80"
                  r="74"
                  stroke={prog.color}
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  backgroundColor: `${prog.color}cc`,
                  borderRadius: '50%',
                }}
              >
                <div id={`${prog.id}Value`} style={{ fontSize: '24px', fontWeight: '600' }}>
                  0%
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>{prog.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          Manage Students
        </h3>
        <div style={{ width: '300px' }}>
          {filteredStudents.map((student, index) => (
            <div
              key={index}
              onClick={() => setSelectedStudent(student)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: selectedStudent.name === student.name ? '#dbeafe' : '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'background 0.2s',
              }}
            >
              <div style={{ width: '28px', height: '28px', backgroundColor: '#d1d5db', borderRadius: '50%', marginRight: '12px' }}></div>
              <div style={{ flex: 1, fontSize: '14px', color: '#1f2937' }}>{student.name}</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>{student.score}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
        {[
          { value: stats.activeBookings, label: 'Active Bookings' },
          { value: stats.questionsAnswered.toLocaleString(), label: 'Questions Answered' },
          { value: stats.sessionLength, label: 'Av. Session Length' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              width: '160px',
              height: '160px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginTop: '24px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue Section */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {[
          { value: `$${stats.totalRevenue.toLocaleString()}`, label: 'Total Revenue' },
          { value: `${stats.currentEngagement}%`, label: 'Current Engagement' },
          { value: `+${stats.revenueGain}%`, label: 'Revenue Gain' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            <div style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginTop: '24px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>{stat.label}</div>
            <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)' }}>
              <svg width="100" height="40">
                <polyline
                  points="0,40 20,30 40,35 60,20 80,25 100,15"
                  style={{ fill: 'none', stroke: '#3b82f6', strokeWidth: '2' }}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorPortal;