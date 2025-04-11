import React from 'react';
import Navbar from '../LandingPage/Navbar'; // Adjust the path as needed
import InstructorMenu from './instructorMenu.jsx';

const LessonReview = () => {
  const handleAddLesson = () => {
    alert('Add Lesson button clicked!');
  };

  const handleEditLesson = (lessonId) => {
    alert(`Edit Lesson button clicked for lesson ID: ${lessonId}`);
  };

  const handleReviewComments = (lessonId) => {
    alert(`Review Comments button clicked for lesson ID: ${lessonId}`);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* Instructor Menu */}
        <InstructorMenu />

        {/* Lesson Review Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1 style={{ marginBottom: '20px' }}>Lesson Review</h1>
          <p style={{ marginBottom: '20px' }}>
            Welcome to the lesson review page. Here you can manage lessons and review student feedback.
          </p>

          {/* Add Lesson Button */}
          <button
            onClick={handleAddLesson}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Add Lesson
          </button>

          {/* Example Lesson Review Section */}
          <div
            style={{
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '20px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Lesson Title: Example Lesson</h2>
            <p style={{ marginBottom: '20px' }}>Description: This is an example lesson description.</p>

            {/* Edit Lesson Button */}
            <button
              onClick={() => handleEditLesson(1)}
              style={{
                padding: '10px 15px',
                backgroundColor: '#28A745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Edit Lesson
            </button>

            {/* Review Comments Button */}
            <button
              onClick={() => handleReviewComments(1)}
              style={{
                padding: '10px 15px',
                backgroundColor: '#FFC107',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Review Comments
            </button>
          </div>

          {/* Add more lesson review sections dynamically */}
        </div>
      </div>
    </div>
  );
};

export default LessonReview;