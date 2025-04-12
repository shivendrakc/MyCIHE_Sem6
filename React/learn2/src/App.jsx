import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
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
          path="/studentPortal"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <StudentPortal />
              </div>
            </>
          }
        />
        <Route
          path="/datePicker/:instructorId"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <DatePicker />
              </div>
            </>
          }
        />
        <Route
          path="/paymentForm"
          element={
            <>
              <Navbar />
              <div style={{ padding: '20px' }}>
                <PaymentForm />
              </div>
            </>
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