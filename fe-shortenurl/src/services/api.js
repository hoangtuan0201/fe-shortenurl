import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'https://tinyurl.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// URL shortening service using TinyURL API
export const shortenUrl = async (longUrl) => {
  try {
    // Using TinyURL's public API
    const response = await axios.get('https://tinyurl.com/api-create.php', {
      params: { url: longUrl }
    });
    
    return {
      originalUrl: longUrl,
      shortUrl: response.data,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
};

export default api;