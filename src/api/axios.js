// frontend/src/api/axios.js
import axios from "axios";

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "https://medicamp-server-five.vercel.app",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;

