import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchProductRankings = (filter: string = 'popular') =>
  API.get(`/api/products/ranking?filter=${filter}`);