import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import API_URL from '../api'; 

const Home = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    ipr_type: 'All', 
    domain: 'All', 
    sort: 'Newest', 
    search: '' 
  });

  // 🟢 Fixed: Memoized function to fetch all facts without slicing
  const fetchFacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API_URL}/facts?${params}`);
      
      // We set the full array from the DB to keep the history growing
      setFacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // 🟢 Fixed: useEffect now correctly calls fetchFacts
  useEffect(() => {
    fetchFacts();
  }, [fetchFacts]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'Copyright': return '#e74c3c';
      case 'Trademark': return '#f1c40f';
      case 'Patent': return '#3498db';
      case 'Trade Secret': return '#2ecc71';
      case 'Industrial Design': return '#9b59b6';
      default: return '#bdc3c7';
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '2.8rem', fontWeight: '800' }}>IPQuest Fact Explorer</h1>
        {/* <p style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>A Growing Knowledge Base of Professional IPR Examples</p> */}
      </header>

      {/* FILTER BAR */}
      <div className="controls" style={filterBarSyle}>
        <input 
          type="text" 
          name="search" 
          placeholder="🔍 Search facts..." 
          value={filters.search} 
          onChange={handleFilterChange} 
          style={inputStyle}
        />
        <select name="ipr_type" onChange={handleFilterChange} value={filters.ipr_type} style={selectStyle}>
          <option value="All">All Types</option>
          <option value="Patent">Patent</option>
          <option value="Copyright">Copyright</option>
          <option value="Trademark">Trademark</option>
          <option value="Trade Secret">Trade Secret</option>
          <option value="Industrial Design">Industrial Design</option>
        </select>
        <select name="domain" onChange={handleFilterChange} value={filters.domain} style={selectStyle}>
          <option value="All">All Domains</option>
          <option value="Technology">Technology</option>
          <option value="Artificial Intelligence">AI</option>
          <option value="UPI & FinTech">UPI & FinTech</option>
          <option value="Cloud Computing">Cloud Computing</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* GRID SYSTEM (Shows History) */}
      <div className="grid" style={gridStyle}>
        {loading ? (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', fontSize: '1.2rem' }}>Syncing IPR Records...</p>
        ) : facts.length > 0 ? (
          facts.map((fact) => (
            <div key={fact._id} style={{ ...cardStyle, borderTop: `6px solid ${getBorderColor(fact.ipr_type)}` }}>
              <div style={{ marginBottom: '20px' }}>
                  <span style={badgeStyle}>{fact.ipr_type}</span>
              </div>
              <h3 style={titleStyle}>{fact.title}</h3>
              <p style={descriptionStyle}>{fact.description}</p>
              <div style={footerStyle}>
                <span>📂 {fact.domain}</span>
                <span>📅 {fact.year}</span>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666' }}>No results found. Add some from Admin!</p>
        )}
      </div>
    </div>
  );
};

// --- STYLING ---
const filterBarSyle = { display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center', background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px 20px', borderRadius: '8px', border: '1px solid #dfe6e9', width: '280px', fontSize: '1rem' };
const selectStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9', backgroundColor: '#fff', minWidth: '160px', fontSize: '1rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' };
const cardStyle = { backgroundColor: '#fff', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', minHeight: '300px' };
const titleStyle = { fontSize: '1.4rem', color: '#2d3436', marginBottom: '15px', fontWeight: '700' };
const descriptionStyle = { fontSize: '1.05rem', color: '#2d3436', lineHeight: '1.6', flexGrow: 1, marginBottom: '25px' };
const footerStyle = { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#636e72', borderTop: '2px solid #f1f2f6', paddingTop: '15px' };
const badgeStyle = { padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#f8f9fa', color: '#2d3436', border: '1px solid #dfe6e9' };

export default Home;