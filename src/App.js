import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; // Keeps your working Navigation
import Footer from './components/Footer';
import Home from './components/Home';
import FactForm from './components/FactForm';
import Admin from './components/Admin'; // 🟢 1. IMPORT ADMIN HERE

import './App.css';

function App() {
  return (
    <Router>
      <Navigation /> 

      <div className="app-content">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<FactForm />} />
          
          {/* 🟢 2. ADD THE SECRET ADMIN ROUTE HERE */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;