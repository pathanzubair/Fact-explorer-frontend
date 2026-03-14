import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">IPQuest</Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          
          {/* 🟢 Use <a> for a completely separate Render site */}
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