import React, { useState } from 'react';
import eduImage from '../../assets/images/education/education.webp';
import './Education.css';

const Education = () => {
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');

  const handleExplore = (e) => {
    e.preventDefault();
    if (category) {
      alert(`Exploring ${category} programs ${subject ? `in ${subject}` : ''} under Britto Foundation!`);
    } else {
      alert('Please select a program type to explore.');
    }
  };

  return (
    <div className="education-page">
      {/* Top section with text, form, and theme gradient */}
      <div className="edu-top-section">
        <div className="container edu-header-container">
          <div className="edu-text-block">
            <h1 className="edu-page-title">Empowering Minds, Shaping Futures</h1>
            <p className="edu-page-subtitle">
              Access digital courses, student dashboards, and local school development programs driven by Britto Foundation's academic network.
            </p>
          </div>

          <form className="edu-filter-widget" onSubmit={handleExplore}>
            <div className="filter-group">
              <label htmlFor="category-select">Program Type</label>
              <div className="select-wrapper">
                <select 
                  id="category-select" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Program Type</option>
                  <option value="E-Learning Courses">E-Learning Courses</option>
                  <option value="Student Portal">Student Portal</option>
                  <option value="Volunteer Tutoring">Volunteer Tutoring</option>
                  <option value="School Support">School Support</option>
                </select>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="subject-select">Subject / Area</label>
              <div className="select-wrapper">
                <select 
                  id="subject-select" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="">All Subjects & Areas</option>
                  <option value="Technology & Coding">Technology & Coding</option>
                  <option value="Assamese Literature">Assamese Literature</option>
                  <option value="Social Impact">Social Impact</option>
                  <option value="Environmental Science">Environmental Science</option>
                </select>
              </div>
            </div>

            <button type="submit" className="edu-explore-btn">
              EXPLORE PROGRAMS
            </button>
          </form>
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
