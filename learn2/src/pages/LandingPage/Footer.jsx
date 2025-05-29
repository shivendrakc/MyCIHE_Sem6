import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setMessage('Please enter a valid email.');
      return;
    }
    setMessage('Thank you for subscribing!');
    setEmail('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <footer className="bg-[#0f3643] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#28c1c6]">Learn2Drive</h3>
            <p className="text-gray-300 text-sm">
              Connecting drivers with certified instructors for a seamless learning experience.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: faInstagram, href: '#', label: 'Instagram' },
                { icon: faTwitter, href: '#', label: 'Twitter' },
                { icon: faYoutube, href: '#', label: 'YouTube' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-300 hover:text-[#28c1c6] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-[#28c1c6] transition-colors duration-300 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 mt-1 text-[#28c1c6]" />
                <span className="text-gray-300 text-sm">support@learn2drive.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faPhone} className="w-4 h-4 mt-1 text-[#28c1c6]" />
                <span className="text-gray-300 text-sm">+61 2 1234 5678</span>
              </li>
              <li className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mt-1 text-[#28c1c6]" />
                <span className="text-gray-300 text-sm">Sydney, Australia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-[#1a2a32] text-white border border-[#28c1c6]/20 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#28c1c6] text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#28c1c6] to-[#1b9aa0] text-white rounded-r-lg hover:opacity-90 transition-opacity duration-300"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </button>
              </div>
              {message && (
                <p className={`text-sm ${message.includes('Thank') ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#28c1c6]/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              Copyright © {new Date().getFullYear()} Learn2Drive. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#28c1c6] text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#28c1c6] text-sm transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;