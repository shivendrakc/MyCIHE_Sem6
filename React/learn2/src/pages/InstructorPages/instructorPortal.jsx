import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorPortal = () => {
    const [students, setStudents] = useState([
        { name: 'Aasta Katwal', score: 78 },
        { name: 'Shivendra K C', score: 20 },
        { name: 'Prashant Joshi', score: 33 },
        { name: 'Sandesh Ghimire', score: 72 },
    ]);

    const [stats, setStats] = useState({
        fullProgress: 85,
        theoryProgress: 92,
        activeBookings: 27,
        questionsAnswered: 3298,
        sessionLength: '2hr 20min',
        totalRevenue: 6400,
        currentEngagement: 88,
        revenueGain: 34,
    });

    const [searchQuery, setSearchQuery] = useState(''); // For search functionality
    const [selectedStudent, setSelectedStudent] = useState(students[1]); // Default to Shivendra K C
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For responsive sidebar

    const navigate = useNavigate();

    useEffect(() => {
        // Simulate fetching data from API
        const fetchData = async () => {
            try {
                // Replace with actual API calls
                // const studentsResponse = await fetch('/api/students');
                // const studentsData = await studentsResponse.json();
                // setStudents(studentsData);

                // const statsResponse = await fetch('/api/stats');
                // const statsData = await statsResponse.json();
                // setStats(statsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // Update progress circles dynamically
        const updateProgressCircle = (id, value) => {
            const circle = document.getElementById(id);
            const valueElement = document.getElementById(`${id}Value`);
            if (circle && valueElement) {
                const radius = 74;
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (value / 100) * circumference;
                circle.style.strokeDasharray = circumference;
                circle.style.strokeDashoffset = offset;
                valueElement.textContent = `${value}%`;
            }
        };

        updateProgressCircle('fullProgress', stats.fullProgress);
        updateProgressCircle('theoryProgress', stats.theoryProgress);
    }, [stats]);

    // Handle sidebar menu navigation
    const handleMenuClick = (path) => {
        // Dependency: Assumes these routes exist in your router configuration (e.g., App.js)
        navigate(path);
    };

    // Filter students based on search query
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-[calc(100vh-80px)] pt-[80px] pb-[50px] bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed top-[80px] bottom-0 bg-blue-50 p-4 transition-all duration-300 ${
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
                        onClick={() => handleMenuClick('/instructor-portal')}
                    >
                        {isSidebarOpen ? 'Dashboard' : '🏠'}
                    </div>
                    <div
                        className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
                        onClick={() => handleMenuClick('/instructor-profile')}
                    >
                        {isSidebarOpen ? 'Manage Profile' : '👤'}
                    </div>
                    <div
                        className="menu-item px-3 py-2 text-gray-700 rounded-md cursor-pointer hover:bg-blue-100"
                        onClick={() => handleMenuClick('/instructor-students')}
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
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="w-2/3">
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full p-2 bg-blue-50 border border-blue-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-800">Reza Rafah</span>
                    </div>
                </div>

                {/* Task Section */}
                <div className="text-center my-10">
                    <h2 className="text-2xl font-semibold text-gray-800">Today’s Task</h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Check your daily tasks and schedules
                    </p>
                    <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                        Today's Schedule
                    </button>
                </div>

                {/* Analysis Section */}
                <div className="my-6">
                    <h3 className="text-lg font-semibold text-gray-800">Individual Analysis</h3>
                    <span className="text-sm text-gray-600">{selectedStudent.name}</span>
                    <div className="flex gap-6 mt-4">
                        <div className="relative w-40 h-40">
                            <div className="absolute inset-0 bg-orange-400 opacity-90 rounded-full flex items-center justify-center">
                                <svg width="160" height="160" className="absolute">
                                    <circle
                                        className="fill-none stroke-white stroke-[10px] opacity-30"
                                        cx="80"
                                        cy="80"
                                        r="74"
                                    ></circle>
                                    <circle
                                        className="fill-none stroke-white stroke-[10px] stroke-linecap-round transition-all duration-500"
                                        id="fullProgress"
                                        cx="80"
                                        cy="80"
                                        r="74"
                                        transform="rotate(-90 80 80)"
                                    ></circle>
                                </svg>
                                <div id="fullProgressValue" className="text-3xl text-white font-semibold">
                                    0%
                                </div>
                                <div className="absolute bottom-4 text-sm text-white">
                                    Full Progress
                                </div>
                            </div>
                        </div>
                        <div className="relative w-40 h-40">
                            <div className="absolute inset-0 bg-blue-400 opacity-90 rounded-full flex items-center justify-center">
                                <svg width="160" height="160" className="absolute">
                                    <circle
                                        className="fill-none stroke-white stroke-[10px] opacity-30"
                                        cx="80"
                                        cy="80"
                                        r="74"
                                    ></circle>
                                    <circle
                                        className="fill-none stroke-white stroke-[10px] stroke-linecap-round transition-all duration-500"
                                        id="theoryProgress"
                                        cx="80"
                                        cy="80"
                                        r="74"
                                        transform="rotate(-90 80 80)"
                                    ></circle>
                                </svg>
                                <div id="theoryProgressValue" className="text-3xl text-white font-semibold">
                                    0%
                                </div>
                                <div className="absolute bottom-4 text-sm text-white">
                                    Theory Progress
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Section */}
                <div className="my-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Students</h3>
                    <div className="w-72">
                        {filteredStudents.map((student, index) => (
                            <div
                                key={index}
                                className={`flex items-center p-3 mb-2 rounded-md cursor-pointer transition ${
                                    selectedStudent.name === student.name
                                        ? 'bg-blue-100'
                                        : 'bg-white hover:bg-gray-50'
                                } shadow-sm`}
                                onClick={() => setSelectedStudent(student)}
                            >
                                <div className="w-7 h-7 bg-gray-300 rounded-full mr-3"></div>
                                <div className="flex-1 text-sm text-gray-800">{student.name}</div>
                                <div className="text-sm text-gray-600 opacity-70">{student.score}%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex gap-6 my-6">
                    <div className="w-36 h-40 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
                        <div className="text-2xl font-bold text-gray-800 mt-4">{stats.activeBookings}</div>
                        <div className="text-sm text-gray-600 mt-2">Active Bookings</div>
                    </div>
                    <div className="w-36 h-40 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
                        <div className="text-2xl font-bold text-gray-800 mt-4">{stats.questionsAnswered.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 mt-2">Questions Answered</div>
                    </div>
                    <div className="w-36 h-40 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition">
                        <div className="text-2xl font-bold text-gray-800 mt-4">{stats.sessionLength}</div>
                        <div className="text-sm text-gray-600 mt-2">Av. Session Length</div>
                    </div>
                </div>

                {/* Revenue Section */}
                <div className="flex gap-6 my-6">
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition relative">
                        <div className="text-2xl font-bold text-gray-800 mt-4">${stats.totalRevenue.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 mt-2">Total Revenue</div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <svg width="100" height="40">
                                <polyline
                                    points="0,40 20,30 40,35 60,20 80,25 100,15"
                                    className="fill-none stroke-blue-500 stroke-2"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition relative">
                        <div className="text-2xl font-bold text-gray-800 mt-4">{stats.currentEngagement}%</div>
                        <div className="text-sm text-gray-600 mt-2">Current Engagement</div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <svg width="100" height="40">
                                <polyline
                                    points="0,40 20,35 40,30 60,25 80,20 100,15"
                                    className="fill-none stroke-blue-500 stroke-2"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition relative">
                        <div className="text-2xl font-bold text-gray-800 mt-4">+{stats.revenueGain}%</div>
                        <div className="text-sm text-gray-600 mt-2">Revenue Gain</div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <svg width="100" height="40">
                                <polyline
                                    points="0,40 20,35 40,30 60,25 80,20 100,15"
                                    className="fill-none stroke-blue-500 stroke-2"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorPortal;