import React from 'react';
import './Loader.css';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="loader-overlay">
        <div className="loader-container">
          <div className="loader-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          {text && <p className="loader-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <div className="loader-ring loader-ring-sm">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <span className="loader-text-inline">{text}</span>}
    </div>
  );
};

export default Loader;
