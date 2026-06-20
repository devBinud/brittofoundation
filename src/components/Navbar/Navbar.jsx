import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth/useAuth';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!currentUser) return '/';
    switch (currentUser.role) {
      case 'Government':
        return '/dashboard/government';
      case 'Hospital':
        return '/dashboard/hospital';
      case 'Institution':
        return '/dashboard/institution';
      case 'Donor':
        return '/dashboard/donor-search';
      case 'Student':
        return '/dashboard/student';
      default:
        return '/';
    }
  };

  return (
    <nav className={`glass-panel navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <img src="/logo.png" alt="Britto Foundation" className="navbar-logo-img" />
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/healthcare" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Healthcare</NavLink>
          <NavLink to="/education" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Education</NavLink>
          <NavLink to="/environment" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Environment</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>

          {currentUser ? (
            <div className="profile-dropdown-container">
              <button
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="profile-name-sm">{currentUser.name.split(' ')[0]}</span>
              </button>

              {showProfileMenu && (
                <div className="profile-menu animate-fade-in">
                  <div className="profile-menu-header">
                    <p className="menu-username">{currentUser.name}</p>
                    <span className="badge badge-primary menu-role">{currentUser.role}</span>
                  </div>
                  <hr className="menu-divider" />
                  <Link
                    to={getDashboardPath()}
                    className="menu-item"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button onClick={handleLogout} className="menu-item logout-btn-item">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="navbar-login-btn">
              <span>Login</span>
              <span className="login-btn-icon">
                <ArrowUpRight size={14} />
              </span>
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="navbar-menu-mobile animate-fade-in">
          <NavLink to="/" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/healthcare" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Healthcare</NavLink>
          <NavLink to="/education" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Education</NavLink>
          <NavLink to="/environment" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Environment</NavLink>
          <NavLink to="/about" className="nav-link-mobile" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/contact" className="nav-link-mobile" onClick={() => setIsOpen(false)}>Contact</NavLink>
          
          {!currentUser && (
            <div className="mobile-login-btn-container">
              <NavLink to="/login" className="navbar-login-btn-mobile" onClick={() => setIsOpen(false)}>
                <span>Login</span>
                <span className="login-btn-icon">
                  <ArrowUpRight size={14} />
                </span>
              </NavLink>
            </div>
          )}

          <hr className="mobile-menu-divider" />

          {currentUser && (
            <div className="mobile-profile-section">
              <div className="mobile-profile-info">
                <div className="profile-avatar-sm">{currentUser.name.charAt(0)}</div>
                <div>
                  <p className="mobile-user-name">{currentUser.name}</p>
                  <span className="badge badge-primary">{currentUser.role}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  navigate(getDashboardPath());
                }}
                className="w-full justify-center mt-3"
              >
                <LayoutDashboard size={16} /> Dashboard
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full justify-center mt-2"
              >
                <LogOut size={16} /> Sign Out
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
