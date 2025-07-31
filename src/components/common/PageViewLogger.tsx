'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { pageViewApi } from '@/lib/api/user/pageViewApi';

const PageViewInner = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const referrerRef = useRef<string>("");

    useEffect(() => {
        if (!pathname) return;        

        const currentUrl = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;

        pageViewApi.logPageView({
            url: currentUrl,
            referrer: referrerRef.current,
        });

        referrerRef.current = currentUrl;
    }, [pathname, searchParams]);

    return null;
};

export const PageViewLogger = () => {
    return (
        <Suspense fallback={null}>
            <PageViewInner />
        </Suspense>
    );
};
