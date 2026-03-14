import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Home = () => {
  const [facts, setFacts] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Added loading state
  const [filters, setFilters] = useState({ 
    ipr_type: 'All', 
    domain: 'All', 
    sort: 'Newest', 
    search: '' 
  });

  const fetchFacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      
      // ✅ FIX: Use your Render Backend URL instead of localhost
      const response = await axios.get(`https://fact-explorer-backend.onrender.com/api/facts?${params}`);
      
      setFacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { 
    fetchFacts(); 
  }, [fetchFacts]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <header>
        <h1>IPQuest Fact Explorer</h1>
        <p>Discover Intellectual Property Trends & Live News</p>
      </header>
      
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
        {/* ... other dropdowns ... */}
      </div>

      <div className="facts-grid">
        {loading ? (
          <p>Loading the latest facts...</p>
        ) : facts.length > 0 ? (
          facts.map((fact) => (
            <div key={fact._id} className="fact-card">
              <h3>{fact.title}</h3>
              <p>{fact.description}</p>
              <span className="badge">{fact.ipr_type}</span>
            </div>
          ))
        ) : (
          <p>No facts found. Try changing your filters or fetching new data!</p>
        )}
      </div>
    </div>
  );
};

export default Home;