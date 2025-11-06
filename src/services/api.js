import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'https://be-shortenurl.onrender.com/api/shorturl',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// URL shortening service /api/shorturl
export const shortenUrl = async (longUrl) => {
  try {
    const response = await api.post('', { originalUrl: longUrl });
    return response.data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};

export default api;