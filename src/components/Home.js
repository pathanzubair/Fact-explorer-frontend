import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_URL from '../api'; // 🟢 Import the helper we just made

const Home = () => {
  const [facts, setFacts] = useState([]);
  
  // 🟢 CLEAN STATE (No Region)
  const [filters, setFilters] = useState({ 
    ipr_type: 'All', 
    domain: 'All', 
    sort: 'Newest', 
    search: '' 
  });

  const fetchFacts = useCallback(async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      
      // 🟢 CHANGED: Uses API_URL instead of localhost
      const response = await axios.get(`${API_URL}/facts?${params}`);
      
      setFacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [filters]);

  useEffect(() => { fetchFacts(); }, [fetchFacts]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <header>
        <h1>IPQuest Fact Explorer</h1>
        <p>Discover Intellectual Property Trends & Live News</p>
      </header>

      {/* 🟢 CONTROLS */}
      <div className="controls">
        <input 
          type="text" 
          name="search" 
          placeholder="🔍 Search facts..." 
          value={filters.search} 
          onChange={handleFilterChange} 
          className="search-bar"
        />

        <select name="ipr_type" onChange={handleFilterChange} value={filters.ipr_type}>
          <option value="All">All Types</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
          <option value="Trade Secret">Trade Secret</option>
          <option value="News">News</option>
        </select>
        
        <select name="domain" onChange={handleFilterChange} value={filters.domain}>
          <option value="All">All Domains</option>
          <option value="Technology">Technology</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Fashion">Fashion</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Food & Beverage">Food & Beverage</option>
        </select>

        <select name="sort" onChange={handleFilterChange} value={filters.sort}>
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>

      {/* 🟢 GRID LAYOUT */}
      <div className="grid">
        {facts.length > 0 ? (
          facts.map((fact) => (
            <div key={fact._id} className={`card ${fact.ipr_type ? fact.ipr_type.replace(" ", "") : "General"}`}>
              
              <div className="card-content">
                <span className="badge">{fact.ipr_type}</span>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
              </div>

              {/* 🟢 FOOTER */}
              <div className="card-footer">
                <div className="footer-item">
                  <span>📂</span> {fact.domain}
                </div>
                <div className="footer-item">
                  <span>📅</span> {fact.year}
                </div>
              </div>

            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%', color: '#6b7280', fontSize: '1.2rem', marginTop: '50px' }}>
            No facts found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;