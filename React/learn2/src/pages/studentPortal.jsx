import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      setIsLoading(true);
      try {
        const mockInstructors = [
          {
            id: 1,
            name: 'John Doe',
            nationality: 'Australian',
            bio: "Hi, I'm John Doe, a certified driving instructor with over 10 years of experience. My goal is to help you become a confident and safe driver at your own pace.",
            carType: 'Sport',
            method: 'Manual/Auto',
            experience: '10 years',
            availability: 'Mon-Fri 10AM - 5PM',
            price: 80,
            image: 'https://placehold.co/400x300',
            reviews: [
              {
                reviewer: 'Alex Stanton',
                date: '21 July 2022',
                text: 'John was incredibly patient and made me feel comfortable behind the wheel from day one. His clear instructions and supportive teaching style helped me pass my driving test on the first try!',
                avatar: 'https://placehold.co/56x56',
                rating: 5,
              },
              {
                reviewer: 'Skylar Dias',
                date: '20 July 2022',
                text: 'Great experience! John tailored each lesson to my specific needs and gave me valuable tips for city driving. Highly recommend him to anyone looking to build confidence on the road.',
                avatar: 'https://placehold.co/56x56',
                rating: 5,
              },
            ],
          },
          {
            id: 2,
            name: 'Jett Barker',
            nationality: 'Nepalese',
            bio: 'Please add your content here. Keep it short and simple. And smile :)',
            tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
            image: 'https://placehold.co/200x200',
          },
          {
            id: 3,
            name: 'Yousef Gomechu',
            nationality: 'Indian',
            bio: 'Please add your content here. Keep it short and simple. And smile :)',
            tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
            image: 'https://placehold.co/200x200',
          },
          {
            id: 4,
            name: 'Mikayla Hopkins',
            nationality: 'Australian',
            bio: 'Please add your content here. Keep it short and simple. And smile :)',
            tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
            image: 'https://placehold.co/200x200',
          },
        ];
        setInstructors(mockInstructors);
      } catch (error) {
        console.error('Failed to fetch instructors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setInstructors((prevInstructors) =>
      prevInstructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(query)
      )
    );
  };

  const handleBookNow = (instructorId) => {
    console.log(`Booking instructor with ID: ${instructorId}`);
    navigate(`/paymentForm/${instructorId}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#ffd700' : '#ddd' }}>★</span>
    ));
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fcff', minHeight: '100vh' }}>
      {/* Header Section */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f9fcff',
        borderBottom: '1px solid #ddd'
      }}>
        <h1 style={{ color: '#007bff', fontSize: '24px', margin: 0 }}>Learn2Drive</h1>
        <div style={{ flex: 1, maxWidth: '500px', margin: '0 20px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search For Instructor"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to="/dashboard" style={{ color: '#007bff', textDecoration: 'none', fontSize: '16px' }}>
            Dashboard
          </Link>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>❤️</span>
            <span style={{ fontSize: '20px' }}>🔔</span>
            <img src="https://placehold.co/44x44" alt="User Avatar" style={{ borderRadius: '50%' }} />
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', fontSize: '16px' }}>Loading...</div>
        ) : (
          <>
            {/* Featured Instructor */}
            <section style={{
              display: 'flex',
              gap: '20px',
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '20px',
              marginBottom: '40px'
            }}>
              <img
                src={instructors[0]?.image}
                alt={instructors[0]?.name}
                style={{ width: '50%', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <h2 style={{ fontSize: '24px', margin: 0 }}>{instructors[0]?.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {renderStars(5)}
                    <span style={{ fontSize: '14px', color: '#666' }}>(440 reviews)</span>
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{instructors[0]?.bio}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Type Car:</span> {instructors[0]?.carType}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Method:</span> {instructors[0]?.method}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Experience:</span> {instructors[0]?.experience}
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Nationality:</span> {instructors[0]?.nationality}
                  </div>
                </div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                  <span style={{ fontWeight: 'bold' }}>Availability:</span> {instructors[0]?.availability}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', margin: 0 }}>
                    ${instructors[0]?.price}.00/hr
                  </p>
                  <button
                    onClick={() => handleBookNow(instructors[0]?.id)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              padding: '20px',
              marginBottom: '40px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', margin: 0 }}>Reviews</h2>
                <span style={{ backgroundColor: '#007bff', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                  13
                </span>
              </div>
              {instructors[0]?.reviews.map((review, index) => (
                <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: index < instructors[0].reviews.length - 1 ? '1px solid #ddd' : 'none', paddingBottom: '20px' }}>
                  <img src={review.avatar} alt={review.reviewer} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h3 style={{ fontSize: '16px', margin: 0 }}>{review.reviewer}</h3>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>{review.date}</p>
                    <p style={{ fontSize: '14px', color: '#333' }}>{review.text}</p>
                  </div>
                </div>
              ))}
              <button style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                Show All →
              </button>
            </section>

            {/* More Instructors */}
            <section>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>More Available Instructors</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                {instructors.slice(1).map((instructor) => (
                  <div key={instructor.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '15px',
                    textAlign: 'center',
                    flex: '1'
                  }}>
                    <img src={instructor.image} alt={instructor.name} style={{ width: '100%', height: '150px', borderRadius: '10px', objectFit: 'cover', marginBottom: '10px' }} />
                    <h3 style={{ fontSize: '16px', marginBottom: '5px' }}>{instructor.name}</h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>{instructor.bio}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '10px' }}>
                      {instructor.tags.map((tag, index) => (
                        <span key={index} style={{ backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', color: '#666' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleBookNow(instructor.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer Section */}
      <footer style={{
        backgroundColor: '#2d3748',
        color: '#fff',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <img src="https://placehold.co/100x40" alt="Learn2Drive Logo" style={{ marginBottom: '10px' }} />
          <p style={{ fontSize: '14px' }}>Copyright © 2020 Landify UI Kit.</p>
          <p style={{ fontSize: '14px' }}>All rights reserved</p>
        </div>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Company</h3>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>About us</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Blog</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Contact us</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Pricing</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Testimonials</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Support</h3>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Help center</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Terms of service</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Legal</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Privacy policy</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Status</p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Stay up to date</h3>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: 'none',
                fontSize: '14px',
                width: '200px'
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentPortal;