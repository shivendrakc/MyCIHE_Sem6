import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load user data from API
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(prev => ({
          ...prev,
          name: response.data.name || ''
        }));
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data');
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: user.name
      };

      // Only include password fields if they're being changed
      if (user.oldPassword && user.newPassword) {
        if (user.newPassword !== user.confirmPassword) {
          setError('New passwords do not match');
          return;
        }
        updateData.oldPassword = user.oldPassword;
        updateData.newPassword = user.newPassword;
      }

      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Profile updated successfully');
      setOpenSnackbar(true);
      
      // Clear password fields
      setUser(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      // Update localStorage with new name
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      localStorage.setItem('userInfo', JSON.stringify({
        ...userInfo,
        name: response.data.user.name
      }));

    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Profile
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <form onSubmit={handleSubmit}>
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
            label="Old Password"
            name="oldPassword"
            type="password"
            value={user.oldPassword}
            onChange={handleChange}
            margin="normal"
            helperText="Required to change password"
          />

          <TextField
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
            value={user.newPassword}
            onChange={handleChange}
            margin="normal"
            helperText="Leave blank to keep current password"
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
            margin="normal"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Update Profile
          </Button>
        </form>
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