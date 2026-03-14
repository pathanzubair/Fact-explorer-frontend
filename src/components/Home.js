import React, { useState } from 'react';

const Home = () => {
  // 🟢 STATIC DATA: Ensuring your site always shows content
  const staticFacts = [
    {
      _id: "1",
      title: "AI Patent Surge 2026",
      description: "Recent reports indicate a 45% increase in AI-related patent filings globally this year.",
      ipr_type: "Patent",
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      title: "Blockchain in IP Management",
      description: "Major firms are now using blockchain to timestamp and verify intellectual property assets securely.",
      ipr_type: "Copyright",
      createdAt: new Date().toISOString()
    },
    {
      _id: "3",
      title: "Sustainable Tech Trademarks",
      description: "A new wave of trademarks focusing on 'Green Tech' and 'Eco-friendly' branding has hit the market.",
      ipr_type: "Trademark",
      createdAt: new Date().toISOString()
    }
  ];

  const [facts] = useState(staticFacts);

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#1a3a5f', fontSize: '2.5rem', marginBottom: '10px' }}>IPQuest Fact Explorer</h1>
        <p style={{ color: '#555', fontSize: '1.1rem' }}>Your Gateway to Intellectual Property Insights</p>
      </header>
      
      {/* Search Bar (Static UI) */}
      <div className="search-container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="🔍 Search for patents, trademarks, or news..." 
          style={{ width: '60%', padding: '12px 20px', borderRadius: '25px', border: '1px solid #ddd', fontSize: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        />
      </div>

      {/* Facts Display Grid */}
      <div className="facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
        {facts.map((fact) => (
          <div key={fact._id} className="fact-card" style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '15px', padding: '25px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: 'transform 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <span style={{ backgroundColor: '#e3f2fd', color: '#1976d2', padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {fact.ipr_type}
              </span>
              <small style={{ color: '#888' }}>{new Date(fact.createdAt).toLocaleDateString()}</small>
            </div>
            <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.3rem' }}>{fact.title}</h3>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>{fact.description}</p>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button style={{ background: 'none', border: 'none', color: '#1976d2', fontWeight: 'bold', cursor: 'pointer' }}>Read More →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;