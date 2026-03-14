import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">IPQuest</Link>
        <ul className="nav-menu">
          <li><Link to="https://quizzy-frontend-c27i.onrender.com">Home</Link></li>
          
          {/* 🟢 CORRECT: Only use the path name defined in your App.js Route */}
          <li><Link to="/reference-hub">Reference Hub</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;