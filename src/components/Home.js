import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Home = () => {
  // 1. Initialize as an empty array [] to avoid .map errors
  const [facts, setFacts] = useState([]); 
  const [loading, setLoading] = useState(true);
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
      const url = `https://fact-explorer-backend.onrender.com/api/facts?${params}`;
      
      console.log("Fetching from:", url); // Debugging log
      const response = await axios.get(url);
      
      console.log("Data received:", response.data); // Debugging log
      setFacts(Array.isArray(response.data) ? response.data : []);
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
    <div className="container" style={{ padding: '20px', minHeight: '80vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>IPQuest Fact Explorer</h1>
        <p>Discover Intellectual Property Trends & Live News</p>
      </header>
      
      {/* Filters Section */}
      <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <input 
          type="text" name="search" placeholder="🔍 Search..." 
          value={filters.search} onChange={handleFilterChange} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select name="ipr_type" onChange={handleFilterChange} value={filters.ipr_type}>
          <option value="All">All Types</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
        </select>
      </div>

      {/* Facts Display Section */}
      <div className="facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading the latest facts...</p>
        ) : facts.length > 0 ? (
          facts.map((fact) => (
            <div key={fact._id} className="fact-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h3 style={{ marginTop: 0 }}>{fact.title}</h3>
              <p>{fact.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ backgroundColor: '#007bff', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                  {fact.ipr_type}
                </span>
                <small style={{ color: '#666' }}>{new Date(fact.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1' }}>
            <p>No facts found in the database.</p>
            <p>Try clicking <strong>"Fetch Live News"</strong> on the Admin page.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;