import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landingPage';
import Navbar from './pages/LandingPage/Navbar';
import LoginPage from './pages/Login-Registration/login';
import Register from './pages/Login-Registration/register';
import InstructorLayout from './pages/InstructorPages/instructorLayout';
import InstructorPortal from './pages/InstructorPages/instructorPortal';
import InstructorProfile from './pages/InstructorPages/instructorProfile';
import LessonReview from './pages/InstructorPages/lessonReview';
import ManageStudents from './pages/InstructorPages/manageStudents';
import DatePicker from './pages/studentPortal/datePicker';
import StudentPortal from './pages/studentPortal/StudentPortal';
import PaymentForm from './pages/Payment/paymentForm';
import Applicatoinform from './pages/Login-Registration/ApplicationForm';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Instructors from './pages/Dashboard/Instructors';
import BookLessons from './pages/Dashboard/BookLessons';
import Bookings from './pages/Dashboard/Bookings';
import Profile from './pages/Dashboard/Profile';
import BecomeInstructor from './pages/Login-Registration/ApplicationForm';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (!user) {
    return <Navigate to="/login" />;
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
          path="/dashboard/instructors"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Instructors />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/book-lessons"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <BookLessons />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Bookings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/become-instructor"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Applicatoinform />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Instructor Routes with InstructorLayout */}
        <Route
          path="/instructorPortal"
          element={
            <InstructorLayout>
              <InstructorPortal />
            </InstructorLayout>
          }
        />
        <Route
          path="/instructorProfile"
          element={
            <InstructorLayout>
              <InstructorProfile />
            </InstructorLayout>
          }
        />
        <Route
          path="/lessonReview"
          element={
            <InstructorLayout>
              <LessonReview />
            </InstructorLayout>
          }
        />
        <Route
          path="/manageStudents"
          element={
            <InstructorLayout>
              <ManageStudents />
            </InstructorLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;