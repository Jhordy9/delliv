import axios from 'axios';

export const axiosRq = axios.create({
  baseURL: 'http://localhost:3010',
});
