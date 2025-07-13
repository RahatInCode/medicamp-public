// src/api/axiosSecure.js
import axios from "axios";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

axiosSecure.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = localStorage.getItem("token"); // ✅ Always get fresh token
     if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
} (error) => {
  return Promise.reject(error);
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosSecure;

