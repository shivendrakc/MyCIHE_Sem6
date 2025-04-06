import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login successful:', formData);
        navigate('/dashboard'); // Redirect after login
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ submit: 'Invalid email or password' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#eaf6ff',
      fontFamily: 'Arial, sans-serif'
    },
    loginContainer: {
      display: 'flex',
      width: '80%',
      maxWidth: '900px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    leftSection: {
      flex: 1,
      backgroundColor: '#f0f8ff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    },
    rightSection: {
      flex: 1,
      padding: '40px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333'
    },
    socialLogin: {
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
      backgroundColor: '#fff',
      fontSize: '14px'
    },
    divider: {
      textAlign: 'center',
      margin: '20px 0',
      color: '#aaa'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '14px'
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px'
    },
    rememberMe: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    loginButton: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px'
    },
    signupPrompt: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        <div style={styles.leftSection}>
          <img
            src="https://via.placeholder.com/300"
            alt="Login Illustration"
            style={{ maxWidth: '100%' }}
          />
        </div>
        <div style={styles.rightSection}>
          <div style={styles.header}>
            <h1>Welcome to Learn2Drive</h1>
          </div>

          <div style={styles.socialLogin}>
            <div
              style={styles.socialButton}
              onClick={() => handleSocialLogin('google')}
            >
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                style={{ width: '20px', marginRight: '10px' }}
              />
              Login with Google
            </div>
            <div
              style={styles.socialButton}
              onClick={() => handleSocialLogin('facebook')}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                style={{ width: '20px', marginRight: '10px' }}
              />
              Login with Facebook
            </div>
          </div>

          <div style={styles.divider}>OR</div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {errors.submit && <div style={styles.errorText}>{errors.submit}</div>}

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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="***********"
                style={styles.input}
              />
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
              <Link to="/forgot-password" style={{ fontSize: '12px', color: '#007bff' }}>
                Forgot Password?
              </Link>
            </div>

            <div style={styles.rememberMe}>
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="remember">Remember me</label>
            </div>

            <button
              type="submit"
              style={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={styles.signupPrompt}>
            <p>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;