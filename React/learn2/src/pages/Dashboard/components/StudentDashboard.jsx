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
  Paper,
  Alert
} from '@mui/material';
import { 
  People as PeopleIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  RateReview as ReviewIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import axios from 'axios';

const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userName = userInfo?.name || 'User';
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
    { 
      title: 'Progress', 
      value: '65%', 
      icon: <SchoolIcon sx={{ fontSize: 40 }} />, 
      color: '#0f3643',
      bgColor: 'rgba(15, 54, 67, 0.1)'
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
    const checkApplicationStatus = async () => {
      try {
        const response = await axios.get('/api/instructor-application/status');
        setApplicationStatus(response.data.status);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    checkApplicationStatus();
  }, []);

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
        {/* Browse Instructors Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '16px'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Browse Instructors
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
                Find the perfect instructor for you
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={6} sm={3} key={item}>
                    <Box sx={{ 
                      p: 2, 
                      textAlign: 'center',
                      borderRadius: '12px',
                      backgroundColor: '#f1f5f9',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }
                    }}>
                      <Avatar sx={{ 
                        width: 56, 
                        height: 56, 
                        mx: 'auto',
                        mb: 1,
                        bgcolor: '#28c1c6'
                      }}>
                        <PeopleIcon />
                      </Avatar>
                      <Typography variant="body2">Instructor</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
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
                View All Instructors
              </Button>
            </CardContent>
          </Card>
        </Grid>

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
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#0f3643' }}>
                Instructor Feedback
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
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
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {feedback.instructor}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                              {feedback.date}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                              {feedback.skills.map((skill, index) => (
                                <Typography 
                                  key={index} 
                                  variant="caption" 
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
                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                              {feedback.comment}
                            </Typography>
                          </Box>
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

export default StudentDashboard; 