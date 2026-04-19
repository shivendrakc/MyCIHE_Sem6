import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', action: handleHomeClick },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Services', action: () => scrollToSection('services') },
    { label: 'Contact', action: () => scrollToSection('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[1000] transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,212,223,0.08)] border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Logo */}
        <div onClick={handleHomeClick} className="cursor-pointer flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,223,0.4)]">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight group-hover:text-[#00d4df] transition-colors duration-200">
            Learn<span className="text-[#00d4df]">2</span>Drive
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-gray-300 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <div className="w-px h-5 bg-white/20 mx-2" />
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold px-5 py-2 rounded-lg border border-[#00d4df]/50 text-[#00d4df] hover:bg-[#00d4df] hover:text-[#080d1a] transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] hover:shadow-[0_0_20px_rgba(0,212,223,0.4)] transition-all duration-200 ml-1"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-[#080d1a]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="block w-full text-left text-gray-300 hover:text-white text-sm font-medium px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { navigate('/login'); setMenuOpen(false); }}
              className="flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg border border-[#00d4df]/50 text-[#00d4df] hover:bg-[#00d4df]/10 transition-all duration-200"
            >
              Login
            </button>
            <button
              onClick={() => { navigate('/register'); setMenuOpen(false); }}
              className="flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
