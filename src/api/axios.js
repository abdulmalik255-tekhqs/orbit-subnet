import axios from "axios";
import { baseUrl } from "../app.config";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Use interceptors if needed in the future (e.g. for error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
