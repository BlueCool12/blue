import { getAuth, login } from "../api/authApi";

interface LoginRequest {
    username: string;
    password: string;
}

export const adminLogin = async ({ username, password }: LoginRequest): Promise<void> => {
    await login({ username, password });
};

export const checkAuth = async (): Promise<void> => {
    await getAuth();
}