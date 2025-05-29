import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landingPage';
import Navbar from './pages/LandingPage/Navbar';
import LoginPage from './pages/Login-Registration/login';
import Register from './pages/Login-Registration/register';

import Applicatoinform from './pages/Login-Registration/ApplicationForm';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Instructors from './pages/Dashboard/Instructors';
import BookLessons from './pages/Dashboard/BookLessons';
import Bookings from './pages/Dashboard/Bookings';
import Profile from './pages/Dashboard/Profile';
import BecomeInstructor from './pages/Login-Registration/ApplicationForm';
import Payment from './pages/Dashboard/Payment';
import InstructorApplications from './pages/Dashboard/InstructorApplications';
import InstructorProfile from './pages/Dashboard/InstructorProfile';
import AuthSuccess from './pages/AuthSuccess';
import './index.css';
//filName
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Role Based Route Component
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userInfo.role)) {
    // Redirect based on role
    switch (userInfo.role) {
      case 'admin':
        return <Navigate to="/dashboard" />;
      case 'student':
        return <Navigate to="/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div style={{ padding: '0px' }}>
                <LandingPage />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <LoginPage />
              </div>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <Register />
              </div>
            </>
          }
        />
        <Route
          path="/auth/success"
          element={<AuthSuccess />}
        />
        <Route
          path="/ApplicationForm"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <Applicatoinform />
              </div>
            </>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/instructor-applications"
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <InstructorApplications />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/instructors"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student', 'instructor']}>
              <DashboardLayout>
                <Instructors />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/book-lessons"
          element={
            <RoleBasedRoute allowedRoles={['student']}>
              <DashboardLayout>
                <BookLessons />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
              <DashboardLayout>
                <Bookings />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student', 'instructor']}>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/instructor-profile"
          element={
            <RoleBasedRoute allowedRoles={['instructor']}>
              <DashboardLayout>
                <InstructorProfile />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/become-instructor"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
              <DashboardLayout>
                <Applicatoinform />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/payment"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;