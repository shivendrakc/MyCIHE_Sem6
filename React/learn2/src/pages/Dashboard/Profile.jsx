import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider,
  Collapse
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setUser(prev => ({
          ...prev,
          name: response.data.name || '',
          email: response.data.email || ''
        }));
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          navigate('/login');
        } else {
          setError('Failed to load profile data');
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        {
          name: user.name,
          email: user.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Profile updated successfully');
      setOpenSnackbar(true);

      // Update localStorage with new data
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', JSON.stringify({
        ...userInfo,
        name: response.data.user.name,
        email: response.data.user.email
      }));

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (user.newPassword !== user.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/profile',
        {
          oldPassword: user.oldPassword,
          newPassword: user.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Password updated successfully');
      setOpenSnackbar(true);
      
      // Clear password fields
      setUser(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setShowPasswordFields(false);

    } catch (err) {
      console.error('Password update error:', err);
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Profile
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        {/* Basic Info Form */}
        <form onSubmit={handleBasicInfoSubmit}>
          <Typography variant="h6" sx={{ mb: 2 }}>Basic Information</Typography>
          
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
            required
            type="email"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update Basic Information
          </Button>
        </form>

        <Divider sx={{ my: 3 }} />

        {/* Password Change Section */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Password Settings</Typography>
            <Button
              variant="outlined"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              {showPasswordFields ? 'Cancel' : 'Change Password'}
            </Button>
          </Box>

          <Collapse in={showPasswordFields}>
            <form onSubmit={handlePasswordSubmit}>
              <TextField
                fullWidth
                label="Old Password"
                name="oldPassword"
                type="password"
                value={user.oldPassword}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={user.newPassword}
                onChange={handleChange}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Update Password
              </Button>
            </form>
          </Collapse>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 