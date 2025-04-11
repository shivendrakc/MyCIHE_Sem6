import React, { useState } from 'react';
import InstructorMenu from './instructorMenu.jsx';

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
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value.endsWith('@gmail.com') ? value : `${value}@gmail.com`);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleUpdateProfile = () => {
    setDisplayProfile({ ...profile, email });
    alert('Profile updated successfully!');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#F9F9F9' }}>
      {/* Sidebar */}
      <InstructorMenu />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#3E435D' }}>Welcome, {displayProfile.fullName}</h1>
          <p style={{ fontSize: '16px', fontWeight: '300', color: '#ADA7A7' }}>Tue, 07 April 2025</p>
        </div>

        {/* Profile Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#FFFFFF',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <img
            src="https://placehold.co/101x102"
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
          />
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '500', color: '#3E435D' }}>{displayProfile.fullName}</h2>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Full Name</p>

            <p style={{ fontSize: '16px', fontWeight: '400', color: '#ADA7A7' }}>{displayProfile.nickName}</p>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Nick Name</p>

            <p style={{ fontSize: '16px', fontWeight: '400', color: '#ADA7A7' }}>{displayProfile.gender}</p>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Gender</p>

            <p style={{ fontSize: '16px', fontWeight: '400', color: '#ADA7A7' }}>{displayProfile.country}</p>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Country</p>

            <p style={{ fontSize: '16px', fontWeight: '400', color: '#ADA7A7' }}>{displayProfile.language}</p>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Language</p>

            <p style={{ fontSize: '16px', fontWeight: '400', color: '#ADA7A7' }}>{displayProfile.email}</p>
            <p style={{ fontSize: '12px', fontWeight: '400', color: '#ADA7A7', marginBottom: '10px' }}>Email</p>
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
          <div>
            <label style={{ fontSize: '14px', color: '#3E435D', marginBottom: '5px', display: 'block' }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              placeholder="Your Full Name"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                background: '#F9F9F9',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#3E435D', marginBottom: '5px', display: 'block' }}>
              Nick Name
            </label>
            <input
              type="text"
              name="nickName"
              value={profile.nickName}
              onChange={handleInputChange}
              placeholder="Your Nick Name"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                background: '#F9F9F9',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#3E435D', marginBottom: '5px', display: 'block' }}>
              Gender
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                background: '#F9F9F9',
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="not-say">Would rather not say</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#3E435D', marginBottom: '5px', display: 'block' }}>
              Country
            </label>
            <input
              type="text"
              name="country"
              value={profile.country}
              onChange={handleInputChange}
              placeholder="Type your country"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                background: '#F9F9F9',
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: '14px', color: '#3E435D', marginBottom: '5px', display: 'block' }}>
              Language
            </label>
            <input
              type="text"
              name="language"
              value={profile.language}
              onChange={handleInputChange}
              placeholder="Type your language"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: '8px',
                background: '#F9F9F9',
              }}
            />
          </div>
        </div>

        {/* Email and Document Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#3E435D', marginBottom: '10px' }}>
              Update Profile
            </h3>
            <button
              onClick={handleUpdateProfile}
              style={{
                padding: '10px 20px',
                background: '#4182F9',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Update Profile
            </button>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#3E435D', marginBottom: '10px' }}>
              My Document
            </h3>
            <button
              onClick={() => document.getElementById('fileInput').click()}
              style={{
                padding: '10px 20px',
                background: '#4182F9',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
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
              <p style={{ fontSize: '14px', color: '#ADA7A7', marginTop: '10px' }}>
                Selected: {document.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;