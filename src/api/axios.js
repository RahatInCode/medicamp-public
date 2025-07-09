import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // make sure this matches your backend
  withCredentials: true,            // if you're using cookies
});

export default axiosInstance;
