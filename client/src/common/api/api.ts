import axios from "axios";

const BASE_API_URL = `${import.meta.env.VITE_BASE_URL}/api`;
// const BASE_API_URL = 'http://localhost/api';

const api = axios.create({
    baseURL: BASE_API_URL,
});

export default api;