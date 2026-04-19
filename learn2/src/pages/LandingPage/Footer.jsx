import { useState } from 'react';
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
    <footer className="bg-[#060b16] border-t border-white/6 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,223,0.35)]">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Learn<span className="text-[#00d4df]">2</span>Drive
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting learners with certified instructors for a seamless, confidence-building driving experience.
            </p>
            <div className="flex gap-3">
              {[
                { icon: faInstagram, label: 'Instagram' },
                { icon: faTwitter,   label: 'Twitter' },
                { icon: faYoutube,   label: 'YouTube' },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#00d4df] hover:border-[#00d4df]/40 hover:bg-[#00d4df]/10 transition-all duration-200"
                >
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#00d4df] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#00d4df] transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: faEnvelope,      text: 'support@learn2drive.com' },
                { icon: faPhone,         text: '+61 2 1234 5678' },
                { icon: faMapMarkerAlt,  text: 'Sydney, Australia' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#00d4df]/10 border border-[#00d4df]/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5 text-[#00d4df]" />
                  </div>
                  <span className="text-gray-400 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest news and driving tips.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-[#00d4df]/40 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                </button>
              </div>
              {message && (
                <p className={`text-xs ${message.includes('Thank') ? 'text-[#00d4df]' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Learn2Drive. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-[#00d4df] text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-[#00d4df] text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
