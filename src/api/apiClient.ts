import axios from "axios";
import { attachInterceptors } from "./interceptors";
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL, " asdf");
const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

attachInterceptors(apiClient);

export default apiClient;
