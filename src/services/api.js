import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'https://be-shortenurl-az8u.onrender.com/api/shorturl',
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

export function buildQrUrlFromShortLink(shortLink) {
  const parts = shortLink.split("/");
  const code = parts[parts.length - 1];
  return `https://be-shortenurl-az8u.onrender.com/qr/${code}`;
}

export default api;

