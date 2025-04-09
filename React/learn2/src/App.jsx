import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/LandingPage/Navbar';
import Main from './pages/LandingPage/Main';
import About from './pages/LandingPage/About';
import Services from './pages/LandingPage/Services';
import Stats from './pages/LandingPage/Stats';
import Footer from './pages/LandingPage/Footer';
import Prac from './pages/Prac';
import LoginPage from './pages/Login-Registration/login';
import RegisterPage from './pages/Login-Registration/register';

function LandingPage() {
  return (
    <div>
      <Main />
      <About />
      <Services />
      <Stats />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* When URL is "/", show LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* When URL is "/login", show LoginPage */}
        <Route path="/Login-Registration/login.jsx" element={<LoginPage />} />
        <Route path="/register.jsx" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;