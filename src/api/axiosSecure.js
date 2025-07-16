import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000", 
});
// Add interceptor to attach Firebase token
axiosSecure.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;


