import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const InstructorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          backgroundColor: '#1e40af',
          padding: '20px',
          transition: 'width 0.3s ease',
          width: isSidebarOpen ? '250px' : '60px',
          overflowY: 'auto',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {isSidebarOpen && (
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600"
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#60a5fa',
                textDecoration: 'none',
              }}
            >
              LEARN 2 DRIVE
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              color: '#ffffff',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.color = '#60a5fa')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
          >
            {isSidebarOpen ? '◄' : '►'}
          </button>
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#93c5fd', textTransform: 'uppercase', marginBottom: '10px' }}>
            {isSidebarOpen ? 'Menu' : ''}
          </div>
          {[
            { path: '/instructorPortal', label: 'Dashboard', icon: '🏠' },
            { path: '/instructorProfile', label: 'Manage Profile', icon: '👤' },
            { path: '/manageStudents', label: 'Manage Students', icon: '👥' },
            { path: '/lessonReview', label: 'Lesson Review', icon: '📝' },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              style={{
                padding: '10px',
                color: '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <span style={{ marginRight: isSidebarOpen ? '10px' : '0', fontSize: '18px' }}>{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: '12px', color: '#93c5fd', textTransform: 'uppercase', margin: '20px 0 10px' }}>
            {isSidebarOpen ? 'Others' : ''}
          </div>
          {[
            { path: '/settings', label: 'Settings', icon: '⚙️' },
            { path: '/payment', label: 'Payment', icon: '💳' },
            { path: '/accounts', label: 'Accounts', icon: '🏦' },
            { path: '/help', label: 'Help', icon: '❓' },
          ].map((item) => (
            <div
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              style={{
                padding: '10px',
                color: '#ffffff',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '5px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <span style={{ marginRight: isSidebarOpen ? '10px' : '0', fontSize: '18px' }}>{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          marginLeft: isSidebarOpen ? '250px' : '60px',
          transition: 'margin-left 0.3s ease',
          overflowY: 'auto',
          backgroundColor: '#f3f4f6',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default InstructorLayout;