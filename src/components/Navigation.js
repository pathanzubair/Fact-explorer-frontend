import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">IPQuest</Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          
          {/* 🟢 Internal link to your Fact Explorer module */}
          <li><Link to="https://reference-be-1.onrender.com/">Reference Hub</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;