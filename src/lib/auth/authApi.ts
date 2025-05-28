import api from "../api/axiosInstance";

interface LoginRequest {
    username: string;
    password: string;
}

interface AdminInfoResponse {
    username: string;
    roles: string[];
}

export const login = async ({ username, password }: LoginRequest): Promise<{ token: string }> => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
};

export const getAuth = async (): Promise<AdminInfoResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
};