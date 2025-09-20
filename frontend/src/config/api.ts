// frontend/src/config/api.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const appConfig = {
  name: import.meta.env.VITE_APP_NAME || 'Keansburg Park',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  env: import.meta.env.VITE_NODE_ENV || 'development',
};
