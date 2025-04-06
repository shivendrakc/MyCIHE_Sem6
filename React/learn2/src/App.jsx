import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/landingPage';
import Navbar from './pages/LandingPage/Navbar';
import LoginPage from './pages/Login-Registration/login';
import RegisterPage from './pages/Login-Registration/register';
import InstructorPortal from './pages/InstructorPages/instructorPortal';
import StudentPortal from './pages/studentPortal/StudentPortal.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/instructorPortal" element={<InstructorPortal />} />
        <Route path="/studentPortal" element={<StudentPortal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;