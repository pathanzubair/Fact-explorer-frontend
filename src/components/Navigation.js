import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* This stays a Link because it points to the root of THIS project */}
        <Link to="/" className="nav-logo">IPQuest</Link>
        
        <ul className="nav-menu">
          {/* 🟢 FIX: Changed Link to <a> because Home is now an external URL */}
          <li>
            <a href="https://quizzy-frontend-c27i.onrender.com">Home</a>
          </li>
          
          {/* 🟢 Standard <a> tag for your friend's Reference Hub */}
          <li>
            <a href="https://reference-be-1.onrender.com/" target="_blank" rel="noopener noreferrer">
              Reference Hub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;