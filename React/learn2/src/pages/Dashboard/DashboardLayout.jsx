import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useTheme, 
  useMediaQuery, 
  Menu, 
  MenuItem, 
  Avatar,
  Divider,
  Badge,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  ExitToApp as LogoutIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  RateReview as ReviewIcon,
  Settings as SettingsIcon,
  DriveEta as CarIcon,
  Notifications as NotificationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;
const collapsedDrawerWidth = 80;

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    handleProfileMenuClose();
    navigate('/login');
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.role === 'admin';
  const isStudent = userInfo?.role === 'student';
  const isInstructor = userInfo?.role === 'instructor';

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', badge: 0 },
    { text: 'Find Instructors', icon: <PeopleIcon />, path: '/dashboard/instructors'},
    ...(isAdmin ? [
      { text: 'Instructor Applications', icon: <AssignmentIcon />, path: '/dashboard/instructor-applications', badge: 0 },
    ] : []),
    ...(isStudent ? [
      { text: 'My Bookings', icon: <EventIcon />, path: '/dashboard/bookings', badge: 1 },
    ] : []),
    { text: 'My Profile', icon: <PersonIcon />, path: '/dashboard/profile', badge: 0 },
    ...(isInstructor ? [
      { text: 'Manage Profile', icon: <SettingsIcon />, path: '/dashboard/instructor-profile', badge: 0 },
    ] : []),
    ...(isStudent ? [
      { text: 'Become an Instructor', icon: <SchoolIcon />, path: '/dashboard/become-instructor', badge: 0 },
    ] : []),
  ];

  const notifications = [
    { id: 1, text: 'New lesson booking confirmed', time: '2 hours ago' },
    { id: 2, text: 'Instructor assigned to your next lesson', time: '4 hours ago' },
    { id: 3, text: 'Payment received for last lesson', time: '1 day ago' },
  ];

  const drawer = (
    <Box sx={{ 
      backgroundColor: '#ffffff',
      height: '100%',
      color: '#0f3643',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)'
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ 
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #28c1c6 0%, #1b9aa0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginLeft: '10px'
        }}>
          Learn2Drive
        </Typography>
        <IconButton onClick={handleCollapseToggle} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <List sx={{ flexGrow: 1, p: 2 }}>
        {menuItems.map((item) => (
          <ListItem
          component="button"
          key={item.text}
          onClick={() => navigate(item.path)}
          selected={location.pathname === item.path}
          sx={{
            mb: 1,
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(40, 193, 198, 0.1)',
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(40, 193, 198, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(40, 193, 198, 0.25)',
              },
            },
          }}
        >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? '#28c1c6' : '#64748b',
              minWidth: '40px'
            }}>
              {item.badge > 0 ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : item.icon}
            </ListItemIcon>
            {!isCollapsed && (
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  sx: { 
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    color: location.pathname === item.path ? '#0f3643' : '#64748b'
                  } 
                }} 
              />
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <ListItem 
          component="button"
          onClick={handleLogout}
          sx={{
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              transform: 'translateX(4px)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: '40px' }}>
            <LogoutIcon />
          </ListItemIcon>
          {!isCollapsed && (
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ sx: { color: '#ef4444' } }} 
            />
          )}
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${isCollapsed ? collapsedDrawerWidth : drawerWidth}px` },
          backgroundColor: 'white',
          color: '#0f3643',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
           
            <Menu
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleNotificationsClose}
              onClick={handleNotificationsClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 300,
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }
              }}
            >
              {notifications.map((notification) => (
                <MenuItem key={notification.id} sx={{ py: 1.5 }}>
                  <ListItemText
                    primary={notification.text}
                    secondary={notification.time}
                    primaryTypographyProps={{ sx: { fontWeight: 'medium' } }}
                    secondaryTypographyProps={{ sx: { color: '#64748b', fontSize: '0.75rem' } }}
                  />
                </MenuItem>
              ))}
            </Menu>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                edge="end"
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: '#28c1c6',
                    fontSize: '1rem'
                  }}
                >
                  <PersonIcon fontSize="small" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              onClick={handleProfileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }
              }}
            >
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} />
                </ListItemIcon>
                <ListItemText primary="Logout" primaryTypographyProps={{ sx: { color: '#ef4444' } }} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: isCollapsed ? collapsedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
          transition: 'all 0.3s ease',
        }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
              borderRight: 'none',
              transition: 'all 0.3s ease',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isCollapsed ? collapsedDrawerWidth : drawerWidth}px)` },
          mt: '64px',
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout; 