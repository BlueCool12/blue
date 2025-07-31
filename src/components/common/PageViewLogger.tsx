'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { ensureSessionId } from '@/lib/utils/session';
import { pageViewApi } from '@/lib/api/user/pageViewApi';

export const PageViewLogger = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const referrerRef = useRef<string>("");

    useEffect(() => {
        if (!pathname) return;

        ensureSessionId();

        const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

        pageViewApi.logPageView({
            url: currentUrl,
            referrer: referrerRef.current,
        });

        referrerRef.current = currentUrl;
    }, [pathname, searchParams]);

    return null;
};
