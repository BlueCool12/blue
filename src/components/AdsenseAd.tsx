'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export default function AdsenseAd() {
    const adRef = useRef<HTMLModElement>(null);

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && typeof window !== 'undefined' && window.adsbygoogle) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                initialized.current = true;
            } catch (e) {
                console.error('Adsense error:', e);
            }
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', margin: '0 0 3rem' }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7027574538017618"
                data-ad-slot="3033125272"
                data-ad-format="auto"
                data-full-width-responsive="true"
                ref={adRef}
            />
        </div>
    );
}
