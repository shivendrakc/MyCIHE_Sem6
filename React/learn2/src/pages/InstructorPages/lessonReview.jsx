import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorMenu from './instructorMenu.jsx';
import Navbar from "../LandingPage/Navbar";

const LessonReview = () => {
  const navigate = useNavigate();

  // State for lessons
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Placeholder Lesson', description: 'Add a lesson to show here.', price: 'Free' },
  ]);

  // State for the form
  const [newLesson, setNewLesson] = useState({ title: '', description: '', price: '' });

  // State to track if the add lesson form is open
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);

  // State to track which menu is open
  const [openMenu, setOpenMenu] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLesson((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new lesson
  const handleAddLesson = (e) => {
    e.preventDefault();
    if (newLesson.title && newLesson.description && newLesson.price) {
      setLessons((prev) => [
        ...prev,
        { id: prev.length + 1, title: newLesson.title, description: newLesson.description, price: `$${newLesson.price}` },
      ]);
      setNewLesson({ title: '', description: '', price: '' }); // Reset form
      setIsAddLessonOpen(false); // Close the form
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Handle editing a lesson
  const handleEditLesson = (lessonId) => {
    alert(`Edit Lesson button clicked for lesson ID: ${lessonId}`);
  };

  // Handle reviewing comments for a lesson
  const handleReviewComments = (lessonId) => {
    alert(`Review Comments button clicked for lesson ID: ${lessonId}`);
  };

  // Toggle the menu visibility
  const toggleMenu = (lessonId) => {
    setOpenMenu((prev) => (prev === lessonId ? null : lessonId));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar */}
      <Navbar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Instructor Menu */}
        <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}>
          <InstructorMenu />
        </div>

        {/* Lesson Review Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Lesson Review</h1>
            <button
              onClick={() => setIsAddLessonOpen(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Add Lesson
            </button>
          </div>

          <p style={{ marginBottom: '20px', fontSize: '16px', color: '#555' }}>
            Welcome to the lesson review page. Here you can manage lessons and review student feedback.
          </p>

          {/* Lesson List */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Lessons</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '15px',
                    marginBottom: '10px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    position: 'relative',
                  }}
                >
                  <h3 style={{ marginBottom: '5px', fontSize: '18px', fontWeight: 'bold' }}>{lesson.title}</h3>
                  <p style={{ marginBottom: '5px', fontSize: '14px', color: '#555' }}>{lesson.description}</p>
                  <p style={{ marginBottom: '10px', fontSize: '14px', color: '#555' }}>
                    <strong>Price:</strong> {lesson.price}
                  </p>

                  {/* Three-dot menu */}
                  <div style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer' }}>
                    <div
                      onClick={() => toggleMenu(lesson.id)}
                      style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#555',
                        borderRadius: '50%',
                        marginBottom: '3px',
                      }}
                    ></div>
                    <div
                      onClick={() => toggleMenu(lesson.id)}
                      style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#555',
                        borderRadius: '50%',
                        marginBottom: '3px',
                      }}
                    ></div>
                    <div
                      onClick={() => toggleMenu(lesson.id)}
                      style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#555',
                        borderRadius: '50%',
                      }}
                    ></div>

                    {/* Hover menu */}
                    {openMenu === lesson.id && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: '0',
                          backgroundColor: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '5px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          zIndex: 10,
                        }}
                      >
                        <button
                          onClick={() => handleEditLesson(lesson.id)}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#28A745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            marginBottom: '5px',
                          }}
                        >
                          Edit Lesson
                        </button>
                        <button
                          onClick={() => handleReviewComments(lesson.id)}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#FFC107',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                        >
                          See Reviews
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Add Lesson Form (Modal) */}
          {isAddLessonOpen && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 1000,
                width: '400px',
              }}
            >
              <h2 style={{ marginBottom: '10px', fontSize: '20px', fontWeight: 'bold' }}>Add a New Lesson</h2>
              <form onSubmit={handleAddLesson}>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newLesson.title}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Lesson Description
                  </label>
                  <textarea
                    name="description"
                    value={newLesson.description}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                    Lesson Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newLesson.price}
                    onChange={handleInputChange}
                    style={{
                      width: '100px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007BFF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Add Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddLessonOpen(false)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#DC3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonReview;