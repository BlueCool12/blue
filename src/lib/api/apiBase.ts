
export function getApiBase(): string {

    const isServer = typeof window === 'undefined';
    const isBuildTime = process.env.PREFER_PUBLIC_API === '1';

    if (isBuildTime) {
        return process.env.PUBLIC_API_BASE_URL!;
    }

    if (isServer) {
        return process.env.INTERNAL_API_BASE_URL!;
    }

    return process.env.NEXT_PUBLIC_API_BASE_URL!;
}