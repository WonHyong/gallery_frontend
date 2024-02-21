import axios from "axios";

const API_URL = 'https://picsum.photos/v2';

const api = axios.create({
    baseURL: API_URL,
});

export default api;