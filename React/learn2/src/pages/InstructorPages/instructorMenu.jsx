import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 bg-blue-50 p-4 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-6">
          {isSidebarOpen && <h2 className="text-lg font-semibold text-gray-700">Menu</h2>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 hover:text-gray-800"
          >
            {isSidebarOpen ? '◄' : '►'}
          </button>
        </div>
        <div className="mb-6">
          <div className="text-xs text-gray-500 uppercase mb-2">
            {isSidebarOpen ? 'MENU' : ''}
          </div>
          <div
            className="menu-item px-3 py-2 text-blue-500 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/instructorPortal')}
          >
            {isSidebarOpen ? 'Dashboard' : '🏠'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/instructorPortal')}
          >
            {isSidebarOpen ? 'Manage Profile' : '👤'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/manageStudents')}
          >
            {isSidebarOpen ? 'Manage Students' : '👥'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/lesson-review')}
          >
            {isSidebarOpen ? 'Lesson Review' : '📝'}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 uppercase mb-2">
            {isSidebarOpen ? 'OTHERS' : ''}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/settings')}
          >
            {isSidebarOpen ? 'Settings' : '⚙️'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/payment')}
          >
            {isSidebarOpen ? 'Payment' : '💳'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/accounts')}
          >
            {isSidebarOpen ? 'Accounts' : '🏦'}
          </div>
          <div
            className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
            onClick={() => handleMenuClick('/help')}
          >
            {isSidebarOpen ? 'Help' : '❓'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default InstructorLayout;