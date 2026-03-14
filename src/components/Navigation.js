import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">IPQuest</Link>
        <ul className="nav-menu">
          {/* Home Link */}
          <li>
            <a href="https://quizzy-frontend-c27i.onrender.com">Home</a>
          </li>
          
          {/* 🟢 FIXED: Removed target="_blank" so it opens in the same tab */}
          <li>
            <a href="https://reference-be-1.onrender.com/">
              Reference Hub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;