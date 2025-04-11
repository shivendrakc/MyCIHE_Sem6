import React, { useState } from 'react';

const InstructorProfile = () => {
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState(null);
  const [profile, setProfile] = useState({
    fullName: 'Reza',
    nickName: '',
    gender: 'male',
    country: 'usa',
    language: 'english',
  });

  const [displayProfile, setDisplayProfile] = useState({ ...profile, email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value.includes('@') ? value : `${value}@gmail.com`);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleUpdateProfile = () => {
    if (!profile.fullName || !email.includes('@')) {
      alert('Please provide a valid full name and email.');
      return;
    }
    setDisplayProfile({ ...profile, email });
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>
          Welcome, {displayProfile.fullName}
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280' }}>Tue, 07 April 2025</p>
      </div>

      {/* Profile Section */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <img
          src="https://placehold.co/100x100"
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
        <div>
          {[
            { label: 'Full Name', value: displayProfile.fullName },
            { label: 'Nick Name', value: displayProfile.nickName || 'N/A' },
            { label: 'Gender', value: displayProfile.gender },
            { label: 'Country', value: displayProfile.country },
            { label: 'Language', value: displayProfile.language },
            { label: 'Email', value: displayProfile.email || 'N/A' },
          ].map((item, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>{item.label}</p>
              <p style={{ fontSize: '16px', color: '#1f2937' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
        }}
      >
        {[
          { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Your Full Name' },
          { label: 'Nick Name', name: 'nickName', type: 'text', placeholder: 'Your Nick Name' },
          { label: 'Gender', name: 'gender', type: 'select', options: ['male', 'female', 'not-say'] },
          { label: 'Country', name: 'country', type: 'text', placeholder: 'Type your country' },
          { label: 'Language', name: 'language', type: 'text', placeholder: 'Type your language' },
        ].map((field, index) => (
          <div key={index}>
            <label style={{ fontSize: '14px', color: '#1f2937', marginBottom: '8px', display: 'block' }}>
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={profile[field.name]}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#f9fafb',
                  fontSize: '14px',
                }}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={profile[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  backgroundColor: '#f9fafb',
                  fontSize: '14px',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Email and Document Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
            Update Profile
          </h3>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your email"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: '#f9fafb',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          />
          <button
            onClick={handleUpdateProfile}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            Update Profile
          </button>
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
            My Document
          </h3>
          <button
            onClick={() => document.getElementById('fileInput').click()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
          >
            Choose Document
          </button>
          <input
            id="fileInput"
            type="file"
            onChange={handleDocumentChange}
            style={{ display: 'none' }}
          />
          {document && (
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '12px' }}>Selected: {document.name}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;