import axios from "axios";

export const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: `${BASE_API_URL}/api`,
});

export default api;