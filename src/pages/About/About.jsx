import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">

      {/* ── HERO HEADER ── */}
      <section className="about-hero">
        <div className="about-hero-noise" />
        <div className="about-hero-inner container">
          <div className="about-hero-badge">
            <Star size={12} />
            <span>Our Story &amp; Mission</span>
          </div>
          <h1 className="about-hero-title">
            Built on <span className="about-hero-highlight">Purpose</span>,<br />
            Driven by <span className="about-hero-highlight2">People</span>
          </h1>
          <p className="about-hero-sub">
            জীৱন ৰেখাৰ প্ৰতিটো বিন্দুত — At every point of the lifeline, Britto Foundation bridges critical gaps in health, environment, and education across Assam.
          </p>

          {/* Hero Stats Row */}
          <div className="about-stats-row">
            <div className="about-stat-chip">
              <span className="about-stat-num">3+</span>
              <span className="about-stat-lbl">Pillars of Impact</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-chip">
              <span className="about-stat-num">2026</span>
              <span className="about-stat-lbl">Founded in Assam</span>
            </div>
            <div className="about-stat-divider" />
            <div className="about-stat-chip">
              <span className="about-stat-num">∞</span>
              <span className="about-stat-lbl">Community Reach</span>
            </div>
          </div>

          {/* See Ecosystem Workflow Button */}
          <div className="about-hero-actions" style={{ marginTop: '1.5rem' }}>
            <Link to="/workflow" className="about-workflow-btn">
              <span>See Ecosystem Workflow</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
