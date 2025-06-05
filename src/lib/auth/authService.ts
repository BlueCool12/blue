import { getAuth, login } from "@/lib/auth/authApi";

import type { LoginRequest } from "./auth.api";

export const adminLogin = async ({ username, password }: LoginRequest): Promise<string> => {
    const { token } = await login({ username, password });
    return token;
};

export const checkAuth = async (): Promise<void> => {
    await getAuth();
}