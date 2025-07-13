// src/api/axiosSecure.js
import axios from "axios";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// 🛠️ Fix this in src/api/axiosSecure.js
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;               
  },
  (error) => Promise.reject(error)
);


export default axiosSecure;

