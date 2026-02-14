// src/api.js

// 🟢 This checks if you are on localhost or the live web
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'  // Development Mode
  : 'https://fact-explorer-backend.onrender.com/api'; // Production Mode

export default API_URL;