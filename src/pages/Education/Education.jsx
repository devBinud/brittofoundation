import React from 'react';
import eduImage from '../../assets/images/education/education.webp';
import './Education.css';

const Education = () => {
  return (
    <div className="education-page">
      {/* Top section with text, and theme gradient */}
      <div className="edu-top-section">
        <div className="container edu-header-container">
          <div className="edu-text-block">
            <h1 className="edu-page-title">Empowering Minds, Shaping Futures</h1>
            <p className="edu-page-subtitle">
              Access digital courses, student dashboards, and local school development programs driven by Britto Foundation's academic network.
            </p>
          </div>
        </div>
      </div>

      {/* Downside image banner */}
      <div className="edu-image-banner">
        <img src={eduImage} alt="Assam Education Program" className="edu-banner-img" />
      </div>
    </div>
  );
};

export default Education;
