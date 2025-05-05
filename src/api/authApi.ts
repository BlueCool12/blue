import api from "./axiosInstance";

interface LoginRequest {
    username: string;
    password: string;
}

export const login = async ({ username, password }: LoginRequest): Promise<void> => {
    await api.post("/auth/login", { username, password });
};