import React, { useState } from 'react';

const Home = () => {
  // 🟢 STATIC CONTENT: This ensures your page is never empty
  const staticFacts = [
    {
      _id: "1",
      title: "Generative AI & Patent Law",
      description: "In 2026, over 40% of global patent filings are focused on AI-driven medical diagnostic tools and automated coding assistants.",
      ipr_type: "Patent",
      date: "Mar 14, 2026"
    },
    {
      _id: "2",
      title: "Copyright & Digital Assets",
      description: "New legal frameworks are being established to protect digital creators from unauthorized use of their work in training large language models.",
      ipr_type: "Copyright",
      date: "Mar 12, 2026"
    },
    {
      _id: "3",
      title: "Sustainable Branding Trends",
      description: "Trademarks for 'Eco-Friendly' and 'Carbon Neutral' brands have increased by 30%, reflecting consumer shifts toward sustainability.",
      ipr_type: "Trademark",
      date: "Mar 10, 2026"
    },
    {
      _id: "4",
      title: "Blockchain for IPR Verification",
      description: "IPQuest is exploring how blockchain technology can be used to provide immutable timestamps for patent and trademark applications.",
      ipr_type: "News",
      date: "Mar 08, 2026"
    }
  ];

  const [facts] = useState(staticFacts);

  return (
    <div style={{ backgroundColor: '#f4f7f9', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ color: '#1a3a5f', fontSize: '2.8rem', fontWeight: 'bold', marginBottom: '10px' }}>IPQuest Fact Explorer</h1>
          <p style={{ color: '#546e7a', fontSize: '1.2rem' }}>Empowering Intellectual Property Awareness Through Real-Time Data</p>
        </header>

        {/* Search UI (Visual Only) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <input 
            type="text" 
            placeholder="🔍 Search for IPR trends..." 
            style={{ width: '100%', maxWidth: '600px', padding: '15px 25px', borderRadius: '30px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '1rem' }}
          />
        </div>

        {/* Facts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {facts.map((fact) => (
            <div key={fact._id} style={{ backgroundColor: '#ffffff', borderRadius: '15px', padding: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ 
                  backgroundColor: fact.ipr_type === 'Patent' ? '#e3f2fd' : fact.ipr_type === 'Copyright' ? '#f3e5f5' : '#e8f5e9',
                  color: fact.ipr_type === 'Patent' ? '#1976d2' : fact.ipr_type === 'Copyright' ? '#7b1fa2' : '#388e3c',
                  padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' 
                }}>
                  {fact.ipr_type}
                </span>
                <span style={{ color: '#90a4ae', fontSize: '0.85rem' }}>{fact.date}</span>
              </div>
              <h3 style={{ color: '#263238', marginBottom: '15px', fontSize: '1.4rem' }}>{fact.title}</h3>
              <p style={{ color: '#455a64', lineHeight: '1.6', flexGrow: 1 }}>{fact.description}</p>
              <button style={{ alignSelf: 'flex-start', marginTop: '20px', padding: '10px 0', background: 'none', border: 'none', color: '#1976d2', fontWeight: 'bold', cursor: 'pointer' }}>
                Learn More →
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;