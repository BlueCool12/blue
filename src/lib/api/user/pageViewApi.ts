import api from "../axiosInstance";

export const pageViewApi = {

    logPageView: async (url: string): Promise<void> => {
        try {
            await api.post(
                "/user/page-view/log",
                { url },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch {

        }
    },
};