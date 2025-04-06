import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Learn2Drive = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call (Replace with actual API call if available)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Inquiry submitted:', formData);
        // Dependency: Assumes a '/thank-you' route exists in your router configuration (e.g., App.js)
        navigate('/thank-you');
      } catch (error) {
        console.error('Submission failed:', error);
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle navigation to instructor page
  const handleInstructorClick = () => {
    // Dependency: Assumes an '/instructors' route exists in your router configuration (e.g., App.js)
    navigate('/instructors');
  };

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh', // Allow scrolling by using minHeight
      background: 'rgba(205,243,255,1)',
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '80px', // Add padding to account for fixed navbar height
      paddingBottom: '50px', // Add padding at the bottom to avoid overlap with footer
    },
    banner: {
      width: '100%',
      background: 'rgba(255,255,255,1)',
      padding: '50px 100px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      marginBottom: '50px', // Add spacing
    },
    bannerContent: {
      maxWidth: '50%',
    },
    bannerTitle: {
      color: 'rgba(77,77,77,1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '36px',
      textAlign: 'left',
      marginBottom: '20px',
    },
    bannerSubtitle: {
      color: 'rgba(153,97,97,1)',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
      textAlign: 'left',
      marginBottom: '30px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
    },
    learnerButton: {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: '#007bff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
    },
    instructorButton: {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: '#007bff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
    },
    bannerImage: {
      maxWidth: '40%',
      height: 'auto',
    },
    aboutSection: {
      width: '100%',
      padding: '50px 100px',
      background: 'rgba(250,250,250,1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '50px', // Add spacing
    },
    aboutImage: {
      maxWidth: '40%',
      height: 'auto',
    },
    aboutContent: {
      maxWidth: '50%',
    },
    aboutTitle: {
      color: 'rgba(56,122,144,1)',
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '48px',
      textAlign: 'left',
      marginBottom: '20px',
    },
    aboutText: {
      color: 'rgba(0,0,0,1)',
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: '16px',
      textAlign: 'left',
      marginBottom: '30px',
    },
    exploreButton: {
      color: 'rgba(255,255,255,1)',
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '14px',
      textAlign: 'center',
      backgroundColor: '#007bff',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
    },
    offerSection: {
      width: '100%',
      padding: '50px 100px',
      background: 'rgba(205,243,255,1)',
      marginBottom: '50px', // Add spacing
    },
    offerHeader: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    offerTitle: {
      color: 'rgba(56,122,144,1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '30px',
      marginBottom: '10px',
    },
    offerSubtitle: {
      color: 'rgba(113,113,113,1)',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
    },
    offerCards: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
    },
    card: {
      width: '256px',
      background: 'rgba(245,247,249,1)',
      borderRadius: '5px',
      boxShadow: '0px 5.57px 11px rgba(0.67, 0.75, 0.82, 0.4)',
      padding: '20px',
      textAlign: 'center',
    },
    cardTitle: {
      color: 'rgba(113,113,113,1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '16px',
      marginBottom: '20px',
    },
    cardLink: {
      color: 'rgba(56,122,144,1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '14px',
      cursor: 'pointer',
    },
    statsSection: {
      width: '100%',
      padding: '50px 100px',
      background: 'rgba(245,247,249,1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '50px', // Add spacing
    },
    statsContent: {
      maxWidth: '50%',
    },
    statsTitle: {
      color: 'rgba(77,77,77,1)',
      fontFamily: 'Inter',
      fontWeight: 600,
      fontSize: '25px',
      textAlign: 'left',
      marginBottom: '10px',
    },
    statsSubtitle: {
      color: 'rgba(24,25,31,1)',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
      textAlign: 'left',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    statNumber: {
      color: 'rgba(77,77,77,1)',
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '24px',
    },
    statLabel: {
      color: 'rgba(113,113,113,1)',
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '14px',
    },
    formSection: {
      width: '100%',
      maxWidth: '500px',
      background: '#fff',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      margin: '0 auto 50px auto', // Add spacing
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
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
    },
    textarea: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      minHeight: '120px',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
    submitButton: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.bannerTitle}>Find your mate Learn2Drive with Ease</div>
          <div style={styles.bannerSubtitle}>
            Connecting Aspiring Drivers with Certified Instructors for a Seamless Learning Experience.
          </div>
            <div style={styles.buttonGroup}>
              <button
                style={styles.learnerButton}
                onClick={() => navigate('/instructorPortal')}>
                For Learners
              </button>
              <button
                style={styles.instructorButton}
                onClick={() => navigate('/studentPortal')}>
                For Instructors
              </button>
            </div>
        </div>
        {/* Placeholder for car image (you can replace with an actual image URL) */}
        <img
          src="https://via.placeholder.com/400x200?text=Car+Image"
          alt="Car"
          style={styles.bannerImage}
        />
      </div>

      {/* About */}
      <div style={styles.aboutSection}>
        {/* Placeholder for about image (you can replace with an actual image URL) */}
        <img
          src="https://via.placeholder.com/400x300?text=About+Image"
          alt="About"
          style={styles.aboutImage}
        />
        <div style={styles.aboutContent}>
          <span style={styles.aboutTitle}>About</span>
          <span style={styles.aboutText}>
            Learn2Drive is a dynamic platform dedicated to connecting aspiring drivers with certified instructors, providing personalized lessons tailored to individual needs. We simplify the learning experience through an easy-to-use booking system, secure payments, and real-time progress tracking, ensuring every learner gains confidence and skills for the road ahead.
          </span>
          <button style={styles.exploreButton}>Explore</button>
        </div>
      </div>

      {/* What We Offer */}
      <div style={styles.offerSection}>
        <div style={styles.offerHeader}>
          <span style={styles.offerTitle}>What We Offer?</span>
          <span style={styles.offerSubtitle}>
            Empowering learners to find the perfect driving instructor with personalized lessons, easy scheduling, and secure payments. Gain confidence on the road with our seamless, student-focused platform.
          </span>
        </div>
        <div style={styles.offerCards}>
          <div style={styles.card}>
            <span style={styles.cardTitle}>Personalized Instructor Matching</span>
            {/* Dependency: Assumes an '/instructor-match' route exists in your router configuration (e.g., App.js) */}
            <span style={styles.cardLink} onClick={() => navigate('/instructor-match')}>
              Read more
            </span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardTitle}>Easy Lesson Scheduling</span>
            {/* Dependency: Assumes a '/scheduling' route exists in your router configuration (e.g., App.js) */}
            <span style={styles.cardLink} onClick={() => navigate('/scheduling')}>
              Read more
            </span>
          </div>
          <div style={styles.card}>
            <span style={styles.cardTitle}>Secure Payments and Progress Tracking</span>
            {/* Dependency: Assumes a '/payments' route exists in your router configuration (e.g., App.js) */}
            <span style={styles.cardLink} onClick={() => navigate('/payments')}>
              Read more
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsSection}>
        <div style={styles.statsContent}>
          <span style={styles.statsTitle}>Helping a local Youths to Drive with Ease</span>
          <span style={styles.statsSubtitle}>Over 2000 Satisfied Members</span>
        </div>
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>2,00</span>
            <span style={styles.statLabel}>Certified Instructors</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>2,334</span>
            <span style={styles.statLabel}>Users</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>828,867</span>
            <span style={styles.statLabel}>Lessons Conducted</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>1,926</span>
            <span style={styles.statLabel}>Payments</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div style={styles.formSection}>
        <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>
          Contact Us
        </h3>
        <form style={styles.form} onSubmit={handleSubmit}>
          {errors.submit && <span style={styles.errorText}>{errors.submit}</span>}

          <div style={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              style={styles.input}
            />
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              style={styles.input}
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              style={styles.textarea}
            />
            {errors.message && <span style={styles.errorText}>{errors.message}</span>}
          </div>

          <button type="submit" style={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Learn2Drive;