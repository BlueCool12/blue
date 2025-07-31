'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { ensureSessionId } from '@/lib/utils/session';
import { pageViewApi } from '@/lib/api/user/pageViewApi';

export const PageViewLogger = () => {
    const pathname = usePathname();

    useEffect(() => {
        ensureSessionId();

        if (!pathname) return;

        const fullUrl = `${window.location.pathname}${window.location.search}`;
        pageViewApi.logPageView(fullUrl);
    }, [pathname]);

    return null;
};
