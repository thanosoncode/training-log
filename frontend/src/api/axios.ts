import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://training-log-api.vercel.app/' : ''
});

export default axiosInstance;
