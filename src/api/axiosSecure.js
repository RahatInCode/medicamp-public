import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://medicamp-server-five.vercel.app/", 
});
// Add interceptor to attach Firebase token
axiosSecure.interceptors.request.use(
  async (config) => {
        
    const auth = getAuth();
    const user = auth.currentUser;
    console.log('axiosSecure interceptor user:', user);
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;


