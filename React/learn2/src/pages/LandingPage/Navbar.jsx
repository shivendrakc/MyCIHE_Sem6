import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Delay to ensure page loads
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '20px 40px',
        borderBottom: '2px solid #dbeafe',
        transition: 'transform 0.3s ease',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        zIndex: 1000,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div
          onClick={() => navigate('/')}
          style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', cursor: 'pointer' }}
        >
          LEARN2DRIVE
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {[
            { label: 'Home', action: () => navigate('/') },
            { label: 'About us', action: () => scrollToSection('about') },
            { label: 'Contact', action: () => scrollToSection('footer') },
          ].map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#1f2937',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#dbeafe')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '8px 20px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;