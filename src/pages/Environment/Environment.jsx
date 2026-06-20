import React, { useState } from 'react';
import envImage from '../../assets/images/environment/environment_image.jpg';
import './Environment.css';

const Environment = () => {
  const [district, setDistrict] = useState('');

  const handleExplore = (e) => {
    e.preventDefault();
    if (district) {
      alert(`Exploring environmental conservation actions and volunteer campaigns in ${district}, Assam!`);
    } else {
      alert('Please select a district to view local conservation work.');
    }
  };

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
          
          <form className="env-hero-form" onSubmit={handleExplore}>
            <div className="env-form-group">
              <label htmlFor="region-select">Region</label>
              <div className="select-wrapper">
                <select id="region-select" defaultValue="Assam">
                  <option value="Assam">Assam</option>
                </select>
              </div>
            </div>

            <div className="env-form-group">
              <label htmlFor="district-select">District or territory</label>
              <div className="select-wrapper">
                <select 
                  id="district-select" 
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">Select District or territory</option>
                  <option value="Jorhat">Jorhat</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Majuli">Majuli</option>
                  <option value="Sivasagar">Sivasagar</option>
                  <option value="Tezpur">Tezpur</option>
                  <option value="Dibrugarh">Dibrugarh</option>
                </select>
              </div>
            </div>

            <button type="submit" className="env-hero-submit">
              VISIT MY AREA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Environment;
