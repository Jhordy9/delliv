import axios from 'axios';

const baseURL = 'http://localhost:3010';

export const axiosRq = axios.create({
  baseURL,
});
