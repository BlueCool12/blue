
export function getApiBase(): string {

    const isServer = typeof window === 'undefined';
    const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

    if (isBuild) {
        return process.env.PUBLIC_API_BASE_URL!;
    }

    if (isServer) {
        return process.env.INTERNAL_API_BASE_URL || process.env.PUBLIC_API_BASE_URL!;
    }

    return process.env.PUBLIC_API_BASE_URL!;
}