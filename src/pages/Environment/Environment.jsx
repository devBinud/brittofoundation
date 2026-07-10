import React from 'react';
import envImage from '../../assets/images/environment/environment_image.jpg';
import './Environment.css';

const Environment = () => {
  return (
    <div className="environment-page">
      <div className="env-hero-container">
        {/* The background image */}
        <img src={envImage} alt="Assam Conservation" className="env-hero-bg" />
        
        {/* The overlay content container */}
        <div className="container env-overlay-content">
          <div className="env-text-block">
            <h1 className="env-hero-title">Discover Conservation Near You</h1>
            <p className="env-hero-subtitle">
              Explore what Britto Foundation is doing in your community and support local conservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Environment;
