import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructorMenu from './instructorMenu'; // Import the sidebar component

const ManageStudents = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Aasta Katwal',
      contactNumber: '123-456-7890',
      description: 'Lesson at 10:00 AM, Upcoming: 15th April',
      notes: 'Needs improvement in parking.',
    },
    {
      id: 2,
      name: 'Shivendra K C',
      contactNumber: '987-654-3210',
      description: 'Lesson at 2:00 PM, Upcoming: 16th April',
      notes: 'Good at highway driving.',
    },
    {
      id: 3,
      name: 'Prashant Joshi',
      contactNumber: '555-666-7777',
      description: 'Lesson at 4:00 PM, Upcoming: 17th April',
      notes: 'Struggles with reverse parking.',
    },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', contactNumber: '', description: '' });
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingStudent, setEditingStudent] = useState({}); // Initialize as an empty object
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar

  const navigate = useNavigate(); // Use React Router's navigate function

  // Handle sidebar menu navigation
  const handleMenuClick = (path) => {
    navigate(path); // Use React Router for navigation
  };

  // Add a new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.contactNumber || !newStudent.description) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/^\d+$/.test(newStudent.contactNumber)) {
      alert('Contact number must be numeric.');
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
    setShowAddStudentForm(false); // Hide the form after adding
  };

  // Update student details
  const handleUpdateStudent = (id, updatedDetails) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, ...updatedDetails } : student
      )
    );
    setEditingStudentId(null); // Exit edit mode
    setEditingStudent({}); // Clear local state
  };

  // Remove a student
  const handleRemoveStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Search students
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.contactNumber.includes(searchQuery)
  );

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'contactNumber') return a.contactNumber.localeCompare(b.contactNumber);
    return 0;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <InstructorMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleMenuClick={handleMenuClick}
      />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Students</h1>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search students..."
            className="p-2 border border-gray-300 rounded-md flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="contactNumber">Sort by Contact Number</option>
          </select>
        </div>

        {/* Toggle Add Student Form */}
        <div className="mb-6 flex justify-end">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
              showAddStudentForm ? 'bg-red-500 hover:bg-red-600' : ''
            }`}
            onClick={() => setShowAddStudentForm(!showAddStudentForm)}
          >
            {showAddStudentForm ? 'Close Form' : 'Add Student'}
          </button>
        </div>

        {/* Add Student Form */}
        {showAddStudentForm && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border border-gray-200 rounded-md shadow-lg p-6 z-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Student</h3>
            <input
              type="text"
              placeholder="Student Name"
              className="p-2 border border-gray-300 rounded-md w-full mb-2"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="p-2 border border-gray-300 rounded-md w-full mb-2"
              value={newStudent.contactNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setNewStudent({ ...newStudent, contactNumber: value });
                }
              }}
            />
            <textarea
              placeholder="Description (e.g., time of lesson, upcoming lesson)"
              className="p-2 border border-gray-300 rounded-md w-full mb-2"
              value={newStudent.description}
              onChange={(e) => setNewStudent({ ...newStudent, description: e.target.value })}
            ></textarea>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
              onClick={handleAddStudent}
            >
              Add Student
            </button>
          </div>
        )}

        {/* Display Students */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition relative"
            >
              {editingStudentId === student.id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full mb-2"
                    value={editingStudent.name || ''} // Use local state
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-md w-full mb-2"
                    value={editingStudent.contactNumber || ''} // Use local state
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setEditingStudent({ ...editingStudent, contactNumber: value });
                      }
                    }}
                  />
                  <textarea
                    className="p-2 border border-gray-300 rounded-md w-full mb-2 bg-gray-100 cursor-not-allowed"
                    value={editingStudent.description || ''} // Use local state
                    readOnly
                  ></textarea>
                  <textarea
                    className="p-2 border border-gray-300 rounded-md w-full mb-2"
                    placeholder="Add notes"
                    value={editingStudent.notes || ''} // Use local state
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, notes: e.target.value })
                    }
                  ></textarea>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                    onClick={() => {
                      handleUpdateStudent(student.id, editingStudent); // Save changes to main state
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                // View Mode
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-600">Contact: {student.contactNumber}</p>
                  <p className="text-sm text-gray-600">{student.description}</p>
                  <p className="text-sm text-gray-600">
                    Notes: {student.notes || 'No notes added'}
                  </p>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setEditingStudentId(student.id); // Enter edit mode
                        setEditingStudent(student); // Initialize local state with current student data
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleRemoveStudent(student.id)}
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
    </div>
  );
};

export default ManageStudents;