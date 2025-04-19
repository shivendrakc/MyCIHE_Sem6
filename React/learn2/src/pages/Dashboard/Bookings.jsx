import React, { useState } from 'react';
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
  Tab
} from '@mui/material';
import { AccessTime, Cancel, Edit, CheckCircle, Warning } from '@mui/icons-material';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Mock data - replace with actual API calls
  const bookings = [
    {
      id: 1,
      instructor: 'John Smith',
      date: '2024-03-15',
      time: '10:00 AM',
      duration: 2,
      status: 'upcoming',
      price: '$100'
    },
    {
      id: 2,
      instructor: 'Jane Doe',
      date: '2024-03-10',
      time: '02:00 PM',
      duration: 1,
      status: 'completed',
      price: '$50'
    },
    {
      id: 3,
      instructor: 'Mike Johnson',
      date: '2024-03-05',
      time: '11:00 AM',
      duration: 1,
      status: 'cancelled',
      price: '$45'
    }
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    // Handle cancellation logic
    console.log('Cancelling booking:', selectedBooking);
    setOpenCancelDialog(false);
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        My Bookings
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="Upcoming" />
        <Tab label="Completed" />
        <Tab label="Cancelled" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredBookings.map((booking) => (
          <Grid item xs={12} key={booking.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">
                      {booking.instructor}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Duration: {booking.duration} hour(s)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {booking.price}
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