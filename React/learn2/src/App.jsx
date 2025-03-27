// App.jsx
import React from 'react';
import Navbar from './pages/LandingPage/Navbar'; // Import the Navbar component
import Main from './pages/LandingPage/Main'
import About from './pages/LandingPage/About'
import Services from './pages/LandingPage/Services'
import Stats from './pages/LandingPage/Stats';
import Footer from './pages/LandingPage/Footer'
import Prac from './pages/Prac'

function App() {
  return (
    <div>
      <Navbar />
      <Main />
      <About />
      <Services />
      <Stats />
      <Footer />
      
    </div>
  );
}

export default App;