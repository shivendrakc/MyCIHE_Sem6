// App.jsx
import React from 'react';
import Navbar from './pages/LandingPage/Navbar'; // Import the Navbar component
import Main from './pages/LandingPage/Main'
import About from './pages/LandingPage/About'
import Services from './pages/LandingPage/Services'
import Stats from './pages/LandingPage/Stats';
import Footer from './pages/LandingPage/Footer'
import Prac from './pages/Prac'
import LoginPage from './pages/Login-Registration/login'; // Import the LoginPage component
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route for routing


function LandingPage() {
  return (
    <div>
      <Main />
      <About />
      <Services />
      <Stats />
    </div>
  );
}
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* When URL is "/", show LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* When URL is "/practical", show Prac */}
        {/* When URL is "/login", show LoginPage */}
        <Route path="/Login-Registration/login.jsx" element={<LoginPage />} />

        {/* Add other routes here if you have more pages */}
        {/* <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
      
      <Footer />
      
    </div>
  );
}

export default App;