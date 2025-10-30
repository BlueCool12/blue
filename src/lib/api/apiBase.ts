
export function getApiBase(): string {
    
    const isServer = typeof window === 'undefined';

    if (isServer && process.env.INTERNAL_API_BASE_URL) {
        return process.env.INTERNAL_API_BASE_URL;
    }

    return process.env.PUBLIC_API_BASE_URL!;
}