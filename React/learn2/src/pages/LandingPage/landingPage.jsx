import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Car from '../../assets/car.png';

const Learn2Drive = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState(0);
  const navigate = useNavigate();

  const instructors = [
    { name: 'John Doe', rating: '4.9', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d' },
    { name: 'Jane Smith', rating: '4.8', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Mike Johnson', rating: '4.7', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInstructor((prev) => (prev + 1) % instructors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [instructors.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Inquiry submitted:', formData);
        navigate('/thank-you');
      } catch (error) {
        console.error('Submission failed:', error);
        setErrors({ submit: 'Submission failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="w-full mt-40 mb-16 flex flex-col md:flex-row justify-between items-center bg-white/60 px-30 py-16 shadow">
        <div className="mb-0 max-w-xl space-y-6">
        <h1 className="text-4xl font-bold text-gray-800  mb-0">Find your mate</h1>
          <h1 className="text-4xl font-bold text-gray-800  mt-0 mb-2"><span className='text-6xl text-[#28c1c6]'>Learn2Drive</span> with Ease</h1>
          <p className="text-gray-600 mt-0 mb-10">Connecting Students with certified instructors for a seamless learning Experience.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/studentPortal')} className="bg-[#28c1c6] hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
              Available Instructors
            </button>
            <button onClick={() => navigate('/instructorPortal')} className="bg-[#28c1c6] hover:bg-blue-600 text-white px-6 py-3 rounded-md transition">
              Become an Instructor
            </button>
          </div>
        </div>
        <img
          src={Car}
          alt="Car on Road"
          className="max-w-md rounded-lg shadow mb-30"
        />
      </section>

      
      <div className="relative w-full h-[250px] overflow-hidden bg-white mt-25">
      {/* Dots/Indicators */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <span className="w-2 h-2 bg-teal-700 rounded-full"></span>
        <span className="w-2 h- bg-teal-300 rounded-full opacity-70"></span>
        <span className="w-2 h-2 bg-teal-200 rounded-full opacity-50"></span>
      </div>

      {/* SVG Waves */}
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          fill="#00cfff"
          fillOpacity="0.3"
          d="
            M0,100 
            C120,200 240,0 360,100 
            C480,200 600,0 720,100 
            C840,200 960,0 1080,100 
            C1200,200 1320,0 1440,100 
            L1440,260 
            C1320,160 1200,320 1080,260 
            C960,160 840,320 720,260 
            C600,160 480,320 360,260 
            C240,160 120,320 0,260 
            Z"
        />

        {/* Layer 2 - darker */}
        <path
          fill="#0a5d72"
          fillOpacity="0.6"
          d="
            M0,120 
            C120,40 240,220 360,120 
            C480,40 600,220 720,120 
            C840,40 960,220 1080,120 
            C1200,40 1320,220 1440,120 
            L1440,240 
            C1320,320 1200,140 1080,240 
            C960,320 840,140 720,240 
            C600,320 480,140 360,240 
            C240,320 120,140 0,240 
            Z"
        />
      </svg>
    </div>

    {/* About Section */}
    <section id="about" className="bg-white py-16 px-6 md:px-20 relative">
    <div className="relative w-full h-[300px] rounded-bl-xl shadow-lg mb-8 overflow-hidden">
  {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1587808326264-bb8e737b1f4d?q=80&w=2070"
          alt="Office collaboration"
          className="w-full h-full object-cover"
          style={{ clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 0% 100%)' }}
        />

        {/* White overlay on top */}
        <div className="absolute inset-0 bg-white/80" />

        {/* About Us Heading on Image */}
        <h2 className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl font-extrabold text-[#28c1c6] leading-snug text-center z-10">
          About Us
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
       
       
        

        {/* Text Content */}
        <div className="space-y-6">
          <p className="text-gray-600 text-base leading-relaxed">
            At Learn2Drive, we're passionate about making the journey to getting your license smooth, safe, and empowering. 
            Whether you're starting from scratch or picking up where you left off, we connect you with certified instructors who care about your progress and confidence on the road.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800">
            How we work with our Learners.
          </h3>
          <p className="text-sm text-gray-600">
            Personalized lesson plans. Real-time availability. Transparent pricing.
            <br />
            Our platform is built to make learning to drive flexible and stress-free. With just a few clicks, you can find the right instructor, book a session, and start building your driving skills with confidence.
          </p>

          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Contact Us →
          </button>
        </div>

      </div>
    </section>


      <div className="relative w-full h-[250px] overflow-hidden bg-white mt-25">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          fill="#00cfff"
          fillOpacity="0.3"
          d="
            M0,100 
            C120,200 240,0 360,100 
            C480,200 600,0 720,100 
            C840,200 960,0 1080,100 
            C1200,200 1320,0 1440,100 
            L1440,260 
            C1320,160 1200,320 1080,260 
            C960,160 840,320 720,260 
            C600,160 480,320 360,260 
            C240,160 120,320 0,260 
            Z"
        />

        {/* Layer 2 - darker */}
        <path
          fill="#0a5d72"
          fillOpacity="0.6"
          d="
            M0,120 
            C120,40 240,220 360,120 
            C480,40 600,220 720,120 
            C840,40 960,220 1080,120 
            C1200,40 1320,220 1440,120 
            L1440,240 
            C1320,320 1200,140 1080,240 
            C960,320 840,140 720,240 
            C600,320 480,140 360,240 
            C240,320 120,140 0,240 
            Z"
        />
      </svg>
        </div>

      {/* What We Offer */}
      <section className="px-8 md:px-24 py-16 bg-[#CDF3FF] mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800">What We Offer</h2>
          <p className="text-gray-600">Tailored driving lessons, seamless scheduling, and a student-focused experience.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: 'Personalized Matching', path: '/instructor-match' },
            { title: 'Easy Scheduling', path: '/scheduling' },
            { title: 'Secure Payments', path: '/payments' },
          ].map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 text-center transform hover:scale-105 transition">
              <h3 className="text-lg font-medium text-gray-800 mb-2">{offer.title}</h3>
              <span onClick={() => navigate(offer.path)} className="text-blue-500 hover:underline cursor-pointer text-sm">
                Read More
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="text-center px-8 md:px-24 py-16 bg-white mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Meet Our Top Instructors</h2>
        <div className="max-w-sm mx-auto bg-gray-50 p-6 rounded-lg shadow animate-fadeIn">
          <img
            src={instructors[currentInstructor].img}
            alt={instructors[currentInstructor].name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold">{instructors[currentInstructor].name}</h3>
          <p className="text-sm text-gray-500">Rating: {instructors[currentInstructor].rating} ★</p>
        </div>
      </section>

      {/* Stats */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 py-16 bg-gray-50 mb-16">
        <div className="max-w-md space-y-3 mb-8 md:mb-0">
          <h2 className="text-xl font-semibold text-gray-800">Driving Success</h2>
          <p className="text-gray-600">Join over 2,000 satisfied learners.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: '200+', label: 'Certified Instructors' },
            { number: '2,334', label: 'Users' },
            { number: '828K', label: 'Lessons Conducted' },
            { number: '1,926', label: 'Payments Processed' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-blue-500 font-bold text-xl">{stat.number}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto bg-white px-8 py-10 rounded-lg shadow mb-16">
        <h3 className="text-xl font-semibold text-center mb-6 text-gray-800">Get in Touch</h3>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {errors.submit && <div className="text-red-500 text-sm">{errors.submit}</div>}
          {['name', 'email', 'message'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              {field === 'message' ? (
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  placeholder="Your message..."
                />
              ) : (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  placeholder={`Your ${field}`}
                />
              )}
              {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
            </div>
          ))}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Learn2Drive;
