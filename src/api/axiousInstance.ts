import axios from "axios";

const axiousInstance = axios.create({
    baseURL: 'https://localhost:7061/api',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiousInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiousInstance;