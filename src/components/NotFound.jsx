import React from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 - Page Not Found</h2>
      <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="not-found-link">Go back to Home</a>
    </div>
  );
};

export default NotFound;
