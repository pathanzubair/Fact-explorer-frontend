import React, { useState } from 'react';

const Home = () => {
  // 🟢 STATIC DATA: This will show up immediately
  const staticFacts = [
    {
      _id: "1",
      title: "AI Patent Surge",
      description: "Over 70% of new patent filings in 2025 are related to Generative AI technologies.",
      ipr_type: "Patent",
      createdAt: new Date().toISOString()
    },
    {
      _id: "2",
      title: "Disney Copyright Shift",
      description: "Early versions of famous characters are entering the public domain, sparking new creative works.",
      ipr_type: "Copyright",
      createdAt: new Date().toISOString()
    },
    {
      _id: "3",
      title: "Tech Trademark War",
      description: "Major smartphone manufacturers are in a legal battle over the use of 'Ultra' in product naming.",
      ipr_type: "Trademark",
      createdAt: new Date().toISOString()
    }
  ];

  const [facts] = useState(staticFacts); // Using static data instead of fetch

  return (
    <div className="container" style={{ padding: '20px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#003366' }}>IPQuest Fact Explorer</h1>
        <p>Discover Intellectual Property Trends (Static View)</p>
      </header>
      
      {/* Search/Filters (Visual only for now) */}
      <div className="controls" style={{ display: 'flex', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
        <input 
          type="text" placeholder="🔍 Search facts..." 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', width: '300px' }}
        />
        <select style={{ padding: '10px', borderRadius: '5px' }}>
          <option>All Types</option>
          <option>Patent</option>
          <option>Copyright</option>
          <option>Trademark</option>
        </select>
      </div>

      {/* Facts Grid */}
      <div className="facts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {facts.map((fact) => (
          <div key={fact._id} className="fact-card" style={{ border: '1px solid #eee', padding: '20px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>{fact.title}</h3>
            <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5' }}>{fact.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f0f0f0' }}>
              <span style={{ backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                {fact.ipr_type}
              </span>
              <small style={{ color: '#999' }}>{new Date(fact.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;