import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../api';

const Admin = () => {
  const [facts, setFacts] = useState([]);

  const fetchFacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/facts`);
      setFacts(response.data);
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => { fetchFacts(); }, []);

  const deleteFact = async (id) => {
    if (window.confirm("⚠️ Delete this record?")) {
      await axios.delete(`${API_URL}/facts/${id}`);
      fetchFacts();
    }
  };

  // 🌍 BUTTON 1: LIVE NEWS (Appends to history)
  const fetchFromWeb = async () => {
    if (window.confirm("Fetch 5 latest news items? This adds to your existing history.")) {
        try {
            const res = await axios.post(`${API_URL}/facts/fetch-news`);
            alert(res.data.message); 
            fetchFacts(); 
        } catch (err) { alert("Failed. Check NEWS_API_KEY in backend .env"); }
    }
  };

  // 🏛️ BUTTON 2: AUTHENTIC SYNC (Wipes and loads standards)
  const syncAuthentic = async () => {
    if (window.confirm("Switch to Authentic Database? This replaces everything with IPR standards.")) {
        try {
            const res = await axios.post(`${API_URL}/facts/sync-authentic`);
            alert(res.data.message);
            fetchFacts(); 
        } catch (err) { alert("Sync Failed."); }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#c0392b', fontSize: '2.5rem' }}>⚠️ Admin Control Panel</h1>
        <p>Manage Professional Intellectual Property Records</p>
      </header>

      <div className="button-group" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
        <Link to="/add">
            <button className="toggle-btn" style={btnStyle('#1a3a5f')}><span>➕</span> Add New Fact</button>
        </Link>
        
        {/* LIVE FETCH BUTTON */}
        <button onClick={fetchFromWeb} className="toggle-btn" style={btnStyle('#673ab7')}>
            <span>🌍</span> Fetch Live News
        </button>
        
        {/* AUTHENTIC SYNC BUTTON */}
        <button onClick={syncAuthentic} className="toggle-btn" style={btnStyle('#f39c12')}>
            <span>🏛️</span> Sync Authentic IPR
        </button>

        <button onClick={async () => { 
            if(window.confirm("⚠️ This will WIPE the entire database. Continue?")) {
                await axios.post(`${API_URL}/facts/seed`); 
                fetchFacts(); 
            }
        }} className="toggle-btn" style={btnStyle('#c0392b')}><span>🔄</span> Reset / Clear DB</button>
      </div>

      {/* Grid Display for Admin */}
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {facts.map((fact) => (
          <div key={fact._id} style={adminCardStyle}>
             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={badgeStyle}>{fact.ipr_type}</span>
                <button onClick={() => deleteFact(fact._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
             </div>
             <h3 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '10px' }}>{fact.title}</h3>
             <p style={{ color: '#7f8c8d', fontSize: '0.9rem', flexGrow: 1 }}>{fact.description}</p>
             <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '10px', fontSize: '0.85rem', color: '#95a5a6', display: 'flex', justifyContent: 'space-between' }}>
                <span>📂 {fact.domain}</span>
                <span>📅 {fact.year}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Styles ---
const btnStyle = (bg) => ({ backgroundColor: bg, color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' });
const adminCardStyle = { backgroundColor: '#fff', border: '1px solid #e0e0e0', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', minHeight: '220px' };
const badgeStyle = { backgroundColor: '#f1f2f6', color: '#2c3e50', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' };

export default Admin;