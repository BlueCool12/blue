import { getAuth, login } from "../api/authApi";

interface LoginRequest {
    username: string;
    password: string;
}

export const adminLogin = async ({ username, password }: LoginRequest): Promise<string> => {
    const { token } = await login({ username, password });
    return token;
};

export const checkAuth = async (): Promise<void> => {
    await getAuth();
}