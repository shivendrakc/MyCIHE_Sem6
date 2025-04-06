import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profileName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthdate: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.profileName) {
      newErrors.profileName = 'Profile name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Include at least one uppercase letter';
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = 'Include at least one number';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.birthdate) {
      newErrors.birthdate = 'Date of birth is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:3000/api/signup', formData);
        alert(response.data.message);
        navigate('/login');
      } catch (error) {
        alert('Signup failed: ' + error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9fcff',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333'
    },
    socialButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px'
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#eaf6ff',
      fontSize: '14px',
      color: '#007bff'
    },
    divider: {
      textAlign: 'center',
      margin: '20px 0',
      color: '#aaa'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '400px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px',
      backgroundColor: '#eaf6ff'
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px'
    },
    radioGroup: {
      display: 'flex',
      gap: '10px'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '14px'
    },
    submitButton: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    terms: {
      fontSize: '12px',
      textAlign: 'center',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Sign Up to Enlighten Your Driving Journey</h1>
      </header>

      <div style={styles.socialButtons}>
        <div style={styles.socialButton}>
          <img
            src="https://img.icons8.com/color/48/000000/facebook-new.png"
            alt="Facebook"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Sign up with Facebook
        </div>
        <div style={styles.socialButton}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Sign up with Google
        </div>
        <div style={styles.socialButton}>
          <img
            src="https://img.icons8.com/color/48/000000/twitter--v1.png"
            alt="Twitter"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Sign up with Twitter
        </div>
      </div>

      <div style={styles.divider}>OR</div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="profileName">Profile Name</label>
          <input
            type="text"
            id="profileName"
            name="profileName"
            value={formData.profileName}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.profileName && <span style={styles.errorText}>{errors.profileName}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <span style={styles.errorText}>{errors.email}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <span style={styles.errorText}>{errors.password}</span>}
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
        </div>

        <fieldset style={styles.inputGroup}>
          <legend>What's your gender? (optional)</legend>
          <div style={styles.radioGroup}>
            {['Male', 'Female', 'Non-binary'].map(gender => (
              <label key={gender}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.toLowerCase()}
                  checked={formData.gender === gender.toLowerCase()}
                  onChange={handleChange}
                />
                {gender}
              </label>
            ))}
          </div>
        </fieldset>

        <div style={styles.inputGroup}>
          <label htmlFor="birthdate">Date of Birth</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.birthdate && <span style={styles.errorText}>{errors.birthdate}</span>}
        </div>

        <div style={styles.checkboxGroup}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">
            I agree to the <Link to="/terms">Terms of Use</Link> and <Link to="/privacy">Privacy Policy</Link>.
          </label>
        </div>

        <button type="submit" style={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <div style={styles.terms}>
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
};

export default SignUp;