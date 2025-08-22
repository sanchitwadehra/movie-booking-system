import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PROXY_DOMAIN,
  withCredentials: true, 
});

export default apiClient;