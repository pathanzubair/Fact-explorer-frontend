import React from 'react';
import { Link } from 'react-router-dom';

// Change "Navbar" to "Navigation"
const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">IPQuest</Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li> <a href="https://spectacular-gelato-0498cd.netlify.app/">Reference Hub</a></li>
       </ul>
      </div>
    </nav>
  );
};

export default Navigation; // Export the new name