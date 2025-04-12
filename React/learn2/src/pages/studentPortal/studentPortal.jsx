import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../LandingPage/Navbar';
import Footer from '../LandingPage/Footer';

const StudentPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ nationality: '', maxPrice: '' });
  const [instructors, setInstructors] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInstructors = async () => {
      setIsLoading(true);
      const mockInstructors = [
        {
          id: 1, name: 'John Doe', nationality: 'Australian', bio: 'Experienced instructor with a focus on safety.',
          carType: 'Sport', method: 'Manual/Auto', experience: '10 years', availability: 'Mon-Fri 10AM-5PM', price: 80,
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d', reviews: [
            { reviewer: 'Alex', date: '2022-07-21', text: 'Patient and supportive!', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde', rating: 5 },
            { reviewer: 'Skylar', date: '2022-07-20', text: 'Great lessons!', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12', rating: 5 },
          ],
        },
        {
          id: 2, name: 'Jett Barker', nationality: 'Nepalese', bio: 'Friendly and skilled instructor.',
          carType: 'Sedan', method: 'Auto', experience: '5 years', availability: 'Tue-Sat 9AM-4PM', price: 70,
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
        },
        {
          id: 3, name: 'Yousef Gomechu', nationality: 'Indian', bio: 'Passionate about teaching driving.',
          carType: 'Hatchback', method: 'Manual', experience: '8 years', availability: 'Mon-Thu 8AM-3PM', price: 75,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        },
        {
          id: 4, name: 'Mikayla Hopkins', nationality: 'Australian', bio: 'Dedicated to student success.',
          carType: 'SUV', method: 'Auto', experience: '6 years', availability: 'Wed-Sun 11AM-6PM', price: 85,
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        },
      ];
      setInstructors(mockInstructors);
      setIsLoading(false);
    };
    fetchInstructors();
  }, []);

  const filterInstructors = () => {
    let filtered = [...instructors];
    if (searchQuery) filtered = filtered.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filters.nationality) filtered = filtered.filter((i) => i.nationality === filters.nationality);
    if (filters.maxPrice) filtered = filtered.filter((i) => i.price <= parseInt(filters.maxPrice));
    return filtered;
  };

  const handleBookNow = (id) => navigate(`/datePicker/${id}`);
  const toggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const renderStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? '#f59e0b' : '#d1d5db' }}>★</span>
  ));

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '80px' },
    main: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
    header: { display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '40px' },
    search: { flex: 1, minWidth: '200px', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#ffffff' },
    filter: { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#ffffff' },
    card: { backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s' },
    featured: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' },
    img: { width: '100%', maxWidth: '400px', height: 'auto', borderRadius: '12px', objectFit: 'cover' },
    button: { padding: '10px 20px', backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', transition: 'background 0.2s' },
    reviews: { marginBottom: '40px' },
    review: { display: 'flex', gap: '15px', padding: '16px 0', borderBottom: '1px solid #e5e7eb' },
    more: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  };

  const filteredInstructors = filterInstructors();

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.main}>
        <div style={styles.header}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search instructors..."
            style={styles.search}
          />
          <select
            value={filters.nationality}
            onChange={(e) => setFilters({ ...filters, nationality: e.target.value })}
            style={styles.filter}
          >
            <option value="">All Nationalities</option>
            {[...new Set(instructors.map(i => i.nationality))].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            placeholder="Max Price ($/hr)"
            style={{ ...styles.filter, width: '120px' }}
          />
        </div>
        {isLoading ? (
          <div style={{ textAlign: 'center', fontSize: '16px', color: '#1f2937' }}>Loading...</div>
        ) : (
          <>
            {filteredInstructors[0] && (
              <div style={styles.card}>
                <div style={styles.featured}>
                  <img src={filteredInstructors[0].image} alt={filteredInstructors[0].name} style={styles.img} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h2 style={{ fontSize: '24px', color: '#1f2937', margin: 0 }}>{filteredInstructors[0].name}</h2>
                      <button
                        onClick={() => toggleFavorite(filteredInstructors[0].id)}
                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: favorites.includes(filteredInstructors[0].id) ? '#ef4444' : '#d1d5db' }}
                      >
                        ♥
                      </button>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>{filteredInstructors[0].bio}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                      <div><strong>Car Type:</strong> {filteredInstructors[0].carType}</div>
                      <div><strong>Method:</strong> {filteredInstructors[0].method}</div>
                      <div><strong>Experience:</strong> {filteredInstructors[0].experience}</div>
                      <div><strong>Nationality:</strong> {filteredInstructors[0].nationality}</div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}><strong>Availability:</strong> {filteredInstructors[0].availability}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <p style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937', margin: 0 }}>${filteredInstructors[0].price}/hr</p>
                      <button
                        style={styles.button}
                        onClick={() => handleBookNow(filteredInstructors[0].id)}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {filteredInstructors[0]?.reviews && (
              <div style={{ ...styles.card, ...styles.reviews }}>
                <h2 style={{ fontSize: '20px', color: '#1f2937', marginBottom: '20px' }}>Reviews ({filteredInstructors[0].reviews.length})</h2>
                {filteredInstructors[0].reviews.map((r, i) => (
                  <div key={i} style={styles.review}>
                    <img src={r.avatar} alt={r.reviewer} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '16px', color: '#1f2937', margin: 0 }}>{r.reviewer}</h3>
                        <div>{renderStars(r.rating)}</div>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{r.date}</p>
                      <p style={{ fontSize: '14px', color: '#1f2937' }}>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {filteredInstructors.length > 1 && (
              <div style={styles.more}>
                {filteredInstructors.slice(1).map((i) => (
                  <div
                    key={i.id}
                    style={styles.card}
                    onMouseOver={(e) => (e.target.style.transform = 'scale(1.02)')}
                    onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
                  >
                    <img src={i.image} alt={i.name} style={{ ...styles.img, maxWidth: '100%', height: '150px' }} />
                    <h3 style={{ fontSize: '16px', color: '#1f2937', margin: '10px 0' }}>{i.name}</h3>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '10px' }}>{i.bio}</p>
                    <p style={{ fontSize: '14px', color: '#1f2937', marginBottom: '10px' }}>${i.price}/hr</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        style={styles.button}
                        onClick={() => handleBookNow(i.id)}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
                      >
                        Book Now
                      </button>
                      <button
                        onClick={() => toggleFavorite(i.id)}
                        style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: favorites.includes(i.id) ? '#ef4444' : '#d1d5db' }}
                      >
                        ♥
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StudentPortal;