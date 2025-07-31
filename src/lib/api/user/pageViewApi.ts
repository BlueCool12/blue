import api from "../axiosInstance";

import { ensureSessionId } from "@/lib/utils/session";

export const pageViewApi = {

    logPageView: async ({ url, referrer }: { url: string; referrer?: string }): Promise<void> => {
        try {
            const sessionId = ensureSessionId();

            await api.post(
                "/user/page-view/log",
                { url },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Referrer": referrer ?? '',
                        "X-Session-Id": sessionId,
                    },
                }
            );
        } catch {

        }
    },
};