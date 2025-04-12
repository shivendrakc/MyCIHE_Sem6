import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Hide navbar when scrolling down
        setIsVisible(false);
      } else {
        // Show navbar when scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white py-5 border-b-2 border-sky-200 fixed w-full transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            LEARN 2 DRIVE
          </Link>
          <div className="space-x-4">
            <Link to="/" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">
              Home
            </Link>
            <Link to="/about" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">
              About us
            </Link>
            <Link to="/contact" className="text-gray-800 hover:bg-sky-200 py-2 px-3 rounded-md">
              Contact
            </Link>
            <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;