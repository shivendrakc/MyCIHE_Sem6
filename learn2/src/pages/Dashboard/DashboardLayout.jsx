import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,223,0.35)] flex-shrink-0">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
      </svg>
    </div>
    <span className="text-white text-base font-bold tracking-tight whitespace-nowrap">
      Learn<span className="text-[#00d4df]">2</span>Drive
    </span>
  </div>
);

// Nav icons as inline SVGs (no MUI dependency)
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  People: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Assignment: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Person: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  School: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>,
  Logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  Menu: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>,
  ChevronLeft: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>,
  ChevronRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
};

const DashboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isAdmin = userInfo?.role === 'admin';
  const isStudent = userInfo?.role === 'student';
  const isInstructor = userInfo?.role === 'instructor';

  const menuItems = [
    { text: 'Dashboard',             Icon: Icons.Dashboard,  path: '/dashboard' },
    { text: 'Find Instructors',       Icon: Icons.People,     path: '/dashboard/instructors' },
    ...(isAdmin    ? [{ text: 'Applications',   Icon: Icons.Assignment, path: '/dashboard/instructor-applications', badge: true }] : []),
    ...(isStudent  ? [{ text: 'My Bookings',    Icon: Icons.Calendar,   path: '/dashboard/bookings' }] : []),
    { text: 'My Profile',             Icon: Icons.Person,     path: '/dashboard/profile' },
    ...(isInstructor ? [{ text: 'Manage Profile', Icon: Icons.Settings,   path: '/dashboard/instructor-profile' }] : []),
    ...(isStudent  ? [{ text: 'Become Instructor', Icon: Icons.School,   path: '/dashboard/become-instructor' }] : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const pageTitle = menuItems.find((i) => i.path === location.pathname)?.text || 'Dashboard';
  const initials = (userInfo?.name || 'U').charAt(0).toUpperCase();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#060b16] border-r border-white/6">
      {/* Logo */}
      <div className={`flex items-center h-16 px-5 border-b border-white/6 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && <Logo />}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden sm:flex w-7 h-7 items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/8 transition-all"
        >
          {collapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {menuItems.map(({ text, Icon, path, badge }) => {
          const active = location.pathname === path;
          return (
            <button
              key={text}
              onClick={() => { navigate(path); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative
                ${active
                  ? 'bg-[#00d4df]/10 text-[#00d4df] border border-[#00d4df]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/6'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? text : undefined}
            >
              <span className="flex-shrink-0 relative">
                <Icon />
                {badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00d4df] rounded-full" />
                )}
              </span>
              {!collapsed && <span className="truncate">{text}</span>}
              {active && !collapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#00d4df]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/6 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center text-sm font-bold text-[#080d1a] flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">{userInfo?.name || 'User'}</div>
              <div className="text-gray-500 text-xs capitalize">{userInfo?.role || 'student'}</div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <Icons.Logout />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  );

  const sidebarW = collapsed ? 'w-[72px]' : 'w-64';

  return (
    <div className="flex h-screen bg-[#080d1a] overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <aside className={`hidden sm:flex flex-col ${sidebarW} flex-shrink-0 transition-all duration-300 overflow-hidden`}>
        <SidebarContent />
      </aside>

      {/* Sidebar — mobile drawer */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col sm:hidden transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-5 bg-[#060b16] border-b border-white/6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/8 transition-all"
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 className="text-white font-semibold text-base">{pageTitle}</h1>
              <p className="text-gray-500 text-xs capitalize hidden sm:block">{userInfo?.role || 'student'} portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-white/6 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4df] to-[#1b9aa0] flex items-center justify-center text-sm font-bold text-[#080d1a]">
                  {initials}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-white text-sm font-medium leading-none">{userInfo?.name || 'User'}</div>
                  <div className="text-gray-500 text-xs capitalize mt-0.5">{userInfo?.role || 'student'}</div>
                </div>
                <svg className={`w-3 h-3 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f1829] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/8">
                      <div className="text-white text-sm font-semibold">{userInfo?.name}</div>
                      <div className="text-gray-400 text-xs truncate">{userInfo?.email}</div>
                    </div>
                    <button
                      onClick={() => { navigate('/dashboard/profile'); setProfileOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/6 transition-all"
                    >
                      <Icons.Person />
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border-t border-white/8"
                    >
                      <Icons.Logout />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
