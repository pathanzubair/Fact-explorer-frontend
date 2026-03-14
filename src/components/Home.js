import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Home = () => {
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
      // ✅ Pointing to your verified LIVE Render backend
      const url = `https://fact-explorer-backend.onrender.com/api/facts?${params}`;
      
      console.log("Fetching from:", url);
      const response = await axios.get(url);
      
      // Ensure we are setting an array even if backend returns null/object
      const data = Array.isArray(response.data) ? response.data : 
                   (response.data.facts ? response.data.facts : []);
      
      setFacts(data);
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
    <div className="container" style={{ padding: '20px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#003366' }}>IPQuest Fact Explorer</h1>
        <p>Discover Intellectual Property Trends & Live News</p>
      </header>
      
      <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <input 
          type="text" name="search" placeholder="🔍 Search facts..." 
          value={filters.search} onChange={handleFilterChange} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '250px' }}
        />
        <select name="ipr_type" onChange={handleFilterChange} value={filters.ipr_type} style={{ padding: '10px', borderRadius: '5px' }}>
          <option value="All">All Types</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
        </select>
      </div>

      <div className="facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
            <div className="spinner" style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 2s linear infinite', margin: '0 auto' }}></div>
            <p style={{ marginTop: '15px' }}>Loading the latest facts...</p>
          </div>
        ) : facts.length > 0 ? (
          facts.map((fact) => (
            <div key={fact._id || Math.random()} className="fact-card" style={{ border: '1px solid #eee', padding: '20px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginTop: 0, color: '#2c3e50', fontSize: '1.2rem' }}>{fact.title}</h3>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', flexGrow: 1 }}>{fact.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
                <span style={{ backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {fact.ipr_type || 'General'}
                </span>
                <small style={{ color: '#999' }}>
                  {fact.createdAt ? new Date(fact.createdAt).toLocaleDateString() : 'Recent'}
                </small>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
            <h3>No facts found.</h3>
            <p>The database connection is active, but there is no data to show.</p>
            <p style={{ fontWeight: 'bold', color: '#d9534f' }}>👉 Please go to the Admin page and click "Fetch Live News".</p>
          </div>
        )}
      </div>
      
      {/* Basic Spinner CSS */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Home;