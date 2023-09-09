import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : ''
});

export default axiosInstance;
