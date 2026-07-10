import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">

      {/* ── HERO HEADER ── */}
      <section className="about-hero">
        <div className="about-hero-noise" />
        <div className="about-hero-inner container">
          <h1 className="about-hero-title">
            Built on <span className="about-hero-highlight">Purpose</span>,<br />
            Driven by <span className="about-hero-highlight2">People</span>
          </h1>
          <p className="about-hero-sub">
            জীৱন ৰেখাৰ প্ৰতিটো বিন্দুত - At every point of the lifeline, Ziv Foundation bridges critical gaps in health, environment, and education across Assam.
          </p>

          {/* See Ecosystem Workflow Button */}
          <div className="about-hero-actions">
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
