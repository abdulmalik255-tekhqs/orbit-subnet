import axios from "axios";
import { baseUrl, baseApiKey } from "../app.config";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export const dockerInstance = axios.create({
  baseURL: process.env.REACT_APP_DOCKER_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": baseApiKey,
  },
});
const responseInterceptor = (response) => response;

const errorInterceptor = (error) => {
  console.error("API Error:", error.response || error.message);
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

dockerInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
