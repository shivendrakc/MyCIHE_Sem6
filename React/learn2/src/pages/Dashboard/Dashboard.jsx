import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { 
  People as PeopleIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const stats = [
    { title: 'Total Students', value: '1,234', icon: <PeopleIcon sx={{ fontSize: 40 }} />, color: '#1976d2' },
    { title: 'Active Courses', value: '24', icon: <SchoolIcon sx={{ fontSize: 40 }} />, color: '#2e7d32' },
    { title: 'Assignments', value: '156', icon: <AssignmentIcon sx={{ fontSize: 40 }} />, color: '#ed6c02' },
    { title: 'Events', value: '12', icon: <EventIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    backgroundColor: `${stat.color}20`,
                    borderRadius: '50%',
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
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

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activities
              </Typography>
              {/* Activity list will be added here */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Upcoming Events
              </Typography>
              {/* Events list will be added here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 