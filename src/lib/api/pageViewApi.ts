import api from "./axiosInstance";

import { ensureClientId, ensureSessionId } from "@/lib/utils/identifier";

export const pageViewApi = {

    logPageView: async ({ url, referrer, slug }: { url: string; referrer?: string; slug?: string | null }): Promise<void> => {
        try {
            const clientId = ensureClientId();
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
                        "X-Client-Id": clientId,
                        "X-Session-Id": sessionId,
                    },
                }
            );
        } catch (error) {
            console.error("PageView loggin failed:", error);
        }
    },
};