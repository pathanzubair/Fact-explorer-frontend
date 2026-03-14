import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import FactForm from './components/FactForm';
import Admin from './components/Admin';
// 🟢 1. IMPORT REFERENCE HUB HERE
import ReferenceHub from './pages/ReferenceHub'; // Ensure the path to your file is correct

import './App.css';

function App() {
  return (
    <Router>
      <Navigation /> 

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<FactForm />} />
          
          {/* 🟢 2. ADD THE REFERENCE HUB ROUTE HERE */}
          <Route path="/reference-hub" element={<ReferenceHub />} />
          
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;