// src/api.js

/**
 * 🟢 API_URL Helper
 * This automatically detects if you are working locally or on the live site.
 */
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api'           // Local Backend URL
  : 'https://fact-explorer-backend.onrender.com/api'; // Live Render Backend URL

export default API_URL;