import { login } from "../api/authApi";

export const adminLogin = async (accountId: string, password: string): Promise<string> => {
    const data = await login({ accountId, password });

    localStorage.setItem("token", data.token);

    return data.token;
};