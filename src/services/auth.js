import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://identityservice-6zvk.onrender.com/api/auth',
  timeout: 10000,
});

export const login = async (email, password) => {
  try {
    const response = await authApi.post('/login', { email, password }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // expected: { token }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default authApi;