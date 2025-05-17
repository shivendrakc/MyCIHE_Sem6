import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card,
  CardContent, 
  Avatar, 
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  People as PeopleIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  RateReview as ReviewIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AdminPanelSettings as AdminIcon,
  Group as GroupIcon,
  Assessment as AnalyticsIcon,
  Assignment as ApplicationsIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo?.name || 'User';
  const userRole = userInfo?.role || 'student';
  const navigate = useNavigate();
  const isInstructor = userInfo?.role === 'instructor';

  // Debug log to check role
  console.log('Current user role:', userRole);

  // Role-based rendering
  if (userRole === 'admin') {
    return <AdminDashboard />;
  } else if (userRole === 'instructor') {
    return <InstructorDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

// Rename the existing return statement to StudentDashboard
const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo?.name || 'User';
  const userRole = userInfo?.role || 'student';
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [formData, setFormData] = useState({
    experience: '',
    qualifications: '',
    licenseNumber: '',
    vehicleDetails: '',
    availability: '',
    bio: ''
  });

  const stats = [
    { 
      title: 'Lessons Booked', 
      value: '8', 
      icon: <CalendarIcon sx={{ fontSize: 40 }} />, 
      color: '#28c1c6',
      bgColor: 'rgba(40, 193, 198, 0.1)'
    },
    { 
      title: 'Last Instructor', 
      value: 'Sarah', 
      icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
      color: '#1b9aa0',
      bgColor: 'rgba(27, 154, 160, 0.1)'
    },
  ];

  const upcomingLessons = [
    { id: 1, day: 'Tomorrow', time: '10:00 AM', instructor: 'Sarah Taylor' },
    { id: 2, day: 'Friday', time: '2:30 PM', instructor: 'Sarah Taylor' },
  ];

  const recentFeedback = [
    { 
      id: 1, 
      instructor: 'Sarah Taylor',
      date: 'May 15, 2023',
      skills: ['Parallel Parking', 'Highway Driving'],
      comment: 'Great improvement on parallel parking! Highway merging still needs practice, but overall good progress.'
    },
    { 
      id: 2, 
      instructor: 'Sarah Taylor',
      date: 'May 8, 2023',
      skills: ['Roundabouts', 'Signaling'],
      comment: "You're handling roundabouts much better. Remember to signal earlier when changing lanes."
    },
  ];

  useEffect(() => {
    // Check if user has already applied
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get('/api/instructor-application/status');
        setApplicationStatus(response.data.status);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    if (userRole === 'student') {
      checkApplicationStatus();
    }
  }, [userRole]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/instructor-application', formData);
      setApplicationStatus('pending');
      setShowInstructorForm(false);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // If user is an instructor, render instructor dashboard
  if (userRole === 'instructor') {
    return <InstructorDashboard />;
  }

  // Student dashboard with instructor application option
  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      maxWidth: '1600px',
      mx: 'auto'
    }}>
      {/* Welcome Section */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: '#0f3643',
          mb: 1
        }}>
          Welcome back, {userName} 👋
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: '#64748b',
          mb: 2
        }}>
          Ready for your next driving lesson?
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1
        }}>
          <TrendingUpIcon sx={{ color: '#10b981' }} />
          <Typography variant="body2" sx={{ color: '#10b981' }}>
            Your progress is improving steadily
          </Typography>
        </Box>
      </Paper>

      {/* Application Status Alert */}
      {applicationStatus && (
        <Alert 
          severity={applicationStatus === 'pending' ? 'info' : 'success'} 
          sx={{ mb: 3, borderRadius: '12px' }}
          icon={applicationStatus === 'pending' ? <WarningIcon /> : <CheckCircleIcon />}
        >
          {applicationStatus === 'pending' 
            ? 'Your instructor application is under review' 
            : 'Your instructor application has been approved!'}
        </Alert>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '16px',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    backgroundColor: stat.bgColor,
                    borderRadius: '12px',
                    p: 2,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                  </Box>
                  <Box>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
       

        {/* Upcoming Lessons Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Upcoming Lessons
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                Your scheduled driving lessons
              </Typography>
              <List>
                {upcomingLessons.map((lesson) => (
                  <React.Fragment key={lesson.id}>
                    <ListItem 
                      sx={{ 
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(40, 193, 198, 0.1)',
                          borderRadius: '8px'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#28c1c6' }}>
                          <CalendarIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {lesson.day}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                              {lesson.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            Instructor: {lesson.instructor}
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                  }
                }}
              >
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Book a Lesson Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Book a Lesson
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                Schedule your next driving lesson
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                Quick and easy booking process
              </Typography>
              <Button 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                  }
                }}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        </Grid>

       {/* Instructor Feedback Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="div" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Instructor Feedback
              </Typography>
              <Typography variant="body2" component="div" sx={{ mb: 3, color: '#64748b' }}>
                Review your progress and feedback
              </Typography>
              <List>
                {recentFeedback.map((feedback) => (
                  <React.Fragment key={feedback.id}>
                    <ListItem 
                      sx={{ 
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(40, 193, 198, 0.1)',
                          borderRadius: '8px'
                        }
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#28c1c6' }}>
                          <ReviewIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
  primary={
    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
      {feedback.instructor}
    </Typography>
  }
  secondary={
    <Typography component="span" variant="body2">
      <Typography variant="caption" component="div" sx={{ color: '#64748b' }}>
        {feedback.date}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        {feedback.skills.map((skill, index) => (
          <Typography 
            key={index} 
            variant="caption" 
            component="span"
            sx={{ 
              backgroundColor: 'rgba(40, 193, 198, 0.1)',
              color: '#28c1c6',
              px: 1,
              py: 0.5,
              borderRadius: '4px'
            }}
          >
            {skill}
          </Typography>
        ))}
      </Box>

      <Typography variant="body2" component="div" sx={{ mt: 1, color: '#64748b' }}>
        {feedback.comment}
      </Typography>
    </Typography>
  }
/>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button 
                variant="contained" 
                endIcon={<ArrowForwardIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                  }
                }}
              >
                View Feedback
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Instructor Dashboard Component
const InstructorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch instructor-specific data
    const fetchInstructorData = async () => {
      try {
        const [bookingsRes, earningsRes, reviewsRes] = await Promise.all([
          axios.get('/api/instructor/bookings'),
          axios.get('/api/instructor/earnings'),
          axios.get('/api/instructor/reviews')
        ]);
        setBookings(bookingsRes.data);
        setEarnings(earningsRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorData();
  }, []);

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      maxWidth: '1600px',
      mx: 'auto'
    }}>
      {/* Instructor Dashboard Content */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: '#0f3643',
          mb: 1
        }}>
          Instructor Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: '#64748b',
          mb: 2
        }}>
          Manage your driving lessons and students
        </Typography>
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Profile Management Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Profile Management
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                Update your profile information, teaching details, and vehicle information to attract more students.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/dashboard/instructor-profile"
                sx={{
                  background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                  },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Manage Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Existing Stats Cards */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Total Bookings</Typography>
              <Typography variant="h4" sx={{ color: '#28c1c6' }}>{bookings.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Total Earnings</Typography>
              <Typography variant="h4" sx={{ color: '#1b9aa0' }}>${earnings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Average Rating</Typography>
              <Typography variant="h4" sx={{ color: '#0f3643' }}>
                {reviews.length > 0 
                  ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                  : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Bookings */}
      <Card sx={{ 
        mb: 4,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '16px'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#0f3643' }}>Upcoming Bookings</Typography>
          <List>
            {bookings.map((booking) => (
              <ListItem 
                key={booking.id}
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(40, 193, 198, 0.1)',
                    borderRadius: '8px'
                  }
                }}
              >
                <ListItemText
                  primary={booking.studentName}
                  secondary={`${booking.date} at ${booking.time}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card sx={{ 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '16px'
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#0f3643' }}>Recent Reviews</Typography>
          <List>
            {reviews.map((review) => (
              <ListItem 
                key={review.id}
                sx={{ 
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(40, 193, 198, 0.1)',
                    borderRadius: '8px'
                  }
                }}
              >
                <ListItemText
                  primary={review.studentName}
                  secondary={review.comment}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

const AdminDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo?.name || 'Admin';
  const [adminStatsData, setAdminStats] = useState({
    totalUsers: 0,
    pendingApplications: 0,
    activeInstructors: 0,
    totalBookings: 0
  });
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch admin statistics
    const fetchAdminStats = async () => {
      try {
        const response = await axios.get('/api/admin/stats');
        setAdminStats(response.data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setError('Failed to fetch admin statistics');
      }
    };

    // Fetch instructor applications
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/api/instructor-application/all');
        const fetchedApps = response.data;
        setApplications(Array.isArray(fetchedApps) ? fetchedApps : []);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to fetch applications');
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
    fetchApplications();
  }, []);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleApprove = async (applicationId) => {
    try {
      await axios.put(`/api/instructor-application/${applicationId}/status`, {
        status: 'approved'
      });
      // Refresh applications and stats
      const [statsResponse, appsResponse] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/instructor-application/all')
      ]);
      setAdminStats(statsResponse.data);
      setApplications(appsResponse.data);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.put(`/api/instructor-application/${applicationId}/status`, {
        status: 'rejected',
        rejectionReason
      });
      // Refresh applications and stats
      const [statsResponse, appsResponse] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/instructor-application/all')
      ]);
      setAdminStats(statsResponse.data);
      setApplications(appsResponse.data);
      setOpenDialog(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'resubmitted':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status, resubmissionCount) => {
    if (status === 'resubmitted') {
      return `Resubmitted (${resubmissionCount || 1})`;
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const adminStats = [
    { 
      title: 'Total Users', 
      value: adminStatsData.totalUsers, 
      icon: <GroupIcon sx={{ fontSize: 40 }} />, 
      color: '#28c1c6',
      bgColor: 'rgba(40, 193, 198, 0.1)'
    },
    { 
      title: 'Pending Applications', 
      value: adminStatsData.pendingApplications, 
      icon: <ApplicationsIcon sx={{ fontSize: 40 }} />, 
      color: '#ebcc34',
      bgColor: 'rgba(235, 204, 52, 0.1)'
    },
    { 
      title: 'Active Instructors', 
      value: adminStatsData.activeInstructors, 
      icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    { 
      title: 'Total Bookings', 
      value: adminStatsData.totalBookings, 
      icon: <CalendarIcon sx={{ fontSize: 40 }} />, 
      color: '#0f3643',
      bgColor: 'rgba(15, 54, 67, 0.1)'
    }
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      maxWidth: '1600px',
      mx: 'auto'
    }}>
      {/* Admin Welcome Section */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: '#0f3643',
          mb: 1
        }}>
          Welcome back, {userName} 👋
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: '#64748b',
          mb: 2
        }}>
          Manage your platform efficiently
        </Typography>
      </Paper>

      {/* Admin Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {adminStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '16px',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    backgroundColor: stat.bgColor,
                    borderRadius: '12px',
                    p: 2,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                  </Box>
                  <Box>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
dash
      

      {/* Application Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Application Details
          {selectedApplication?.status === 'resubmitted' && (
            <Typography variant="subtitle2" color="info">
              Resubmitted {selectedApplication.resubmissionCount || 1} time(s)
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Personal Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Name: {selectedApplication.personalDetails.fullName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Email: {selectedApplication.personalDetails.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Phone: {selectedApplication.personalDetails.phone}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Address: {selectedApplication.personalDetails.address}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Vehicle Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Make: {selectedApplication.vehicleInfo.make}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Model: {selectedApplication.vehicleInfo.model}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Year: {selectedApplication.vehicleInfo.year}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>License Plate: {selectedApplication.vehicleInfo.licensePlate}</Typography>
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Experience
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>Years of Experience: {selectedApplication.experience.yearsOfExperience}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>Previous Employer: {selectedApplication.experience.previousEmployer}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Teaching Experience: {selectedApplication.experience.teachingExperience}</Typography>
                </Grid>
              </Grid>

              {(selectedApplication.status === 'pending' || selectedApplication.status === 'resubmitted') && (
                <Box sx={{ mt: 4 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Rejection Reason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {(selectedApplication?.status === 'pending' || selectedApplication?.status === 'resubmitted') && (
            <>
              <Button
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => handleReject(selectedApplication._id)}
                disabled={!rejectionReason}
              >
                Reject
              </Button>
              <Button
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => handleApprove(selectedApplication._id)}
              >
                Approve
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 