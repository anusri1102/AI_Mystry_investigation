import axios from 'axios';
const apiBaseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD
  ? '/api/v1'
  : `${window.location.protocol}//${window.location.hostname}:4000/api/v1`);
export const api = axios.create({ baseURL: apiBaseURL, timeout: 90000, withCredentials: true });
export function errorMessage(error) { return error.response?.data?.message || error.message || 'Something went wrong. Please try again.'; }
