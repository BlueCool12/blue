import api from "./axiosInstance";

interface LoginRequest {
    accountId: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const login = async ({ accountId, password }: LoginRequest): Promise<LoginResponse> => {
    const reponse = await api.post("/auth/login", { accountId, password });
    return reponse.data;
};