import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  LocationOn,
  DirectionsCar,
  AccessTime,
  Search,
  MonetizationOn,
  Star,
  Clear,
  FilterList,
  Tune,
  LocationCity,
  KeyboardArrowDown,
  KeyboardArrowUp
} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Instructors = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filters, setFilters] = useState({
    method: '',
    experience: '',
    priceRange: '',
    search: '',
    suburb: ''
  });
  const [searchFocused, setSearchFocused] = useState(false);
  const [expandedBio, setExpandedBio] = useState({});
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isInstructor = userInfo?.role === 'instructor';
  const isAdmin = userInfo?.role === 'admin';
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get('http://localhost:5000/api/instructors', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        setInstructors(response.data);
      } else {
        setInstructors([]);
      }
    } catch (err) {
      console.error('Error fetching instructors:', err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Failed to fetch instructors';
      setError(errorMessage);
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleBookNow = (instructor) => {
    setSelectedInstructor(instructor);
    setOpenDialog(true);
  };

  const handleConfirmBooking = async () => {
    try {
      // Navigate to book lessons page with selected instructor
      navigate('/dashboard/book-lessons', {
        state: { selectedInstructor }
      });
    } catch (error) {
      console.error('Error handling booking:', error);
    }
    setOpenDialog(false);
  };

  const handleClearFilters = () => {
    setFilters({
      method: '',
      experience: '',
      priceRange: '',
      search: '',
      suburb: ''
    });
  };

  const toggleBio = (id) => {
    setExpandedBio(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredInstructors = instructors.filter(instructor => {
    const matchesMethod = !filters.method || instructor.profile.method === filters.method;
    const matchesExperience = !filters.experience || 
      (filters.experience === '0-5' && instructor.profile.experience <= 5) ||
      (filters.experience === '5-10' && instructor.profile.experience > 5 && instructor.profile.experience <= 10) ||
      (filters.experience === '10+' && instructor.profile.experience > 10);
    const matchesPriceRange = !filters.priceRange || 
      (filters.priceRange === '0-50' && instructor.profile.hourlyRate <= 50) ||
      (filters.priceRange === '50-70' && instructor.profile.hourlyRate > 50 && instructor.profile.hourlyRate <= 70) ||
      (filters.priceRange === '70+' && instructor.profile.hourlyRate > 70);
    const matchesSearch = !filters.search || 
      instructor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      instructor.profile.bio.toLowerCase().includes(filters.search.toLowerCase());
    const matchesSuburb = !filters.suburb || 
      instructor.profile.suburb.toLowerCase().includes(filters.suburb.toLowerCase());

    return matchesMethod && matchesExperience && matchesPriceRange && matchesSearch && matchesSuburb;
  });

  // Get unique suburbs for the filter dropdown
  const uniqueSuburbs = [...new Set(instructors.map(instructor => instructor.profile.suburb))].sort();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Box sx={{ 
        mb: 4,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold',
          color: '#0f3643'
        }}>
          Find Instructors
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          {filteredInstructors.length} instructors available
        </Typography>
      </Box>

      {/* Filters Section */}
      <Paper sx={{ 
        mb: 4,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <Box sx={{ 
          p: 2, 
          bgcolor: '#f8fafc',
          borderBottom: '1px solid',
          borderColor: 'rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Tune sx={{ color: '#28c1c6' }} />
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold',
            color: '#0f3643'
          }}>
            Search & Filters
          </Typography>
          {(filters.method || filters.experience || filters.priceRange || filters.search || filters.suburb) && (
            <Button
              startIcon={<Clear />}
              onClick={handleClearFilters}
              size="small"
              sx={{ 
                ml: 'auto',
                color: '#64748b',
                '&:hover': { color: '#28c1c6' }
              }}
            >
              Clear All
            </Button>
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search by name, location, or expertise..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ 
                    color: searchFocused ? '#28c1c6' : '#64748b',
                    transition: 'color 0.3s ease'
                  }} />
                </InputAdornment>
              ),
              endAdornment: filters.search && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                    size="small"
                    sx={{ 
                      color: '#64748b',
                      '&:hover': { color: '#28c1c6' }
                    }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Filter Controls */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Location"
                name="suburb"
                value={filters.suburb}
                onChange={handleFilterChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationCity sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">All Locations</MenuItem>
                {uniqueSuburbs.map((suburb) => (
                  <MenuItem key={suburb} value={suburb}>
                    {suburb}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Transmission Type"
                name="method"
                value={filters.method}
                onChange={handleFilterChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsCar sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="Both">Both</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Experience Level"
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Star sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">All Experience</MenuItem>
                <MenuItem value="0-5">0-5 years</MenuItem>
                <MenuItem value="5-10">5-10 years</MenuItem>
                <MenuItem value="10+">10+ years</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Price Range"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MonetizationOn sx={{ color: '#64748b' }} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="0-50">$0-$50</MenuItem>
                <MenuItem value="50-70">$50-$70</MenuItem>
                <MenuItem value="70+">$70+</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {(filters.method || filters.experience || filters.priceRange || filters.suburb) && (
            <Box sx={{ 
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1
            }}>
              {filters.suburb && (
                <Chip
                  label={`Location: ${filters.suburb}`}
                  onDelete={() => setFilters(prev => ({ ...prev, suburb: '' }))}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(40, 193, 198, 0.1)',
                    color: '#28c1c6',
                    '& .MuiChip-deleteIcon': { color: '#28c1c6' }
                  }}
                />
              )}
              {filters.method && (
                <Chip
                  label={`Transmission: ${filters.method}`}
                  onDelete={() => setFilters(prev => ({ ...prev, method: '' }))}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(40, 193, 198, 0.1)',
                    color: '#28c1c6',
                    '& .MuiChip-deleteIcon': { color: '#28c1c6' }
                  }}
                />
              )}
              {filters.experience && (
                <Chip
                  label={`Experience: ${filters.experience}`}
                  onDelete={() => setFilters(prev => ({ ...prev, experience: '' }))}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(40, 193, 198, 0.1)',
                    color: '#28c1c6',
                    '& .MuiChip-deleteIcon': { color: '#28c1c6' }
                  }}
                />
              )}
              {filters.priceRange && (
                <Chip
                  label={`Price: ${filters.priceRange}`}
                  onDelete={() => setFilters(prev => ({ ...prev, priceRange: '' }))}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(40, 193, 198, 0.1)',
                    color: '#28c1c6',
                    '& .MuiChip-deleteIcon': { color: '#28c1c6' }
                  }}
                />
              )}
            </Box>
          )}
        </Box>
      </Paper>

      {/* Instructor Cards */}
      <Grid container spacing={1.5}>
        {filteredInstructors.map((instructor) => (
          <Grid item xs={12} sm={6} md={4} key={instructor._id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '6px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              maxWidth: '300px',
              mx: 'auto',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={instructor.profile.profileImage ? `${BACKEND_URL}${instructor.profile.profileImage}` : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
                  alt={instructor.name}
                  sx={{ objectFit: 'cover' }}
                />
                <Box sx={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  borderRadius: '12px',
                  px: 0.75,
                  py: 0.25
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#0f3643' }}>
                    ${instructor.profile.hourlyRate}/hr
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ 
                flexGrow: 1, 
                p: 1.5,
                '&:last-child': { pb: 1.5 }
              }}>
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 'bold',
                  color: '#0f3643',
                  mb: 0.5,
                  fontSize: '0.9rem'
                }}>
                  {instructor.name}
                </Typography>

                {/* Suburb */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 0.75,
                  gap: 0.5
                }}>
                  <LocationOn sx={{ fontSize: '0.875rem', color: '#64748b' }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    {instructor.profile.suburb}
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 0.75,
                  gap: 0.5
                }}>
                  <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ fontSize: '0.875rem' }} />
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    (4.5)
                  </Typography>
                </Box>

                {/* Bio with Read More */}
                <Box sx={{ mb: 1 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#64748b',
                      display: '-webkit-box',
                      WebkitLineClamp: expandedBio[instructor._id] ? 'unset' : 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.3
                    }}
                  >
                    {instructor.profile.bio}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => toggleBio(instructor._id)}
                    sx={{ 
                      p: 0,
                      minWidth: 'auto',
                      color: '#28c1c6',
                      '&:hover': { bgcolor: 'transparent', color: '#1b9aa0' }
                    }}
                  >
                    {expandedBio[instructor._id] ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption">Show Less</Typography>
                        <KeyboardArrowUp sx={{ fontSize: '0.875rem' }} />
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography variant="caption">Read More</Typography>
                        <KeyboardArrowDown sx={{ fontSize: '0.875rem' }} />
                      </Box>
                    )}
                  </Button>
                </Box>

                <Box sx={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  mb: 1
                }}>
                  
                  <Chip
                    icon={<DirectionsCar sx={{ fontSize: '0.75rem' }} />}
                    label={`${instructor.profile.car.make} ${instructor.profile.car.model}`}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(40, 193, 198, 0.1)',
                      color: '#28c1c6',
                      '& .MuiChip-icon': { color: '#28c1c6' },
                      height: '20px',
                      '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' }
                    }}
                  />
                  <Chip
                    icon={<AccessTime sx={{ fontSize: '0.75rem' }} />}
                    label={`${instructor.profile.experience}y Experience`}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(40, 193, 198, 0.1)',
                      color: '#28c1c6',
                      '& .MuiChip-icon': { color: '#28c1c6' },
                      height: '20px',
                      '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' }
                    }}
                  />
                  <Chip
                    icon={<DirectionsCar sx={{ fontSize: '0.75rem' }} />}
                    label={instructor.profile.method}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(40, 193, 198, 0.1)',
                      color: '#28c1c6',
                      '& .MuiChip-icon': { color: '#28c1c6' },
                      height: '20px',
                      '& .MuiChip-label': { px: 0.75, fontSize: '0.7rem' }
                    }}
                  />
                </Box>

                {!isInstructor && !isAdmin && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBookNow(instructor)}
                    sx={{
                      mt: 'auto',
                      background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1b9aa0 0%, #0f3643 100%)',
                      },
                      borderRadius: '4px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      py: 0.5
                    }}
                  >
                    Book Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            maxWidth: '400px',
            width: '100%'
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          color: '#0f3643',
          fontWeight: 'bold'
        }}>
          Book Lesson
        </DialogTitle>
        <DialogContent>
          {selectedInstructor && (
            <>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2
              }}>
                <Box
                  component="img"
                  src={selectedInstructor.profile.profileImage ? `${BACKEND_URL}${selectedInstructor.profile.profileImage}` : '/default-profile.png'}
                  alt={selectedInstructor.name}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {selectedInstructor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInstructor.profile.method} Instructor
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Rate: ${selectedInstructor.profile.hourlyRate}/hour
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Would you like to proceed with booking a lesson with this instructor?
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              color: '#64748b',
              '&:hover': {
                backgroundColor: 'rgba(100, 116, 139, 0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmBooking}
            variant="contained"
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
            Proceed to Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Instructors;