import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import {
  PhotoCamera,
  Save,
  LocationOn,
  DirectionsCar,
  AccessTime,
  MonetizationOn,
  Description
} from '@mui/icons-material';
import axios from 'axios';

const InstructorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState({
    bio: '',
    suburb: '',
    method: '',
    experience: '',
    hourlyRate: '',
    nationality: '',
    car: {
      make: '',
      model: '',
      year: '',
      transmission: ''
    }
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Get token directly from localStorage
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Backend URL for images
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    if (!token) {
      setError('Please log in to access this page');
      return;
    }
    fetchProfile();
  }, [token]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BACKEND_URL}/api/instructors/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // If we have data, populate the form with existing values
      if (data) {
        setProfile({
          bio: data.bio || '',
          suburb: data.suburb || '',
          method: data.method || '',
          experience: data.experience || '',
          hourlyRate: data.hourlyRate || '',
          nationality: data.nationality || '',
          car: {
            make: data.car?.make || '',
            model: data.car?.model || '',
            year: data.car?.year || '',
            transmission: data.car?.transmission || ''
          }
        });
        
        if (data.profileImage) {
          setPreviewImage(`${BACKEND_URL}${data.profileImage}`);
        } else {
          setPreviewImage('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error.response || error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to load profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('car.')) {
      const carField = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        car: {
          ...prev.car,
          [carField]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to update your profile');
      return;
    }

    // Validate required fields
    const requiredFields = {
      nationality: 'Nationality',
      suburb: 'Suburb',
      'car.year': 'Car year',
      'car.model': 'Car model',
      'car.make': 'Car make',
      method: 'Teaching method',
      experience: 'Years of experience',
      hourlyRate: 'Hourly rate'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (field.includes('car.')) {
        const carField = field.split('.')[1];
        if (!profile.car[carField]) {
          setError(`${label} is required`);
          return;
        }
      } else if (!profile[field]) {
        setError(`${label} is required`);
        return;
      }
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const formDataToSend = new FormData();
      
      // Append all required fields
      formDataToSend.append('bio', profile.bio || '');
      formDataToSend.append('suburb', profile.suburb);
      formDataToSend.append('method', profile.method);
      formDataToSend.append('experience', profile.experience);
      formDataToSend.append('hourlyRate', profile.hourlyRate);
      formDataToSend.append('nationality', profile.nationality);
      
      // Car information
      formDataToSend.append('car.make', profile.car.make);
      formDataToSend.append('car.model', profile.car.model);
      formDataToSend.append('car.year', profile.car.year);
      formDataToSend.append('car.transmission', profile.car.transmission || '');
      
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      console.log('Sending profile data:', {
        bio: profile.bio,
        suburb: profile.suburb,
        method: profile.method,
        experience: profile.experience,
        hourlyRate: profile.hourlyRate,
        nationality: profile.nationality,
        car: profile.car
      });

      const { data } = await axios.put(`${BACKEND_URL}/api/instructors/profile`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('Profile updated successfully');
      if (data.profileImage) {
        setPreviewImage(`${BACKEND_URL}${data.profileImage}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError(error.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#0f3643' }}>
        Instructor Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Profile Image Section */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3, borderRadius: '12px' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Avatar
                    src={previewImage || '/default-profile.png'}
                    alt="Profile"
                    sx={{
                      width: 150,
                      height: 150,
                      border: '3px solid #28c1c6'
                    }}
                  />
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<PhotoCamera />}
                      sx={{
                        borderColor: '#28c1c6',
                        color: '#28c1c6',
                        '&:hover': {
                          borderColor: '#1b9aa0',
                          backgroundColor: 'rgba(40, 193, 198, 0.04)'
                        }
                      }}
                    >
                      Upload Photo
                    </Button>
                  </label>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Basic Information */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3, borderRadius: '12px' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#0f3643' }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Suburb"
                      name="suburb"
                      value={profile.suburb}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Teaching Method"
                      name="method"
                      value={profile.method}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <DirectionsCar sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    >
                      <MenuItem value="Manual">Manual</MenuItem>
                      <MenuItem value="Automatic">Automatic</MenuItem>
                      <MenuItem value="Both">Both</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      name="experience"
                      type="number"
                      value={profile.experience}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <AccessTime sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Hourly Rate ($)"
                      name="hourlyRate"
                      type="number"
                      value={profile.hourlyRate}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <MonetizationOn sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Nationality"
                      name="nationality"
                      value={profile.nationality}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      placeholder="Tell students about your teaching experience and approach..."
                      InputProps={{
                        startAdornment: <Description sx={{ color: '#64748b', mr: 1, mt: 2 }} />
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Vehicle Information */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3, borderRadius: '12px' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, color: '#0f3643' }}>
                  Vehicle Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Car Make"
                      name="car.make"
                      value={profile.car.make}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <DirectionsCar sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Car Model"
                      name="car.model"
                      value={profile.car.model}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <DirectionsCar sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      required
                      label="Year"
                      name="car.year"
                      value={profile.car.year}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <DirectionsCar sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Transmission"
                      name="car.transmission"
                      value={profile.car.transmission}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: <DirectionsCar sx={{ color: '#64748b', mr: 1 }} />
                      }}
                    >
                      <MenuItem value="Manual">Manual</MenuItem>
                      <MenuItem value="Automatic">Automatic</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} /> : <Save />}
                sx={{
                  background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                  },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 4,
                  py: 1.5
                }}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default InstructorProfile; 