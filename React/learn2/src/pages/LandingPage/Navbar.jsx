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
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`fixed top-0 w-full z-[1000] transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: '#CDF3FF' }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center px-10 py-5">
        {/* Logo */}
        <div
          onClick={handleHomeClick}
          className="text-black text-2xl font-bold cursor-pointer"
        >
          LEARN2DRIVE
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleHomeClick}
            className="text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-[#28c1c6] hover:text-white transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-[#28c1c6] hover:text-white transition"
          >
            About us
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-[#28c1c6] hover:text-white transition"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('footer')}
            className="text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-[#28c1c6] hover:text-white transition"
          >
            Contact
          </button>

          {/* Login Button */}
          <button
            onClick={() => navigate('/login')}
            className="text-white bg-[#28c1c6] text-sm font-medium px-5 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
