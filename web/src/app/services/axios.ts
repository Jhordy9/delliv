import axios from 'axios';
import { store } from '@/app/redux/store';

const axiosInstance = axios.create({
  baseURL: 'http://api:3010',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.jwtToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
