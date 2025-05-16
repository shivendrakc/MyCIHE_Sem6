import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import { AccessTime, Cancel, Edit, CheckCircle, Warning } from '@mui/icons-material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Bookings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings. Please try again.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/bookings/${selectedBooking._id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      fetchBookings(); // Refresh bookings after cancellation
      setOpenCancelDialog(false);
    } catch (err) {
      setError('Failed to cancel booking. Please try again.');
      console.error('Error cancelling booking:', err);
    }
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'upcoming':
        return <Chip icon={<AccessTime />} label="Upcoming" color="primary" />;
      case 'completed':
        return <Chip icon={<CheckCircle />} label="Completed" color="success" />;
      case 'cancelled':
        return <Chip icon={<Warning />} label="Cancelled" color="error" />;
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    switch (activeTab) {
      case 0:
        return booking.status === 'upcoming';
      case 1:
        return booking.status === 'completed';
      case 2:
        return booking.status === 'cancelled';
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, color: '#0f3643' }}>
        My Bookings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {location.state?.paymentSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Payment successful! Your booking has been confirmed.
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="Upcoming" />
        <Tab label="Completed" />
        <Tab label="Cancelled" />
      </Tabs>

      {filteredBookings.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No bookings found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" sx={{ color: '#0f3643' }}>
                        {booking.instructor?.user?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Duration: {booking.duration} hour(s)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${booking.amount}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                      {getStatusChip(booking.status)}
                      {booking.status === 'upcoming' && (
                        <Box sx={{ mt: 2 }}>
                          <IconButton
                            color="primary"
                            onClick={() => {/* Handle reschedule */}}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleCancelClick(booking)}
                          >
                            <Cancel />
                          </IconButton>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
      >
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this booking? Please note that cancellations within 24 hours of the lesson may be subject to a cancellation fee.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)}>No, Keep It</Button>
          <Button onClick={handleCancelConfirm} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bookings; 