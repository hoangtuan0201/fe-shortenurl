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
// Admin: fetch URLs with pagination (requires JWT)
export const getAdminUrls = async (token, page = 1, pageSize = 20) => {
  try {
    const response = await axios.get('https://be-shortenurl.onrender.com/api/admin/urls', {
      params: { page, pageSize },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { Page, PageSize, Data }
  } catch (error) {
    console.error('Error fetching admin URLs:', error);
    throw error;
  }
};

// Build QR image URL from a short link
export const buildQrUrlFromShortLink = (shortLink) => {
  if (!shortLink) return '';
  try {
    const parts = String(shortLink).split('/');
    const code = parts[parts.length - 1];
    return `https://be-shortenurl.onrender.com/qr/${code}`;
  } catch (error) {
    console.error('Error building QR URL:', error);
    return '';
  }
};




export default api;
