import axios from 'axios';
import { config } from '../../../config/env';

const axiosInstance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (config.dev.mode) {
      console.error('Axios error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
