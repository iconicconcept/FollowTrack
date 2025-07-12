import axios from "axios"

// in production, there is no localhost so we have to make this dynamic, so we write the const BASE_URL
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('authToken');

        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;