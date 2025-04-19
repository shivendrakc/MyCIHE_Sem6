import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  MenuItem,
  Rating,
  Chip,
  Paper,
  InputAdornment
} from '@mui/material';
import { LocationOn, DirectionsCar, AccessTime, Search } from '@mui/icons-material';

const Instructors = () => {
  const [filters, setFilters] = useState({
    location: '',
    transmission: '',
    availability: '',
    search: ''
  });

  // Mock data - replace with actual API calls
  const instructors = [
    {
      id: 1,
      name: 'John Smith',
      rating: 4.8,
      location: 'New York',
      transmission: 'Manual',
      availability: 'Weekdays',
      carType: 'Toyota Corolla',
      bio: 'Experienced instructor with 10+ years of teaching.',
      image: 'https://via.placeholder.com/150',
      price: '$50/hour'
    },
    // Add more mock instructors
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Find Instructors
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All Locations</MenuItem>
              <MenuItem value="new-york">New York</MenuItem>
              <MenuItem value="los-angeles">Los Angeles</MenuItem>
              {/* Add more locations */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Transmission"
              name="transmission"
              value={filters.transmission}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DirectionsCar />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="manual">Manual</MenuItem>
              <MenuItem value="automatic">Automatic</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Availability"
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All Times</MenuItem>
              <MenuItem value="weekdays">Weekdays</MenuItem>
              <MenuItem value="weekends">Weekends</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Instructor Cards */}
      <Grid container spacing={3}>
        {instructors.map((instructor) => (
          <Grid item xs={12} sm={6} md={4} key={instructor.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={instructor.image}
                alt={instructor.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {instructor.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={instructor.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({instructor.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {instructor.bio}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<LocationOn />}
                    label={instructor.location}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<DirectionsCar />}
                    label={instructor.carType}
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    icon={<AccessTime />}
                    label={instructor.availability}
                  />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  {instructor.price}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {/* Handle booking */}}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Instructors; 