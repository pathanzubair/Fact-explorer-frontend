import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import FactForm from './components/FactForm';
import Admin from './components/Admin';

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />

      <div className="app-content">
        <Routes>
          {/* Fix: Root route */}
          <Route path="/" element={<Home />} />

          <Route path="/add" element={<FactForm />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;