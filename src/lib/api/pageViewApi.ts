import api from "./axiosInstance";

import { ensureSessionId } from "@/lib/utils/session";

export const pageViewApi = {

    logPageView: async ({ url, referrer, slug }: { url: string; referrer?: string; slug?: string | null }): Promise<void> => {
        try {
            const sessionId = ensureSessionId();

            await api.post(
                "/page-view/log",
                {
                    url,
                    slug: slug ?? null
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Referrer": referrer ?? '',
                        "X-Session-Id": sessionId,
                    },
                }
            );
        } catch (error) {
            console.error("PageView loggin failed:", error);
        }
    },
};