import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Aasta Katwal',
      contactNumber: '1234567890',
      description: 'Lesson at 10:00 AM, Upcoming: 15th April',
      notes: 'Needs improvement in parking.',
    },
    {
      id: 2,
      name: 'Shivendra K C',
      contactNumber: '9876543210',
      description: 'Lesson at 2:00 PM, Upcoming: 16th April',
      notes: 'Good at highway driving.',
    },
    {
      id: 3,
      name: 'Prashant Joshi',
      contactNumber: '5556667777',
      description: 'Lesson at 4:00 PM, Upcoming: 17th April',
      notes: 'Struggles with reverse parking.',
    },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', contactNumber: '', description: '' });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingStudent, setEditingStudent] = useState({});
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const navigate = useNavigate();

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.contactNumber || !newStudent.description) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^\d{10}$/.test(newStudent.contactNumber)) {
      alert('Contact number must be 10 digits.');
      return;
    }
    setStudents([
      ...students,
      {
        id: students.length + 1,
        name: newStudent.name,
        contactNumber: newStudent.contactNumber,
        description: newStudent.description,
        notes: '',
      },
    ]);
    setNewStudent({ name: '', contactNumber: '', description: '' });
    setShowAddStudentForm(false);
  };

  const handleUpdateStudent = (id, updatedDetails) => {
    if (!updatedDetails.name || !updatedDetails.contactNumber) {
      alert('Name and contact number are required.');
      return;
    }
    if (!/^\d{10}$/.test(updatedDetails.contactNumber)) {
      alert('Contact number must be 10 digits.');
      return;
    }
    setStudents(students.map((student) => (student.id === id ? { ...student, ...updatedDetails } : student)));
    setEditingStudentId(null);
    setEditingStudent({});
  };

  const handleRemoveStudent = (id) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.contactNumber.includes(searchQuery)
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'contactNumber') return a.contactNumber.localeCompare(b.contactNumber);
    return 0;
  });

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
        Manage Students
      </h1>

      {/* Search and Sort */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
          }}
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="contactNumber">Sort by Contact Number</option>
        </select>
      </div>

      {/* Toggle Add Student Form */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          onClick={() => setShowAddStudentForm(!showAddStudentForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: showAddStudentForm ? '#ef4444' : '#3b82f6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = showAddStudentForm ? '#dc2626' : '#2563eb')
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = showAddStudentForm ? '#ef4444' : '#3b82f6')
          }
        >
          {showAddStudentForm ? 'Close Form' : 'Add Student'}
        </button>
      </div>

      {/* Add Student Form */}
      {showAddStudentForm && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
            width: '400px',
            maxWidth: '90%',
            zIndex: 1000,
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Add a Student
          </h3>
          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={newStudent.contactNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setNewStudent({ ...newStudent, contactNumber: value });
              }
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          />
          <textarea
            placeholder="Description (e.g., time of lesson, upcoming lesson)"
            value={newStudent.description}
            onChange={(e) => setNewStudent({ ...newStudent, description: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              minHeight: '80px',
              marginBottom: '12px',
            }}
          />
          <button
            onClick={handleAddStudent}
            style={{
              width: '100%',
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
            Add Student
          </button>
        </div>
      )}

      {/* Display Students */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {sortedStudents.map((student) => (
          <div
            key={student.id}
            style={{
              backgroundColor: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            {editingStudentId === student.id ? (
              <div>
                <input
                  type="text"
                  value={editingStudent.name || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px',
                  }}
                />
                <input
                  type="text"
                  value={editingStudent.contactNumber || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setEditingStudent({ ...editingStudent, contactNumber: value });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px',
                  }}
                />
                <textarea
                  value={editingStudent.description || ''}
                  readOnly
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px',
                    backgroundColor: '#f3f4f6',
                    cursor: 'not-allowed',
                  }}
                />
                <textarea
                  placeholder="Add notes"
                  value={editingStudent.notes || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px',
                    minHeight: '80px',
                  }}
                />
                <button
                  onClick={() => handleUpdateStudent(student.id, editingStudent)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#059669')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#10b981')}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  {student.name}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                  Contact: {student.contactNumber}
                </p>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{student.description}</p>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  Notes: {student.notes || 'No notes added'}
                </p>
                <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setEditingStudentId(student.id);
                      setEditingStudent(student);
                    }}
                    style={{
                      fontSize: '14px',
                      color: '#3b82f6',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveStudent(student.id)}
                    style={{
                      fontSize: '14px',
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseOut={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;