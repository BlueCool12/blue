import axios from "axios";
import { getApiBase } from "./apiBase";

const api = axios.create({
    baseURL: getApiBase(),
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

export default api;