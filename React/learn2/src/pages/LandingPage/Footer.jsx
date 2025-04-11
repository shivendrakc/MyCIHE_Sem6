import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

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
    setTimeout(() => setMessage(''), 3000); // Clear message after 3s
  };

  return (
    <div
      id="footer"
      style={{
        backgroundColor: '#1f2937',
        color: '#ffffff',
        padding: '40px 20px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Logo and Tagline */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#3b82f6' }}>Learn2Drive</h3>
          <p style={{ fontSize: '14px', color: '#d1d5db' }}>
            Connecting drivers with certified instructors.
          </p>
        </div>

        {/* Email Subscription */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>
            Stay Updated
          </h4>
          <form
            onSubmit={handleSubscribe}
            style={{ display: 'flex', justifyContent: 'center', gap: '10px', maxWidth: '400px', margin: '0 auto' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              style={{
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                backgroundColor: '#374151',
                color: '#ffffff',
                flex: 1,
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </form>
          {message && (
            <p style={{ fontSize: '12px', color: message.includes('Thank') ? '#10b981' : '#ef4444', marginTop: '8px' }}>
              {message}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          {[
            { icon: faInstagram, href: '#' },
            { icon: faTwitter, href: '#' },
            { icon: faYoutube, href: '#' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              style={{ color: '#d1d5db', fontSize: '20px', transition: 'color 0.2s' }}
              onMouseOver={(e) => (e.target.style.color = '#3b82f6')}
              onMouseOut={(e) => (e.target.style.color = '#d1d5db')}
            >
              <FontAwesomeIcon icon={social.icon} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '12px', color: '#9ca3af' }}>
          Copyright © {new Date().getFullYear()} Learn2Drive. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;