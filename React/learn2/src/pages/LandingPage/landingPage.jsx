import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; // Assuming Footer is in the same directory; adjust path if needed

const Learn2Drive = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Featured instructors with Unsplash images
  const instructors = [
    { name: 'John Doe', rating: '4.9', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
    { name: 'Jane Smith', rating: '4.8', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Mike Johnson', rating: '4.7', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
  ];

  const [currentInstructor, setCurrentInstructor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInstructor((prev) => (prev + 1) % instructors.length);
    }, 3000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, [instructors.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Inquiry submitted:', formData);
        navigate('/thank-you');
      } catch (error) {
        console.error('Submission failed:', error);
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const styles = {
    container: {
      width: '100%',
      backgroundColor: '#f3f4f6',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '80px', // Space for fixed navbar
    },
    banner: {
      width: '100%',
      backgroundColor: '#ffffff',
      padding: '60px 100px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      marginBottom: '60px',
    },
    bannerContent: {
      maxWidth: '50%',
    },
    bannerTitle: {
      color: '#1f2937',
      fontWeight: 700,
      fontSize: '40px',
      lineHeight: '1.2',
      marginBottom: '20px',
    },
    bannerSubtitle: {
      color: '#6b7280',
      fontWeight: 400,
      fontSize: '16px',
      marginBottom: '30px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '20px',
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'background 0.2s',
    },
    bannerImage: {
      maxWidth: '45%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    aboutSection: {
      width: '100%',
      padding: '60px 100px',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '60px',
    },
    aboutImage: {
      maxWidth: '40%',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    aboutContent: {
      maxWidth: '50%',
    },
    aboutTitle: {
      color: '#3b82f6',
      fontWeight: 600,
      fontSize: '36px',
      marginBottom: '20px',
    },
    aboutText: {
      color: '#1f2937',
      fontWeight: 400,
      fontSize: '16px',
      marginBottom: '30px',
    },
    exploreButton: {
      padding: '12px 24px',
      backgroundColor: '#10b981',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'background 0.2s',
    },
    offerSection: {
      width: '100%',
      padding: '60px 100px',
      backgroundColor: '#f3f4f6',
      marginBottom: '60px',
    },
    offerHeader: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    offerTitle: {
      color: '#1f2937',
      fontWeight: 600,
      fontSize: '32px',
      marginBottom: '12px',
    },
    offerSubtitle: {
      color: '#6b7280',
      fontWeight: 400,
      fontSize: '16px',
    },
    offerCards: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      flexWrap: 'wrap',
    },
    card: {
      width: '280px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      padding: '24px',
      textAlign: 'center',
      transition: 'transform 0.2s',
    },
    cardTitle: {
      color: '#1f2937',
      fontWeight: 600,
      fontSize: '18px',
      marginBottom: '20px',
    },
    cardLink: {
      color: '#3b82f6',
      fontWeight: 500,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
    instructorSection: {
      width: '100%',
      padding: '60px 100px',
      backgroundColor: '#ffffff',
      marginBottom: '60px',
      textAlign: 'center',
    },
    instructorTitle: {
      color: '#1f2937',
      fontWeight: 600,
      fontSize: '32px',
      marginBottom: '40px',
    },
    instructorCard: {
      width: '300px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      animation: 'fadeIn 1s ease-in-out',
    },
    instructorImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      margin: '0 auto 20px',
      objectFit: 'cover',
    },
    statsSection: {
      width: '100%',
      padding: '60px 100px',
      backgroundColor: '#f9fafb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '60px',
    },
    statsContent: {
      maxWidth: '50%',
    },
    statsTitle: {
      color: '#1f2937',
      fontWeight: 600,
      fontSize: '28px',
      marginBottom: '16px',
    },
    statsSubtitle: {
      color: '#6b7280',
      fontWeight: 400,
      fontSize: '16px',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '20px',
    },
    statItem: {
      textAlign: 'center',
    },
    statNumber: {
      color: '#3b82f6',
      fontWeight: 700,
      fontSize: '28px',
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: 400,
      fontSize: '14px',
    },
    formSection: {
      width: '100%',
      maxWidth: '500px',
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      margin: '0 auto 60px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: '#f9fafb',
    },
    textarea: {
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      minHeight: '120px',
      backgroundColor: '#f9fafb',
    },
    errorText: {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '5px',
    },
    submitButton: {
      padding: '12px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background 0.2s',
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <h1 style={styles.bannerTitle}>Learn to Drive with Ease</h1>
          <p style={styles.bannerSubtitle}>
            Connect with certified instructors for a seamless learning experience.
          </p>
          <div style={styles.buttonGroup}>
            <button
              style={styles.button}
              onClick={() => navigate('/studentPortal')}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
            >
              For Learners
            </button>
            <button
              style={styles.button}
              onClick={() => navigate('/instructorPortal')}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
            >
              For Instructors
            </button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1691371107034-e28ee43a669e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Car on Road"
          style={styles.bannerImage}
        />
      </div>

      {/* About */}
      <div id="about" style={styles.aboutSection}>
        <img
          src="https://images.unsplash.com/photo-1587808326264-bb8e737b1f4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D0"
          alt="Driving Lesson"
          style={styles.aboutImage}
        />
        <div style={styles.aboutContent}>
          <h2 style={styles.aboutTitle}>About Us</h2>
          <p style={styles.aboutText}>
            Learn2Drive connects aspiring drivers with certified instructors, offering personalized lessons, easy booking, and secure payments. Our platform ensures you gain the confidence and skills needed to hit the road safely.
          </p>
          <button
            style={styles.exploreButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
          >
            Explore More
          </button>
        </div>
      </div>

      {/* What We Offer */}
      <div style={styles.offerSection}>
        <div style={styles.offerHeader}>
          <h2 style={styles.offerTitle}>What We Offer</h2>
          <p style={styles.offerSubtitle}>
            Tailored driving lessons, seamless scheduling, and a student-focused experience.
          </p>
        </div>
        <div style={styles.offerCards}>
          {[
            { title: 'Personalized Matching', path: '/instructor-match' },
            { title: 'Easy Scheduling', path: '/scheduling' },
            { title: 'Secure Payments', path: '/payments' },
          ].map((offer, index) => (
            <div
              key={index}
              style={styles.card}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              <h3 style={styles.cardTitle}>{offer.title}</h3>
              <span
                style={styles.cardLink}
                onClick={() => navigate(offer.path)}
                onMouseOver={(e) => (e.target.style.color = '#2563eb')}
                onMouseOut={(e) => (e.target.style.color = '#3b82f6')}
              >
                Read More
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Instructors */}
      <div style={styles.instructorSection}>
        <h2 style={styles.instructorTitle}>Meet Our Top Instructors</h2>
        <div style={styles.instructorCard}>
          <img
            src={instructors[currentInstructor].img}
            alt={instructors[currentInstructor].name}
            style={styles.instructorImage}
          />
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
            {instructors[currentInstructor].name}
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Rating: {instructors[currentInstructor].rating} ★
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsSection}>
        <div style={styles.statsContent}>
          <h2 style={styles.statsTitle}>Driving Success</h2>
          <p style={styles.statsSubtitle}>Join over 2,000 satisfied learners.</p>
        </div>
        <div style={styles.statsGrid}>
          {[
            { number: '200+', label: 'Certified Instructors' },
            { number: '2,334', label: 'Users' },
            { number: '828K', label: 'Lessons Conducted' },
            { number: '1,926', label: 'Payments Processed' },
          ].map((stat, index) => (
            <div key={index} style={styles.statItem}>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div style={styles.formSection}>
        <h3 style={{ textAlign: 'center', color: '#1f2937', fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>
          Get in Touch
        </h3>
        <form style={styles.form} onSubmit={handleSubmit}>
          {errors.submit && <span style={styles.errorText}>{errors.submit}</span>}
          {[
            { label: 'Name', name: 'name', type: 'text', placeholder: 'Your Name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'example@gmail.com' },
            { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message...' },
          ].map((field, index) => (
            <div key={index} style={styles.inputGroup}>
              <label style={{ fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={styles.textarea}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={styles.input}
                />
              )}
              {errors[field.name] && <span style={styles.errorText}>{errors[field.name]}</span>}
            </div>
          ))}
          <button
            type="submit"
            style={styles.submitButton}
            disabled={isLoading}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Learn2Drive;