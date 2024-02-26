import axios from "axios";

const BASE_API_URL = `http://43.201.100.243/api`;
// const BASE_API_URL = 'http://localhost/api';

const api = axios.create({
    baseURL: BASE_API_URL,
});

export default api;