import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Divider,
  Avatar,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  LocationOn,
  DirectionsCar,
  AccessTime,
  MonetizationOn,
  Star
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const steps = ['Choose Date & Time', 'Confirm Booking', 'Payment'];

const BookLessons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [duration, setDuration] = useState('1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    if (location.state?.selectedInstructor) {
      setInstructor(location.state.selectedInstructor);
    } else {
      navigate('/dashboard/instructors');
    }
  }, [location, navigate]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBooking = async () => {
    try {
      setLoading(true);
      // Here you would make an API call to create the booking
      // For now, we'll just navigate to a payment page
      navigate('/dashboard/payment', {
        state: {
          bookingDetails: {
            instructor: instructor,
            date: selectedDate,
            duration: parseInt(duration),
            totalAmount: instructor.profile.hourlyRate * parseInt(duration)
          }
        }
      });
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error('Error creating booking:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!instructor) return 0;
    return instructor.profile.hourlyRate * parseInt(duration);
  };

  const renderStepContent = (step) => {
    if (!instructor) return null;

    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar
                      src={instructor.profile.profileImage}
                      alt={instructor.user.name}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                      <Typography variant="h6">{instructor.user.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: '0.875rem', color: '#64748b' }} />
                        <Typography variant="body2" color="text.secondary">
                          {instructor.profile.suburb}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<DirectionsCar sx={{ fontSize: '0.75rem' }} />}
                      label={instructor.profile.method}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(40, 193, 198, 0.1)',
                        color: '#28c1c6',
                        '& .MuiChip-icon': { color: '#28c1c6' }
                      }}
                    />
                    <Chip
                      icon={<AccessTime sx={{ fontSize: '0.75rem' }} />}
                      label={`${instructor.profile.experience} years`}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(40, 193, 198, 0.1)',
                        color: '#28c1c6',
                        '& .MuiChip-icon': { color: '#28c1c6' }
                      }}
                    />
                    <Chip
                      icon={<MonetizationOn sx={{ fontSize: '0.75rem' }} />}
                      label={`$${instructor.profile.hourlyRate}/hr`}
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(40, 193, 198, 0.1)',
                        color: '#28c1c6',
                        '& .MuiChip-icon': { color: '#28c1c6' }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  label="Duration"
                >
                  <MenuItem value="1">1 hour</MenuItem>
                  <MenuItem value="2">2 hours</MenuItem>
                  <MenuItem value="3">3 hours</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={instructor.profile.profileImage}
                      alt={instructor.user.name}
                      sx={{ width: 50, height: 50 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {instructor.user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {instructor.profile.suburb}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Date: {selectedDate?.toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Duration: {duration} hour{duration > 1 ? 's' : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Rate per hour:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    ${instructor.profile.hourlyRate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    Hours:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {duration}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    Total:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" align="right" color="primary">
                    ${calculateTotal()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You will be redirected to our secure payment gateway to complete your booking.
              </Typography>
              <Box sx={{ 
                bgcolor: 'rgba(40, 193, 198, 0.1)', 
                p: 2, 
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#28c1c6' }}>
                  Total Amount: ${calculateTotal()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                By proceeding, you agree to our terms and conditions and cancellation policy.
              </Typography>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  if (!instructor) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      maxWidth: '800px',
      mx: 'auto'
    }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#0f3643' }}>
        Book Lessons
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button 
              onClick={handleBack} 
              sx={{ mr: 1 }}
              disabled={loading}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleBooking : handleNext}
            disabled={loading || (activeStep === 0 && !selectedDate)}
            sx={{
              background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
              },
              minWidth: '120px'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeStep === steps.length - 1 ? (
              'Proceed to Payment'
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookLessons; 