import axios from "axios";

const BASE_API_URL = 'https://picsum.photos/v2';
// const BASE_API_URL = 'http://localhost/api';

const api = axios.create({
    baseURL: BASE_API_URL,
});

export default api;