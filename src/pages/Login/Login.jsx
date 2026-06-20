import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowLeft, Heart, Mail } from 'lucide-react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-wip-page">
      {/* Background decorative blobs */}
      <div className="wip-blob wip-blob-1" />
      <div className="wip-blob wip-blob-2" />

      <div className="wip-card">
        {/* Logo */}
        <div className="wip-logo">
          <img src="/logo.png" alt="Britto Foundation" className="wip-logo-img" />
        </div>

        {/* Icon */}
        <div className="wip-icon-wrap">
          <Construction size={32} />
        </div>

        {/* Text */}
        <div className="wip-text">
          <h1 className="wip-title">We're Working On This</h1>
          <p className="wip-subtitle">
            The login portal is currently under active development. We're engineering
            secure role-based dashboards for donors, hospitals, institutions, and more.
          </p>
        </div>

        {/* Status pills */}
        <div className="wip-status-row">
          <div className="wip-status-pill">
            <span className="wip-dot wip-dot-green" />
            <span>System Architecture</span>
          </div>
          <div className="wip-status-pill">
            <span className="wip-dot wip-dot-yellow" />
            <span>Auth Workflows</span>
          </div>
          <div className="wip-status-pill">
            <span className="wip-dot wip-dot-red" />
            <span>Portal Launch</span>
          </div>
        </div>

        {/* Divider */}
        <div className="wip-divider" />

        {/* Back button */}
        <Link to="/" className="wip-back-btn">
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
