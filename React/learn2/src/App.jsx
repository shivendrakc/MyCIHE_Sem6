import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import Payment from './pages/Dashboard/Payment';
import './index.css';

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
      case 'instructor':
        return <Navigate to="/instructorPortal" />;
      case 'student':
        return <Navigate to="/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return children;
};

// Auth Success Component
const AuthSuccess = () => {
  
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const userInfo = params.get('user');

        if (!token || !userInfo) {
          throw new Error('Missing authentication data');
        }

        try {
          const decodedUserInfo = JSON.parse(decodeURIComponent(userInfo));
          localStorage.setItem('token', token);
          localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));

          // Redirect based on role
          setTimeout(() => {
            switch (decodedUserInfo.role) {
              case 'admin':
                navigate('/dashboard');
                break;
              case 'instructor':
                navigate('/instructorPortal');
                break;
              case 'student':
                navigate('/dashboard');
                break;
              default:
                navigate('/login?error=invalid_role');
            }
          }, 100);
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          throw new Error('Invalid user data format');
        }
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/login?error=auth_failed');
      }
    };

    handleAuthSuccess();
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-[#CDF3FF] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#2e667d] mb-4">Completing Authentication...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e667d] mx-auto"></div>
      </div>
    </div>
  );
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
          path="/dashboard/instructors"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
              <DashboardLayout>
                <Instructors />
              </DashboardLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/book-lessons"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
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
            <RoleBasedRoute allowedRoles={['admin', 'student']}>
              <DashboardLayout>
                <Profile />
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

        {/* Instructor Routes */}
        <Route
          path="/instructorPortal"
          element={
            <RoleBasedRoute allowedRoles={['instructor']}>
              <InstructorLayout>
                <InstructorPortal />
              </InstructorLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/instructorProfile"
          element={
            <RoleBasedRoute allowedRoles={['instructor']}>
              <InstructorLayout>
                <InstructorProfile />
              </InstructorLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/lessonReview"
          element={
            <RoleBasedRoute allowedRoles={['instructor']}>
              <InstructorLayout>
                <LessonReview />
              </InstructorLayout>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/manageStudents"
          element={
            <RoleBasedRoute allowedRoles={['instructor']}>
              <InstructorLayout>
                <ManageStudents />
              </InstructorLayout>
            </RoleBasedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;