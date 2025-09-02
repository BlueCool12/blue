import axios from "axios";

const isServer = typeof window === 'undefined';

const api = axios.create({
    baseURL: `${isServer ? process.env.INTERNAL_API_BASE_URL : process.env.PUBLIC_API_BASE_URL}`,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export default api;