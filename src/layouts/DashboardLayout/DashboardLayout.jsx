import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, LayoutDashboard, Search, PlusCircle, Trophy, BookOpen, 
  FileSpreadsheet, ShieldAlert, LogOut, Menu, X, User, Settings 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth/useAuth';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuLinks = () => {
    const role = currentUser.role;
    const links = [];

    // General common dashboard links
    links.push({
      to: '/dashboard',
      label: 'Overview',
      icon: <LayoutDashboard size={18} />
    });

    if (role === 'Donor') {
      links.push(
        { to: '/dashboard/donor-registration', label: 'Donor Status', icon: <User size={18} /> },
        { to: '/dashboard/donor-search', label: 'Search Donors', icon: <Search size={18} /> },
        { to: '/dashboard/blood-request', label: 'Blood Requests', icon: <PlusCircle size={18} /> }
      );
    } else if (role === 'Institution') {
      links.push(
        { to: '/dashboard/institution', label: 'My Group Panel', icon: <LayoutDashboard size={18} /> },
        { to: '/dashboard/leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
        { to: '/dashboard/donor-search', label: 'Search Donors', icon: <Search size={18} /> }
      );
    } else if (role === 'Hospital') {
      links.push(
        { to: '/dashboard/hospital', label: 'Demand Panel', icon: <LayoutDashboard size={18} /> },
        { to: '/dashboard/blood-request', label: 'Request Blood', icon: <PlusCircle size={18} /> },
        { to: '/dashboard/donor-search', label: 'Search Donors', icon: <Search size={18} /> }
      );
    } else if (role === 'Government') {
      links.push(
        { to: '/dashboard/government', label: 'Govt Overview', icon: <LayoutDashboard size={18} /> },
        { to: '/dashboard/reports', label: 'Reports & Logs', icon: <FileSpreadsheet size={18} /> },
        { to: '/dashboard/leaderboard', label: 'Leaderboards', icon: <Trophy size={18} /> },
        { to: '/dashboard/civic-report', label: 'Civic Reports', icon: <ShieldAlert size={18} /> }
      );
    } else if (role === 'Student') {
      links.push(
        { to: '/dashboard/student', label: 'My Enrolled Courses', icon: <User size={18} /> },
        { to: '/dashboard/courses', label: 'Browse Courses', icon: <BookOpen size={18} /> }
      );
    }

    return links;
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Sidebar Panel */}
      <aside className={`dashboard-sidebar glass-panel ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={() => setSidebarOpen(false)}>
            <Heart className="logo-icon pulse-primary" size={22} />
            <div className="logo-text">
              <span className="logo-brand">BRITTO</span>
              <span className="logo-sub">FOUNDATION</span>
            </div>
          </Link>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="sidebar-user-card">
          <div className="user-avatar-lg">
            {currentUser.name.charAt(0)}
          </div>
          <div className="user-info-text">
            <h5 className="user-profile-name">{currentUser.name}</h5>
            <span className="badge badge-primary user-profile-role">{currentUser.role}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {getMenuLinks().map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              end={link.to === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="sidebar-footer">
          <button className="sidebar-action-btn logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header glass-panel">
          <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          
          <div className="dashboard-title-bar">
            <h3>Portal Panel</h3>
          </div>

          <div className="header-actions">
            <Link to="/" className="home-nav-btn">Home Website</Link>
            <div className="profile-avatar-sm">
              {currentUser.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="dashboard-content">
          <div className="container dashboard-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
