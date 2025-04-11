import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landingPage';
import Navbar from './pages/LandingPage/Navbar';
import LoginPage from './pages/Login-Registration/login';
import Register from './pages/Login-Registration/register';
import InstructorPortal from './pages/InstructorPages/instructorPortal';
import InstructorMenu from './pages/InstructorPages/instructorMenu';
import InstructorProfile from './pages/InstructorPages/instructorProfile';
import LessonReview from './pages/InstructorPages/lessonReview.jsx';

import ManageStudents from './pages/InstructorPages/manageStudents';
import DatePicker from './pages/studentPortal/datePicker.jsx';
import StudentPortal from './pages/studentPortal/StudentPortal.jsx';
import PaymentForm from './pages/Payment/paymentForm.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* instructor pages */}
        <Route path="/instructorPortal" element={<InstructorPortal />} />
        <Route path="/instructorMenu" element={<InstructorMenu />} />
        <Route path="/instructorProfile" element={<InstructorProfile />} />
        <Route path="/manageStudents" element={<ManageStudents />} />
        <Route path="/lessonReview" element={<LessonReview />} />
        <Route path="/studentPortal" element={<StudentPortal />} />
        <Route path="/datePicker/:instructorId" element={<DatePicker />}/>
        <Route path="/paymentForm" element={<PaymentForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;