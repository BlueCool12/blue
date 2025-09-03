
export function getApiBase(): string {

    const isServer = typeof window === 'undefined';

    if (isServer) {
        const base =
            process.env.INTERNAL_API_BASE_URL ??
            process.env.PUBLIC_API_BASE_URL ??
            process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!base) throw new Error('API base URL missing (server)');
        return base;
    }

    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL missing (client)');
    return base;
}