import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../api'; // 🟢 Import the helper

const FactForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', description: '', ipr_type: 'Patent', domain: 'Technology', year: new Date().getFullYear(), source: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🟢 Update: Use API_URL
      await axios.post(`${API_URL}/facts`, formData);
      alert('Fact Added Successfully!');
      navigate('/');
    } catch (error) {
      alert('Error adding fact');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h2>Add a New IP Fact</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} required />
          <div className="form-row">
            <select name="ipr_type" value={formData.ipr_type} onChange={handleChange}>
              <option value="Patent">Patent</option>
              <option value="Copyright">Copyright</option>
              <option value="Trademark">Trademark</option>
              <option value="Trade Secret">Trade Secret</option>
            </select>
            <select name="domain" value={formData.domain} onChange={handleChange}>
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Fashion">Fashion</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div className="form-row">
              <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
              <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">Save Fact</button>
        </form>
      </div>
    </div>
  );
};

export default FactForm;