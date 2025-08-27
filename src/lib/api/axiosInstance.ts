import axios from "axios";

const api = axios.create({

    baseURL: "https://bluecool.pyomin.com/api/v1",
    // baseURL: "http://localhost:8888/api/v1",
    
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export default api;