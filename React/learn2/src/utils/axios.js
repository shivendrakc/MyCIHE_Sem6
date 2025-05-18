import axios from "axios";

// Log the environment variable
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Log the final configuration
console.log('API Configuration:', {
    baseURL: API.defaults.baseURL,
    withCredentials: API.defaults.withCredentials,
    headers: API.defaults.headers
});

// Request interceptor
API.interceptors.request.use((config) => {
    console.log('Making request to:', config.url);
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.message
        });
        if (error.response?.status === 401) {
            // Clear local storage and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;