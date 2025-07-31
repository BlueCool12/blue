import api from "../axiosInstance";

export const pageViewApi = {

    logPageView: async ({ url, referrer }: { url: string; referrer?: string }): Promise<void> => {
        try {
            await api.post(
                "/user/page-view/log",
                { url },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Referrer": referrer ?? '',
                    },
                }
            );
        } catch {

        }
    },
};