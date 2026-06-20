import React from 'react';
import './NewsArticles.css';

const NewsArticles = () => {
  return (
    <div className="news-page container animate-fade-in">
      <div className="news-header">
        <h1 className="news-title">News and Articles</h1>
        <p className="news-subtitle">
          No news and articles are available at the moment. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default NewsArticles;
