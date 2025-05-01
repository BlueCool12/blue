import axios from "axios";

const api = axios.create({
    baseURL: "https://bluecool.pyomin.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청 전에 Authorization 헤더 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;