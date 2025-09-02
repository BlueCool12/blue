'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes"
import Image from "next/image";

export function ThemeAwareLogo() {

    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    const isLight = mounted ? resolvedTheme === 'light' : true;

    const src = isLight ? '/images/logo/logo.webp' : '/images/logo/logo_dark.webp';
    const size = isLight ? { w: 50, h: 39 } : { w: 74, h: 40 };

    return <Image src={src} alt="헤더 로고" width={size.w} height={size.h} priority />
}