import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/LandingPage/Navbar';
import Main from './pages/LandingPage/Main';
import About from './pages/LandingPage/About';
import Services from './pages/LandingPage/Services';
import Stats from './pages/LandingPage/Stats';
import Footer from './pages/LandingPage/Footer';
import Login from './pages/login';
import SignUp from './pages/signUp'; 
import StudentPortal from './pages/studentPortal'; 
import PaymentForm from './pages/paymentForm'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/studentPortal" element={<StudentPortal />} />
            <Route path="/paymentForm/:instructorID" element={<PaymentForm />} />
            {/* Add a catch-all route for 404 pages */}
            <Route path="*" element={<Main />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;