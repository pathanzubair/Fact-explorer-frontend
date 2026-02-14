import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../api'; // 🟢 Import the helper

const Admin = () => {
  const [facts, setFacts] = useState([]);

  const fetchFacts = async () => {
    try {
      // 🟢 Update: Use API_URL
      const response = await axios.get(`${API_URL}/facts`);
      setFacts(response.data);
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => { fetchFacts(); }, []);

  const deleteFact = async (id) => {
    if (window.confirm("⚠️ Delete this fact?")) {
      // 🟢 Update: Use API_URL
      await axios.delete(`${API_URL}/facts/${id}`);
      fetchFacts();
    }
  };

  const fetchFromWeb = async () => {
    if (window.confirm("Fetch latest news from Internet?")) {
        try {
            alert("🔄 Connecting to News API...");
            // 🟢 Update: Use API_URL
            await axios.post(`${API_URL}/facts/fetch-news`);
            alert("Success!"); 
            fetchFacts(); 
        } catch (err) { alert("Failed. Check backend."); }
    }
  };

  return (
    <div className="container" style={{ borderTop: '5px solid #c0392b' }}>
      <header>
        <h1 style={{ color: '#c0392b' }}>⚠️ Admin Control Panel</h1>
        <p>Restricted Area</p>
      </header>

      <div className="button-group">
        <Link to="/add">
            <button className="toggle-btn btn-primary"><span>➕</span> Add Fact</button>
        </Link>
        <button onClick={fetchFromWeb} className="toggle-btn btn-purple"><span>🌍</span> Fetch Live News</button>
        <button onClick={async () => { 
            if(window.confirm("⚠️ RESET DATABASE?")) {
                // 🟢 Update: Use API_URL
                await axios.post(`${API_URL}/facts/seed`); 
                fetchFacts(); 
            }
        }} className="toggle-btn btn-reset"><span>🔄</span> Reset DB</button>
      </div>

      <div className="grid">
        {facts.map((fact) => (
          <div key={fact._id} className={`card ${fact.ipr_type ? fact.ipr_type.replace(" ", "") : "General"}`}>
             <div className="card-content">
                <div className="admin-card-header">
                    <span className="badge">{fact.ipr_type}</span>
                    <button onClick={() => deleteFact(fact._id)} className="delete-btn">🗑️</button>
                </div>
                <h3>{fact.title}</h3>
                <p>{fact.description}</p>
             </div>
             <div className="card-footer">
                <div className="footer-item"><span>📂</span> {fact.domain}</div>
                <div className="footer-item"><span>📅</span> {fact.year}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Admin;