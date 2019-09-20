import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// Set the AUTH token for any request
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `bearer ${token}` : '';
  return config;
});

export default api;