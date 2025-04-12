
import React from 'react';
import Navbar from '../LandingPage/Navbar'; // Adjust the path as needed
import InstructorMenu from './instructorMenu.jsx';




const LessonReview = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Placeholder Lesson', description: 'Add a lesson to show here.', price: 'Free' },
  ]);
  const [newLesson, setNewLesson] = useState({ title: '', description: '', price: '' });
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingLesson) {
      setEditingLesson((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewLesson((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.description || !newLesson.price) {
      alert('Please fill out all fields.');
      return;
    }
    if (isNaN(newLesson.price) || newLesson.price <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    setLessons((prev) => [
      ...prev,
      { id: prev.length + 1, title: newLesson.title, description: newLesson.description, price: `$${newLesson.price}` },
    ]);
    setNewLesson({ title: '', description: '', price: '' });
    setIsAddLessonOpen(false);
  };

  const handleEditLesson = (lessonId) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    setEditingLesson({ ...lesson, price: lesson.price.replace('$', '') });
    setIsAddLessonOpen(true);
    setOpenMenu(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingLesson.title || !editingLesson.description || !editingLesson.price) {
      alert('Please fill out all fields.');
      return;
    }
    if (isNaN(editingLesson.price) || editingLesson.price <= 0) {
      alert('Price must be a positive number.');
      return;
    }
    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === editingLesson.id
          ? { ...editingLesson, price: `$${editingLesson.price}` }
          : lesson
      )
    );
    setEditingLesson(null);
    setIsAddLessonOpen(false);
  };

  const handleReviewComments = (lessonId) => {
    alert(`Review Comments for lesson ID: ${lessonId}`);
  };

  const toggleMenu = (lessonId) => {
    setOpenMenu((prev) => (prev === lessonId ? null : lessonId));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>Lesson Review</h1>
        <button
          onClick={() => {
            setEditingLesson(null);
            setNewLesson({ title: '', description: '', price: '' });
            setIsAddLessonOpen(true);
          }}
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
          Add Lesson
        </button>
      </div>

      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
        Manage your lessons and review student feedback.
      </p>

      {/* Lesson List */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Lessons</h2>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              {lesson.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>{lesson.description}</p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              <strong>Price:</strong> {lesson.price}
            </p>

            {/* Three-dot menu */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}>
              <div
                onClick={() => toggleMenu(lesson.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <div style={{ width: '4px', height: '4px', backgroundColor: '#6b7280', borderRadius: '50%' }}></div>
                <div style={{ width: '4px', height: '4px', backgroundColor: '#6b7280', borderRadius: '50%' }}></div>
                <div style={{ width: '4px', height: '4px', backgroundColor: '#6b7280', borderRadius: '50%' }}></div>
              </div>

              {openMenu === lesson.id && (
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '0',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    width: '120px',
                  }}
                >
                  <button
                    onClick={() => handleEditLesson(lesson.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginBottom: '4px',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
                  >
                    Edit Lesson
                  </button>
                  <button
                    onClick={() => handleReviewComments(lesson.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px',
                      backgroundColor: '#f59e0b',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#d97706')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#f59e0b')}
                  >
                    See Reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Lesson Modal */}
      {isAddLessonOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              width: '400px',
              maxWidth: '90%',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
              {editingLesson ? 'Edit Lesson' : 'Add a New Lesson'}
            </h2>
            <form onSubmit={editingLesson ? handleSaveEdit : handleAddLesson}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>
                  Lesson Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingLesson ? editingLesson.title : newLesson.title}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>
                  Lesson Description
                </label>
                <textarea
                  name="description"
                  value={editingLesson ? editingLesson.description : newLesson.description}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    minHeight: '80px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#1f2937', marginBottom: '8px' }}>
                  Lesson Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editingLesson ? editingLesson.price : newLesson.price}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
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
                  {editingLesson ? 'Save Changes' : 'Add Lesson'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddLessonOpen(false);
                    setEditingLesson(null);
                    setNewLesson({ title: '', description: '', price: '' });
                  }}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonReview;