
export function getApiBase(): string {

    const isServer = typeof window === 'undefined';

    const publicBase =
        process.env.PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

    const internalBase = process.env.INTERNAL_API_BASE_URL;

    if (isServer) {
        if (process.env.PREFER_PUBLIC_API === '1') {
            if (!publicBase) throw new Error('PUBLIC/NEXT_PUBLIC API base missing (server/build)');
            return publicBase;
        }

        if (internalBase) return internalBase;
        if (publicBase) return publicBase;

        throw new Error('API base URL missing (server/runtime)');
    }

    const clientBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!clientBase) throw new Error('NEXT_PUBLIC_API_BASE_URL missing (client)');
    return clientBase;
}