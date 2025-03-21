import React from 'react';
import './Practice.css'; // Assuming your styles are in this CSS file

const App = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

const Header = () => (
  <header className="header">
    <div className="container">
      <div className="logo">Learn 2 Drive</div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="cta-buttons">
        <a href="/login" className="btn">Login</a>
        <a href="/signup" className="btn btn-primary">Sign Up</a>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section id="home" className="hero">
    <div className="container">
      <h1>Connecting Students with Certified Instructors</h1>
      <p>Book driving lessons with ease and learn from the best instructors in your area.</p>
      <a href="/signup" className="btn btn-primary">Get Started</a>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="features">
    <div className="container">
      <h2>Why Choose Learn 2 Drive?</h2>
      <div className="feature-grid">
        <div className="feature">
          <h3>Find Instructors</h3>
          <p>Easily search and book certified driving instructors near you.</p>
        </div>
        <div className="feature">
          <h3>Flexible Scheduling</h3>
          <p>Choose lesson times that fit your busy schedule.</p>
        </div>
        <div className="feature">
          <h3>Secure Payments</h3>
          <p>Enjoy safe and hassle-free payment options.</p>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="testimonials">
    <div className="container">
      <h2>What Our Students Say</h2>
      <div className="testimonial-grid">
        <div className="testimonial">
          <p>"Learn 2 Drive made it so easy to find a great instructor. Highly recommended!"</p>
          <p className="author">- John Doe</p>
        </div>
        <div className="testimonial">
          <p>"The flexible scheduling is a lifesaver. I can book lessons around my work hours."</p>
          <p className="author">- Jane Smith</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="container">
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </div>
      <p>&copy; 2023 Learn 2 Drive. All rights reserved.</p>
    </div>
  </footer>
);

export default App;
