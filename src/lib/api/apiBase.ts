
export function getApiBase(): string {

    const isServer = typeof window === 'undefined';
    const preferPublic = process.env.PREFER_PUBLIC_API === '1';

    if (process.env.DEBUG_API_BASE === '1') {
        console.error('[getApiBase]', {
            isServer,
            preferPublic,
            INTERNAL: process.env.INTERNAL_API_BASE_URL,
            PUBLIC: process.env.PUBLIC_API_BASE_URL,
            NEXT_PUBLIC: process.env.NEXT_PUBLIC_API_BASE_URL,
            NODE_ENV: process.env.NODE_ENV,
        });
    }

    if (preferPublic) {
        return process.env.PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL!;
    }
    if (isServer) {
        return process.env.INTERNAL_API_BASE_URL || process.env.PUBLIC_API_BASE_URL!;
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL!;
}